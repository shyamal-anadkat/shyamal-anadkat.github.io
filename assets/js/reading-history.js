/**
 * Reading History Feature
 * Tracks which blog posts users have read and displays recent reading history
 */

class ReadingHistory {
  constructor() {
    this.storageKey = 'blog-reading-history';
    this.maxHistoryItems = 10;
    this.init();
  }

  init() {
    // Track current page if it's a blog post
    if (this.isPostPage()) {
      this.trackCurrentPost();
    }
    
    // Add reading history to pages that have the container
    this.displayReadingHistory();
    
    // Track scroll progress for current post
    if (this.isPostPage()) {
      this.trackReadingProgress();
    }
  }

  isPostPage() {
    // Check if current page is a blog post (has /blog/ in URL)
    return window.location.pathname.includes('/blog/');
  }

  getCurrentPostData() {
    const title = document.querySelector('h1')?.textContent || document.title;
    const url = window.location.pathname;
    const date = new Date().toISOString();
    
    return {
      title: title.trim(),
      url: url,
      readAt: date,
      readingProgress: 0
    };
  }

  trackCurrentPost() {
    const postData = this.getCurrentPostData();
    let history = this.getHistory();
    
    // Remove existing entry for this post (if any)
    history = history.filter(item => item.url !== postData.url);
    
    // Add current post to beginning of history
    history.unshift(postData);
    
    // Keep only the most recent items
    history = history.slice(0, this.maxHistoryItems);
    
    this.saveHistory(history);
  }

  trackReadingProgress() {
    let isRead = false;
    
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.round((scrollTop / docHeight) * 100);
      
      // Mark as read if user scrolled past 70%
      if (progress >= 70 && !isRead) {
        isRead = true;
        this.markAsFullyRead();
      }
      
      // Update progress in history
      this.updateReadingProgress(progress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }

  markAsFullyRead() {
    const history = this.getHistory();
    const currentUrl = window.location.pathname;
    
    const postIndex = history.findIndex(item => item.url === currentUrl);
    if (postIndex !== -1) {
      history[postIndex].fullyRead = true;
      history[postIndex].readingProgress = 100;
      this.saveHistory(history);
    }
  }

  updateReadingProgress(progress) {
    const history = this.getHistory();
    const currentUrl = window.location.pathname;
    
    const postIndex = history.findIndex(item => item.url === currentUrl);
    if (postIndex !== -1) {
      history[postIndex].readingProgress = progress;
      this.saveHistory(history);
    }
  }

  getHistory() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading history:', error);
      return [];
    }
  }

  saveHistory(history) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  }

  displayReadingHistory() {
    const container = document.getElementById('reading-history');
    if (!container) return;

    const history = this.getHistory();
    
    if (history.length === 0) {
      container.innerHTML = '<p class="no-history">No reading history yet. Start reading some posts!</p>';
      return;
    }

    const historyHTML = history.map(item => {
      const readDate = new Date(item.readAt).toLocaleDateString();
      const progressBar = item.readingProgress > 0 ? 
        `<div class="progress-bar">
          <div class="progress-fill" style="width: ${item.readingProgress}%"></div>
        </div>` : '';
      
      const fullyReadBadge = item.fullyRead ? '<span class="fully-read">✓ Read</span>' : '';
      
      return `
        <li class="history-item">
          <div class="history-content">
            <a href="${item.url}" class="history-title">${item.title}</a>
            <div class="history-meta">
              <span class="read-date">Read on ${readDate}</span>
              ${fullyReadBadge}
            </div>
            ${progressBar}
          </div>
        </li>
      `;
    }).join('');

    container.innerHTML = `
      <h3>Recently Read Posts</h3>
      <ul class="history-list">
        ${historyHTML}
      </ul>
      <button class="clear-history" onclick="readingHistory.clearHistory()">Clear History</button>
    `;
  }

  clearHistory() {
    if (confirm('Are you sure you want to clear your reading history?')) {
      localStorage.removeItem(this.storageKey);
      this.displayReadingHistory();
    }
  }

  // Public method to get reading stats
  getReadingStats() {
    const history = this.getHistory();
    const fullyRead = history.filter(item => item.fullyRead).length;
    const totalRead = history.length;
    
    return {
      totalPostsRead: totalRead,
      fullyReadPosts: fullyRead,
      averageProgress: totalRead > 0 ? 
        Math.round(history.reduce((sum, item) => sum + (item.readingProgress || 0), 0) / totalRead) : 0
    };
  }
}

// Initialize reading history when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.readingHistory = new ReadingHistory();
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ReadingHistory;
} 
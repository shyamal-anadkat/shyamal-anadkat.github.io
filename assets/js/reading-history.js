/**
 * Reading History Module
 * Tracks and displays posts that a user has read using localStorage
 */
(function() {
  'use strict';
  
  // Configuration
  const STORAGE_KEY = 'shyamal_blog_reading_history';
  const MAX_HISTORY_ITEMS = 20; // Maximum number of posts to store in history
  const CONTAINER_ID = 'reading-history-container';
  
  // Main module object
  const ReadingHistory = {
    /**
     * Initialize the reading history module
     */
    init: function() {
      // Create the UI container if it doesn't exist
      this.initUI();
      
      // Mark current post as read if we're on a post page
      if (this.isPostPage()) {
        this.markCurrentPostAsRead();
      }
      
      // Mark previously read posts on the index page
      this.markReadPostsOnIndex();
      
      // Add event listeners
      this.addEventListeners();
    },
    
    /**
     * Check if current page is a post
     */
    isPostPage: function() {
      return document.querySelector('article.post') !== null;
    },
    
    /**
     * Mark the current post as read
     */
    markCurrentPostAsRead: function() {
      const postElement = document.querySelector('article.post');
      
      if (postElement) {
        const postTitle = postElement.getAttribute('data-post-title') || document.querySelector('h1')?.textContent.trim();
        const postUrl = postElement.getAttribute('data-post-url') || window.location.pathname;
        const postDate = postElement.getAttribute('data-post-date');
        const postTags = Array.from(document.querySelectorAll('.post-tags em, .tag, mark'))
          .map(tag => tag.textContent.trim());
        
        if (postTitle && postUrl) {
          this.addToHistory({
            title: postTitle,
            url: postUrl,
            date: postDate,
            tags: postTags,
            timestamp: new Date().toISOString()
          });
        }
      }
    },
    
    /**
     * Add a post to reading history
     * @param {Object} post - Post object with title, url, timestamp
     */
    addToHistory: function(post) {
      try {
        const history = this.getHistory();
        
        // Check if post is already in history (avoid duplicates)
        const existingIndex = history.findIndex(item => item.url === post.url);
        
        if (existingIndex !== -1) {
          // Update existing entry with new timestamp
          history[existingIndex].timestamp = post.timestamp;
          
          // Move to the top of history
          const existing = history.splice(existingIndex, 1)[0];
          history.unshift(existing);
        } else {
          // Add new post to the beginning of history
          history.unshift(post);
          
          // Limit history size
          if (history.length > MAX_HISTORY_ITEMS) {
            history.pop();
          }
        }
        
        // Save updated history
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        
        // Update UI if container exists
        this.updateUI();
      } catch (e) {
        console.error('Error adding to reading history:', e);
      }
    },
    
    /**
     * Get reading history from localStorage
     * @return {Array} Array of post objects
     */
    getHistory: function() {
      try {
        const history = localStorage.getItem(STORAGE_KEY);
        return history ? JSON.parse(history) : [];
      } catch (e) {
        console.error('Error retrieving reading history:', e);
        return [];
      }
    },
    
    /**
     * Clear reading history
     */
    clearHistory: function() {
      try {
        localStorage.removeItem(STORAGE_KEY);
        this.updateUI();
        this.markReadPostsOnIndex(); // Refresh read indicators
      } catch (e) {
        console.error('Error clearing reading history:', e);
      }
    },
    
    /**
     * Initialize the UI component
     */
    initUI: function() {
      try {
        // Create container if it doesn't exist
        let container = document.getElementById(CONTAINER_ID);
        
        if (!container) {
          container = document.createElement('div');
          container.id = CONTAINER_ID;
          container.className = 'reading-history';
          
          // Find sidebar to append
          const sidebar = document.querySelector('header');
          if (sidebar) {
            // Find a good position in the sidebar
            const searchBox = sidebar.querySelector('.search-box');
            if (searchBox) {
              sidebar.insertBefore(container, searchBox);
            } else {
              sidebar.appendChild(container);
            }
          }
        }
        
        this.updateUI();
      } catch (e) {
        console.error('Error initializing reading history UI:', e);
      }
    },
    
    /**
     * Update the UI with current reading history
     */
    updateUI: function() {
      try {
        const container = document.getElementById(CONTAINER_ID);
        if (!container) return;
        
        const history = this.getHistory();
        
        if (history.length === 0) {
          container.innerHTML = `
            <div class="history-header">
              <h3>Reading History</h3>
            </div>
            <p class="empty-history">No reading history yet.</p>
          `;
          return;
        }
        
        // Format the history items
        const historyHTML = history.map(post => {
          const relativeTime = this.formatRelativeTime(post.timestamp);
          
          const tags = post.tags && post.tags.length 
            ? `<div class="history-tags">${post.tags.slice(0, 3).map(tag => `<mark>${tag}</mark>`).join(' ')}</div>` 
            : '';
          
          return `
            <li class="history-item">
              <a href="${post.url}" class="history-link">${post.title}</a>
              <div class="history-meta">
                <span class="history-time">${relativeTime}</span>
              </div>
              ${tags}
            </li>
          `;
        }).join('');
        
        container.innerHTML = `
          <div class="history-header">
            <h3>Reading History</h3>
            <button id="clear-history" class="clear-history-btn">Clear</button>
          </div>
          <ul class="history-list">
            ${historyHTML}
          </ul>
        `;
        
        // Add event listener to clear button
        const clearButton = document.getElementById('clear-history');
        if (clearButton) {
          clearButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.clearHistory();
          });
        }
      } catch (e) {
        console.error('Error updating reading history UI:', e);
      }
    },
    
    /**
     * Mark previously read posts on the index page
     */
    markReadPostsOnIndex: function() {
      try {
        if (this.isPostPage()) return; // Skip on post pages
        
        const history = this.getHistory();
        if (history.length === 0) return;
        
        // Get all post links on the index page
        const postLinks = document.querySelectorAll('a[href^="/"]');
        
        postLinks.forEach(link => {
          const href = link.getAttribute('href');
          
          // Check if this post is in reading history
          const isRead = history.some(item => {
            // Handle both relative and absolute URLs
            return item.url === href || 
                  item.url === window.location.origin + href ||
                  href === item.url.replace(window.location.origin, '');
          });
          
          if (isRead) {
            // Add a class to mark as read
            link.classList.add('post-read');
            
            // Add a subtle indicator
            if (!link.querySelector('.read-indicator')) {
              const indicator = document.createElement('span');
              indicator.className = 'read-indicator';
              indicator.setAttribute('title', 'You\'ve read this post');
              indicator.innerHTML = '✓';
              link.appendChild(indicator);
            }
          } else {
            // Remove read class and indicator if present
            link.classList.remove('post-read');
            const indicator = link.querySelector('.read-indicator');
            if (indicator) {
              indicator.remove();
            }
          }
        });
      } catch (e) {
        console.error('Error marking read posts:', e);
      }
    },
    
    /**
     * Add event listeners
     */
    addEventListeners: function() {
      try {
        // Add click tracking for post links
        const postLinks = document.querySelectorAll('a[href^="/"]');
        
        postLinks.forEach(link => {
          // Skip links that don't look like post links
          const href = link.getAttribute('href');
          if (href.includes('/assets/') || href === '/' || href.includes('#')) {
            return;
          }
          
          link.addEventListener('click', () => {
            const postTitle = link.textContent.trim();
            const postUrl = link.getAttribute('href');
            
            // Get tags if available
            const tags = [];
            const parentLi = link.closest('li');
            if (parentLi) {
              const tagElements = parentLi.querySelectorAll('mark, .tag, em');
              tagElements.forEach(tag => {
                tags.push(tag.textContent.trim());
              });
            }
            
            if (postTitle && postUrl) {
              this.addToHistory({
                title: postTitle,
                url: postUrl,
                tags: tags,
                timestamp: new Date().toISOString()
              });
            }
          });
        });
      } catch (e) {
        console.error('Error setting up event listeners:', e);
      }
    },
    
    /**
     * Format relative time (e.g., "2 hours ago")
     * @param {string} timestamp - ISO timestamp
     * @return {string} Formatted relative time
     */
    formatRelativeTime: function(timestamp) {
      try {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        const diffMonth = Math.floor(diffDay / 30);
        const diffYear = Math.floor(diffDay / 365);
        
        if (diffYear > 0) {
          return `${diffYear} year${diffYear > 1 ? 's' : ''} ago`;
        } else if (diffMonth > 0) {
          return `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
        } else if (diffDay > 0) {
          return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
        } else if (diffHour > 0) {
          return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
        } else if (diffMin > 0) {
          return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
        } else {
          return 'Just now';
        }
      } catch (e) {
        console.error('Error formatting relative time:', e);
        return 'Some time ago';
      }
    }
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      ReadingHistory.init();
    });
  } else {
    ReadingHistory.init();
  }
  
  // Expose the module globally for debugging
  window.ReadingHistory = ReadingHistory;
})();

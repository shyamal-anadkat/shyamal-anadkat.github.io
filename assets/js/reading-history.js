/**
 * Reading History Module
 * Tracks and displays posts that a user has read using localStorage
 */
(function() {
  'use strict';
  
  // Configuration
  const STORAGE_KEY = 'shyamal_blog_reading_history';
  const TOGGLE_STATE_KEY = 'shyamal_blog_reading_history_visible';
  const MAX_HISTORY_ITEMS = 20; // Maximum number of posts to store in history
  const CONTAINER_ID = 'reading-history-container';
  const TOGGLE_ID = 'toggle-history';
  
  // Main module object
  const ReadingHistory = {
    /**
     * Initialize the reading history module
     */
    init: function() {
      // Mark current post as read if we're on a post page
      if (this.isPostPage()) {
        this.markCurrentPostAsRead();
      }
      
      // Initialize the UI component
      this.initUI();
      
      // Add event listeners
      this.addEventListeners();
      
      // Load toggle state from localStorage
      this.loadToggleState();
      
      // Add click handlers to post links on the index page
      this.setupPostLinkTracking();
    },
    
    /**
     * Check if current page is a post
     */
    isPostPage: function() {
      // Check for the article.post element we added in the post.html layout
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
     * Setup click tracking for post links on the index page
     */
    setupPostLinkTracking: function() {
      // Get all post links on the index page
      const postLinks = document.querySelectorAll('.featured-posts a, ul li a');
      
      postLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          // Don't interrupt navigation
          const postTitle = link.textContent.trim();
          const postUrl = link.getAttribute('href');
          const postTags = Array.from(link.parentElement.querySelectorAll('mark'))
            .map(tag => tag.textContent.trim());
          
          // Get date from the parent element text content
          const dateMatch = link.parentElement.textContent.match(/(\w+\s\d+,\s\d{4})/);
          const postDate = dateMatch ? dateMatch[0] : '';
          
          if (postTitle && postUrl) {
            // Mark as read before navigation
            this.addToHistory({
              title: postTitle,
              url: postUrl,
              date: postDate,
              tags: postTags,
              timestamp: new Date().toISOString()
            });
          }
        });
      });
    },
    
    /**
     * Add a post to reading history
     * @param {Object} post - Post object with title, url, timestamp
     */
    addToHistory: function(post) {
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
      localStorage.removeItem(STORAGE_KEY);
      this.updateUI();
    },
    
    /**
     * Initialize the UI component
     */
    initUI: function() {
      // Create container if it doesn't exist
      let container = document.getElementById(CONTAINER_ID);
      
      if (!container) {
        container = document.createElement('div');
        container.id = CONTAINER_ID;
        container.className = 'reading-history';
        
        // Find sidebar or other suitable location to append
        const sidebar = document.querySelector('header');
        if (sidebar) {
          sidebar.appendChild(container);
        }
      }
      
      this.updateUI();
    },
    
    /**
     * Update the UI with current reading history
     */
    updateUI: function() {
      const container = document.getElementById(CONTAINER_ID);
      if (!container) return;
      
      const history = this.getHistory();
      
      if (history.length === 0) {
        container.innerHTML = `
          <h3>Reading History</h3>
          <p class="empty-history">No reading history yet.</p>
        `;
        return;
      }
      
      // Format the history items
      const historyHTML = history.map(post => {
        const date = new Date(post.timestamp);
        const formattedDate = post.date || date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit'
        });
        
        const tags = post.tags && post.tags.length 
          ? `<div class="history-tags">${post.tags.map(tag => `<mark>${tag}</mark>`).join(' ')}</div>` 
          : '';
        
        return `
          <li class="history-item">
            <a href="${post.url}" class="history-link">${post.title}</a>
            <div class="history-meta">
              <span class="history-date">${formattedDate}</span>
              <span class="history-time">${formattedTime}</span>
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
    },
    
    /**
     * Toggle reading history visibility
     */
    toggleVisibility: function() {
      const container = document.getElementById(CONTAINER_ID);
      const toggleCheckbox = document.getElementById(TOGGLE_ID);
      
      if (!container || !toggleCheckbox) return;
      
      const isVisible = container.classList.contains('expanded');
      
      if (isVisible) {
        container.classList.remove('expanded');
        toggleCheckbox.checked = false;
      } else {
        container.classList.add('expanded');
        toggleCheckbox.checked = true;
      }
      
      // Save toggle state to localStorage
      localStorage.setItem(TOGGLE_STATE_KEY, !isVisible ? 'visible' : 'hidden');
    },
    
    /**
     * Load toggle state from localStorage
     */
    loadToggleState: function() {
      const container = document.getElementById(CONTAINER_ID);
      const toggleCheckbox = document.getElementById(TOGGLE_ID);
      
      if (!container || !toggleCheckbox) return;
      
      const savedState = localStorage.getItem(TOGGLE_STATE_KEY);
      
      if (savedState === 'visible') {
        container.classList.add('expanded');
        toggleCheckbox.checked = true;
      } else {
        container.classList.remove('expanded');
        toggleCheckbox.checked = false;
      }
    },
    
    /**
     * Add event listeners
     */
    addEventListeners: function() {
      // Toggle reading history visibility
      const toggleButton = document.getElementById(TOGGLE_ID);
      if (toggleButton) {
        toggleButton.addEventListener('change', (e) => {
          this.toggleVisibility();
        });
      }
      
      // Also handle clicks on the toggle label
      document.addEventListener('click', (e) => {
        if (e.target.matches(`label[for="${TOGGLE_ID}"]`) || 
            e.target.closest(`label[for="${TOGGLE_ID}"]`)) {
          // The checkbox state will change after this event, so we need to wait
          setTimeout(() => this.toggleVisibility(), 0);
        }
      });
    },
    
    /**
     * Format relative time (e.g., "2 hours ago")
     * @param {string} timestamp - ISO timestamp
     * @return {string} Formatted relative time
     */
    formatRelativeTime: function(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHour = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHour / 24);
      
      if (diffDay > 30) {
        return date.toLocaleDateString();
      } else if (diffDay > 0) {
        return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
      } else if (diffHour > 0) {
        return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
      } else if (diffMin > 0) {
        return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
      } else {
        return 'Just now';
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
  
  // Expose the module globally
  window.ReadingHistory = ReadingHistory;
})();

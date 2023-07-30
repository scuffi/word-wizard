import FlexSearch from './libs/flexsearch.js';
// Create index
const index = new FlexSearch.Index(); 

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  // Check if message is to index page
  if (request.indexPage) {
    
    // Index page contents
    index.add(request.pageContent);
    
    // Send response to let content script know indexing is done
    sendResponse({indexed: true});

  } else if (request.search) {

    // Search index for word
    const results = index.search(request.searchTerm);

    // Send results back to content script
    sendResponse({results});

  }

});
// When page loads, send message to background to index it
chrome.runtime.sendMessage({indexPage: true, pageContent: document.body.innerText}, response => {
    if (response.indexed) {
      // Page indexed
    }
  });
  
  // Keep track of current found word
  let currentFoundWord = 0;
  
  // Search for word when button clicked
  document.getElementById('search').addEventListener('click', () => {
  
    const searchTerm = document.getElementById('term').value;
  
    // Search index
    chrome.runtime.sendMessage({search: searchTerm}, response => {
  
      // Store results
      const results = response.results;
  
      // Update current found word
      currentFoundWord = 0;
  
      // Highlight and show next/prev buttons
      highlightWord(results[currentFoundWord]); 
      updateButtons(results);
  
    });
  
  });
  
  // Next button clicked
  document.getElementById('next').addEventListener('click', () => {
    
    currentFoundWord++;
    
    // Highlight next word
    highlightWord(results[currentFoundWord]);
  
    // Update buttons
    updateButtons(results);
  
  });
  
  // Previous button clicked  
  document.getElementById('prev').addEventListener('click', () => {
  
    currentFoundWord--;
    
    // Highlight previous word
    highlightWord(results[currentFoundWord]);
  
    // Update buttons
    updateButtons(results);
    
  });
  
  function highlightWord(wordData) {
  
    // Unhighlight any currently highlighted words
    unhighlightWords();
  
    // Highlight new word
    const wordElement = document.getElementById(wordData.id);
    wordElement.classList.add('highlighted');
  
  }
  
  function unhighlightWords() {
    document.querySelectorAll('.highlighted').forEach(el => {
      el.classList.remove('highlighted');
    });
  }
  
  function updateButtons(results) {
  
    const numFound = results.length;
  
    document.getElementById('count').textContent = `${currentFoundWord + 1}/${numFound}`;
  
    document.getElementById('next').disabled = currentFoundWord === numFound - 1;
    document.getElementById('prev').disabled = currentFoundWord === 0;
  
  }
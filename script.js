// Your code using FlexSearch goes here
const searchIndex = new FlexSearch.Index();

async function init() {
    buildSearchIndex();
}

function search(word) {
    const matches = searchWords(word);
    highlightWords(matches);
}

function highlightWords(matches) {
    if (matches) {
        matches.forEach((word, index) => {
            alert(word)
            document.body.innerHTML = document.body.innerHTML.replace(
              word,
              (match) => `<span class="highlight">${match}</span>`
            );
        })
    }
  }

function buildSearchIndex() {
    const words = document.body.innerText.split(/\s+/);
    words.forEach((word, index) => {
        alert(word)
        searchIndex.add(index, word);
    });
  }

  function searchWords(word) {
    const results = searchIndex.search(word);
    return results.length ? results : [];
  }

  function removeAllHighlights() {
    const highlights = document.querySelectorAll(".highlight");
    highlights.forEach((highlight) => {
      highlight.outerHTML = highlight.innerHTML;
    });
  }

  function scrollToMatch(index) {
    const highlight = document.querySelectorAll(".highlight")[index];
    if (highlight) {
      highlight.scrollIntoView({ behavior: "smooth" });
    }
  }

init();

// document.addEventListener("DOMContentLoaded", () => {
//     const searchInput = document.getElementById("searchInput");
//     const searchBtn = document.getElementById("searchBtn");
//     const countLabel = document.getElementById("countLabel");
  
//     searchBtn.addEventListener("click", () => {
//       const word = searchInput.value;
//       search(word);
//     });
//   });
  
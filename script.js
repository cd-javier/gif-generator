let word = 'frog';

const Selectors = (function () {
  const searchForm = document.forms[0];
  const searchInput = searchForm.elements['gif-search'];
  const refreshBtn = document.getElementById('refresh-btn');
  const img = document.querySelector('img');

  return { searchForm, searchInput, refreshBtn, img };
})();

async function getGif(word) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=UyYp8PVGH92tMcbG2q5wiY71bF9P1vKV&s=${word}`,
      { mode: 'cors' }
    );
    const gifData = await response.json();

    Selectors.img.src = gifData.data.images.original.url;
  } catch (error) {
    console.error(error);
  }
}

Selectors.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (Selectors.searchInput.value) {
    word = Selectors.searchInput.value;
    Selectors.searchForm.reset();
    getGif(word);
  }
});

Selectors.refreshBtn.addEventListener('click', () => {
  getGif(word);
});

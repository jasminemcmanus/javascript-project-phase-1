// taking API data and rendering it on the page

function displayGoogleBook() {

    fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20&fields=items')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        displayRandomGoogleBook(data);
    })
}

function displayRandomGoogleBook(data) {
    let form = document.querySelector('form');
    form.style.display = 'none';

    let max = data.items.length - 1;
    let index = Math.floor(Math.random() * max );

    let card = document.getElementById('book-display');
    card.style.display = 'block';
    
    let cover = document.querySelector('#book-display img');
    cover.src = `${data.items[index].volumeInfo.imageLinks.thumbnail}`;

    let title = document.querySelector('#book-display h2');
    title.innerText = data.items[index].volumeInfo.title;
        
    let author = document.querySelector('#book-display h3');
    author.innerText = data.items[index].volumeInfo.authors;

    let description = document.querySelector('#book-display p');
    description.innerText = data.items[index].volumeInfo.description;

}

// the form to filter selections

function displayForm() {
    let form = document.querySelector('form')
        if (form.style.display === 'block') {
            form.style.display = 'none'
        } else {
            form.style.display = 'block'
        }

}

const init = () => {
    const inputForm = document.querySelector('form');
  
    inputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      let genre = document.querySelector('input#genre');
      let cleanGenre = genre.value.replace(/ /g,"%2B")
      console.log(cleanGenre)

      fetch(`https://books.googleapis.com/books/v1/volumes?q=subject:${cleanGenre}&maxResults=40&fields=items`)
      .then(response => response.json())
      .then(data => {
        displayRandomGoogleBook(data);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);

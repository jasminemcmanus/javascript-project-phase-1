// global variables

let genreDisplay = document.getElementById('genre-display');
let selectedGenre = document.getElementById('selected-genre');
let form = document.querySelector('form');

// event listeners for buttons

const randomiseButton = document.querySelector('button.primary');
    randomiseButton.addEventListener('click', function(){displayRandomBook()});

const inputForm = document.querySelector('form');
inputForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let formGenre = document.querySelector('input#genre');
    let cleanGenre = formGenre.value.replace(/ /g,"%2B")

    displayRandomBook(cleanGenre);

    genreDisplay.style.display = 'block';
    selectedGenre.innerText = genre.value
    }
)

const formButton = document.querySelector('button.secondary');
    formButton.addEventListener('click', displayForm);

// taking API data and rendering it on the page

function displayRandomBook(genre = 'fiction') {
    genreDisplay.style.display = 'none';
    form.style.display = 'none';

    console.log(`genre is ${genre}`);

    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=40&fields=items`)
    
    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
        selectRandomBook(data);
    })

}

// randomising API data, callback function

function selectRandomBook(data) {

    if (typeof data.items === 'object') {
        let max = data.items.length - 1;
        let index = Math.floor(Math.random() * max );

        let card = document.getElementById('book-display');
        card.style.display = 'block';
        
        let cover = document.querySelector('#book-display img');

        if (typeof data.items[index].volumeInfo.imageLinks == 'undefined') {
            cover.src = './src/no-cover-art.jpg'
        }
        else {
            cover.src = `${data.items[index].volumeInfo.imageLinks.thumbnail}`;
        }

        let title = document.querySelector('#book-display h2');
        title.innerText = data.items[index].volumeInfo.title;
        
        let author = document.querySelector('#book-display h3');
        author.innerText = data.items[index].volumeInfo.authors;

        let description = document.querySelector('#book-display p');
        description.innerText = data.items[index].volumeInfo.description;
    }
    else {
        handleErrors();
    }

}

// displaying the form to filter selections

function displayForm() {
    let form = document.querySelector('form')
        if (form.style.display === 'block') {
            form.style.display = 'none'
        } else {
            form.style.display = 'block'
        }

}

// handling errors

function handleErrors() {
    let alertBox = document.querySelector('div.alert');
    alertBox.style.display = 'block';
}

let closeButton = document.querySelector('span.close-button');
    closeButton.addEventListener('click', (closeFunction))

function closeFunction() {
    this.parentElement.style.display='none';
}
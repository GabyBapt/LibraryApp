let books = [];

const bookGrid = document.getElementById('bookGrid');
const modal = document.getElementById('modal');
const addBookBtn = document.getElementById('addBookBtn');
const closeModal = document.getElementById('closeModal');
const saveBook = document.getElementById('saveBook');
const searchInput = document.getElementById('search');

function displayBooks(filter = '') {
    bookGrid.innerHTML = '';
    books
        .filter(book => book.title.toLowerCase().includes(filter.toLowerCase()))
        .forEach(book => {
            const div = document.createElement('div');
            div.classList.add('book-item');
            div.innerHTML = `<strong>${book.title}</strong><br>${book.author}`;
            bookGrid.appendChild(div);
        });
}

addBookBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

saveBook.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const status = document.getElementById('status').value;

    if (title && author) {
        books.push({ title, author, isbn, status });
        displayBooks();
        modal.style.display = 'none';
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
        document.getElementById('status').value = 'to-read';
    }
});

searchInput.addEventListener('input', e => {
    displayBooks(e.target.value);
});

displayBooks()
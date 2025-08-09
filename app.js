let books = [];
let currentFolder = "all";

const bookListEl = document.getElementById('bookList');
const folders = document.querySelectorAll('.folder');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('modal');
const addBookBtn = document.getElementById('addBookBtn');
const closeModalBtn = document.getElementById('closeModal');

document.getElementById('bookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = this.title.value.trim();
    const author = this.author.value.trim();
    const status = this.status.value;
    const isbn = this.isbn.value.trim();

    if(title && author) {
        const book = { title, author, status, isbn };
        books.push(book);
        displayBooks();
        closeModal();
        this.reset();
    }
});

folders.forEach(folder => {
    folder.addEventListener('click', () => {
        folders.forEach(f => f.classList.remove('active'));
        folder.classList.add('active');
        currentFolder = folder.dataset.folder;
        displayBooks();
    });
});

searchInput.addEventListener('input', displayBooks);

addBookBtn.addEventListener('click', () => {
    openModal();
});

closeModalBtn.addEventListener('click', () => {
    closeModal();
});

function openModal() {
    modal.classList.remove('hidden');
}
function closeModal() {
    modal.classList.add('hidden');
}

function displayBooks() {
    const filterText = searchInput.value.toLowerCase();
    bookListEl.innerHTML = '';

    const filteredBooks = books.filter(book => {
        const inFolder = (currentFolder === 'all') || (book.status === currentFolder);
        const matchesSearch = book.title.toLowerCase().includes(filterText) || book.author.toLowerCase().includes(filterText);
        return inFolder && matchesSearch;
    });

    if(filteredBooks.length === 0) {
        bookListEl.innerHTML = '<p>No books found.</p>';
        return;
    }

    filteredBooks.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('book-item');
        div.innerHTML = `<strong>${book.title}</strong> by ${book.author} - <em>${book.status}</em>` +
                        (book.isbn ? `<br>ISBN: ${book.isbn}` : '');
        bookListEl.appendChild(div);
    });
}

function scanISBN() {
    alert("ISBN scanner feature would open here (camera API)");
}
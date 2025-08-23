/* Central Help Registry
 * This file contains all the help content for the application.
 * It is structured by feature, with each feature having a title, description, and sections.
 * The sections include "whatIs", "howTo", "tips", "troubleshooting", and "developerNotes".
 * The fileMap lists the primary and secondary files related to the feature.
 */

export const helpContent = {
  app: {
    title: "Main Application",
    description: "The main application component.",
    sections: {
      whatIs: "This is the core component of the application. It orchestrates the different parts of the library, including the sidebar, the main content area, and the 'add book' functionality.",
      howTo: "The main view is composed of a sidebar for navigation and filtering, and a content area to display the books. Use the '+' button to add new books.",
      tips: "Use the search bar and folder filters to quickly find the books you are looking for.",
      troubleshooting: "If books are not appearing, make sure the correct folder is selected and the search term is empty.",
      developerNotes: "This component holds the state for the search term and the selected folder. It filters the books based on these states and passes the filtered books to the LibraryContent component."
    },
    fileMap: {
      primary: ["App.jsx"],
      secondary: ["sideBar.jsx", "libraryContent.jsx", "addChoices.jsx", "bookContext.jsx"]
    }
  },
  sidebar: {
    title: "Sidebar",
    description: "The sidebar for navigation and filtering.",
    sections: {
      whatIs: "The sidebar contains the folder list and the search bar. It allows you to filter the books by folder and to search for specific books.",
      howTo: "Click on a folder to see the books in that folder. Use the search bar to search for books by title or author.",
      tips: "You can create new folders by clicking the 'New +' button.",
      troubleshooting: "If the search is not working, make sure you have spelled the title or author correctly.",
      developerNotes: "The sidebar receives the selected folder and search term from the App component and updates them on user input."
    },
    fileMap: {
      primary: ["sideBar.jsx"],
      secondary: ["folderList.jsx"]
    }
  },
  libraryContent: {
    title: "Library Content",
    description: "The main content area where books are displayed.",
    sections: {
      whatIs: "This is the main area where the books in your library are displayed.",
      howTo: "The books are displayed in a grid. Click on a book to view its details.",
      tips: "The books are filtered based on the selected folder and the search term.",
      troubleshooting: "If a book is not displayed, check the selected folder and the search term.",
      developerNotes: "This component receives the filtered books from the App component and renders them using the BookTile component."
    },
    fileMap: {
      primary: ["libraryContent.jsx"],
      secondary: ["bookTile.jsx", "bookContext.jsx"]
    }
  },
  addMenu: {
    title: "Add Menu",
    description: "The menu for adding new books.",
    sections: {
      whatIs: "This menu provides different options for adding a new book to your library.",
      howTo: "Click the '+' button to open the menu. You can then choose to add a book manually, scan a barcode, search online, or enter an ISBN.",
      tips: "Adding a book manually gives you the most control over the book details.",
      troubleshooting: "If the menu does not open, make sure you are clicking the '+' button.",
      developerNotes: "This component can open the BookModal component to add a book manually."
    },
    fileMap: {
      primary: ["addChoices.jsx"],
      secondary: ["bookModal.jsx"]
    }
  },
  bookModal: {
    title: "Book Modal",
    description: "The modal for adding, editing, and viewing book details.",
    sections: {
      whatIs: "This modal allows you to add a new book, edit the details of an existing book, or view the details of a book.",
      howTo: "Fill in the form to add or edit a book. Click 'Save' to save the changes or 'Cancel' to close the modal.",
      tips: "Make sure to fill in all the required fields.",
      troubleshooting: "If the modal does not close, make sure you are clicking the 'Cancel' button or the 'Save' button.",
      developerNotes: "The mode prop determines the behavior of the modal (add, edit, or view)."
    },
    fileMap: {
        primary: ["bookModal.jsx"],
        secondary: ["bookContext.jsx"]
    }
  },
  bookTile: {
    title: "Book Tile",
    description: "The component for displaying a single book.",
    sections: {
      whatIs: "This component displays a single book in the library.",
      howTo: "Click on the book tile to view the details of the book.",
      tips: "The book tile shows the title, author, and status of the book.",
      troubleshooting: "If the book details are not correct, you can edit them by clicking on the book tile and then clicking the 'Edit' button.",
      developerNotes: "When clicked, it opens the BookModal in 'view' mode to show the book details."
    },
    fileMap: {
      primary: ["bookTile.jsx"],
      secondary: ["bookModal.jsx"]
    }
  },
  folderList: {
    title: "Folder List",
    description: "The component for displaying the list of folders.",
    sections: {
        whatIs: "This component displays the list of folders. It allows you to select a folder to filter the books.",
        howTo: "Click on a folder to see the books in that folder. You can also add, rename, and delete folders.",
        tips: "Use folders to organize your books.",
        troubleshooting: "If you cannot delete a folder, it might be a default folder that cannot be deleted.",
        developerNotes: "This component manages its own state for the folders."
    },
    fileMap: {
        primary: ["folderList.jsx"],
        secondary: []
    }
  },
  bookContext: {
    title: "Book Context",
    description: "The main context for the application.",
    sections: {
      whatIs: "This is the central store for the application. It holds the list of books and provides functions to add and update books.",
      howTo: "The book context is used by the App component to provide the book data to the other components.",
      tips: "The book context is a good place to add more functionality related to books, such as deleting books or fetching books from an API.",
      troubleshooting: "If the book data is not being updated, make sure that the components that modify the book data are calling the functions provided by the book context.",
      developerNotes: "This context holds the list of books and provides functions to add and update books."
    },
    fileMap: {
      primary: ["bookContext.jsx"],
      secondary: ["bookModel.js"]
    }
  },
  bookModel: {
    title: "Book Model",
    description: "The data model for a book.",
    sections: {
      whatIs: "This file defines the structure of a book object.",
      howTo: "The book model is used by the BookContext to create new books.",
      tips: "You can add more properties to the book model to store more information about the books.",
      troubleshooting: "If you are getting errors related to book properties, make sure that the properties are defined in the book model.",
      developerNotes: "This file defines the base structure of a book object. It is used in the BookContext to create new books."
    },
    fileMap: {
      primary: ["bookModel.js"],
      secondary: []
    }
  }
};

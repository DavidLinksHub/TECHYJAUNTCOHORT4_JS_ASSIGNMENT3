class Book { 
    constructor(title, author, isbn, available = true) {
     this.title = title;
     this.author = author;
     this._isbn = isbn; //Private property convention using _
     this.available =available;
    }
 
    //Getter for ISBN;
    get isbn(){
     return this._isbn;
    }
     
    //Setter for ISBN (Preventing modification)
    set isbn(value){
     throw new Error("ISBN cannot be modified directly.");
    }
 
    borrowBook(){
     if (this.available){
         this.available = false;
         console.log(`You have borrowed ${this.title} by ${this.author}. `);
     }else {
         console.log(`sorry, ${this.title} is not available for borrowing.`);
     }
    }
 
    returnBook(){
     this.available = true;
     console.log(` ${this.title} has been returned and it's now available. `)
    }
 }
 
 class Library {
     constructor(){
         this.books = [];
     }
 
     addBook(book) {
         if (book instanceof Book){
             this.books.push(book);
             console.log(`Book ${book.title} by ${book.author} has been added to the library`);
         }else{
             console.log("Only book objects can be added to the library");
         }
     }
 
    removeBook(isbn) {
     const index = this.books.findIndex(book => book.isbn === isbn);
     if(index !== -1){
         console.log(`Book ${this.books[index].title} has been removed from the library`);
         this.books.splice(index,1);
     }else{
         console.log(`No book with ISBN ${isbn} found in the library.`)
     }
    }
 
    findBookByTitle (title) {
       const book = this.books.find(book => book.title.toLowerCase() === title.toLowerCase());
       if (book){
            console.log(`found book ${book.title} by ${book.author}`);
            return book;
       }else{
         console.log(`No book with the title ${title} found`);
         return null;
       }
    }
 }
 
 class DigitalLibrary extends Library {
     downloadBook(isbn){
       const book = this.books.find(book => book.isbn === isbn);
       if(book){
         if(book.available){
             console.log(`${book.title} by ${book.author} is available for download.`);
             //simulating book download
             book.available = false;
             console.log(`You have downloaded ${book.title}. It is now marked as unavailable.`)
         } else {
             console.log(`Sorry, ${book.title} is currently not available for download.`);
         } 
       }else{
         console.log(`No book with ISBN ${isbn} found in the library.`);
       }
     }
 }
 
 //Test cases:
 
 //List of books
 const book1 = new Book( "Things fall apart", "Chinua Achebe", 5678943211097654);
 const book2 = new Book ("The Independence", "Chimanda Adichie", 3487612909864876);
 const book3 = new Book("Chike and the River", "Paul Akabogu", 45687909874387);
 
 //create a library and add books to it
 const library = new Library();
 library.addBook(book1); //Output: Book Things fall apart by Chinua Achebe has been added to the library
 library.addBook(book2); //Output: Book The Independence by Chimanda Adichie has been added to the library
 
 //Borrow a book
 book1.borrowBook(); //Output: You have borrowed Things fall apart by Chinua Achebe.
 book1.borrowBook();  //Output: sorry, Things fall apart is not available for borrowing.
 
 //Find a book by title
 library.findBookByTitle("Things fall Apart"); //Output: found book Things fall apart by Chinua Achebe
 
 //Remove a book by ISBN
 library.removeBook(3487612909864876); //Output: Book The Independence has been removed from the library
 
 //Create a digital libray
 const digitalLibrary = new DigitalLibrary();
 digitalLibrary.addBook(book1); //Output: Book Things fall apart by Chinua Achebe has been added to the library
 digitalLibrary.addBook(book2); //Output: Book The Independence by Chimanda Adichie has been added to the library
 digitalLibrary.addBook(book3); //Output: Book Chike and the River by Paul Akabogu has been added to the library
 
 //Download a book
 digitalLibrary.downloadBook(45687909874387); /*Chike and the River by Paul Akabogu is available for download.
 You have downloaded Chike and the River. It is now marked as unavailable.*/
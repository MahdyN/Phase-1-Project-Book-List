document.addEventListener("DOMContentLoaded", () => {
    // Defining variables to be used in our script
    const searchForm = document.querySelector('form#search-form')    // form on which we will be calling the submit event on
    const userSearchTitle = document.querySelector('input#search-title')  // the text value of this will be used in the fetch function to search for books
    const selectedBookImage = document.querySelector('div#selected-image img') // we will update the src attribute of this image with the first returned book cover and replace it with the other 9 returned books upon request (click event)
    const selectedBookTitle = document.querySelector('h2.book-name')          // will update innertext of this element
    const selectedBookAuthor = document.querySelector('h3.book-author')       // will update innertext of this element
    const selectedBookDescription = document.querySelector('p#description-text') // will update innertext of this element
    const searchListHeader = document.querySelector('div#search-div h2 u')
    const searchList = document.querySelector('ul#search-list') // upon submitting search form, list items of every book title as well as a button for more info and a button to add that book as a list item in the user book list, event listeners for buttons added as they are being created
    const addBookForm = document.querySelector('form#addBook-form')  // form which will add a book title to the user's book list and have a submit event listener
    const userBookTitle = document.querySelector('input#add-book') // the text value of this will be used to fill the inner text of the list item in the user book list
    const userBookList = document.querySelector('ul#user-list') // list items will be added here by the add book button in the search list and the manual user text input in the add book form, buttons need to be created on every list item and event listeners on each as they are being made

    // Array for Random Book Keywords:
    const keywordPool = [   'Lord Of The Rings', 
                            'Harry Potter', 
                            'Python', 
                            'JavaScript', 
                            'The Hobbit', 
                            'Hunger Games', 
                            'Tale',
                            'Catcher',
                            'Physics',
                            'To Kill A Mockingbird',
                            "Charlotte's",
                            "The Kite Runner",
                            "The Shack",
                            "The Fault",
                            "Dune",
                            "Godfather",
                            "Peter Rabbit",
                            "Cosmos",
                            "Animal Farm",
                            "Goose",
                            "Star",
                            "James Bond",
                            "Marine"
                        ]

    // upon DOM content load want to fetch a random word from a random word generator api and use that as a keyword to fetch the results from the books api and populate the search list and the selected image div (could consolidate this with beginning of the search form event) 
        
        const randomKeyword = keywordPool[Math.floor(Math.random() * keywordPool.length)]
        searchListHeader.innerText = `Randomly Generated List for '${randomKeyword}':`
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${randomKeyword}`)
        .then((response) => response.json())
        .then((books) => {
            // changing book info to first book in the returned search list upon fetching random book list
            selectedBookImage.setAttribute('src', `${books.items[0].volumeInfo.imageLinks.thumbnail}`)
            selectedBookTitle.innerText = books.items[0].volumeInfo.title
            selectedBookAuthor.innerText = books.items[0].volumeInfo.authors[0]
            selectedBookDescription.innerText = books.items[0].volumeInfo.description
            searchList.innerHTML= ''

            books.items.forEach((book) => {
                // Creating the list items and the more info/add book button
                const searchListItem = document.createElement('li')
                const moreInfoButton = document.createElement('button')
                const addBookButton = document.createElement('button')
                moreInfoButton.innerText = 'More Info  '
                moreInfoButton.classList=  "more-info"
                addBookButton.innerText = 'Add Book'
                addBookButton.classList = 'add-book'
                searchListItem.innerText = `${book.volumeInfo.title}       `
                searchListItem.appendChild(moreInfoButton)
                searchListItem.appendChild(addBookButton)
                searchList.appendChild(searchListItem)
                // adding event listeners to the buttons
                moreInfoButton.addEventListener('click', () => {
                    selectedBookImage.setAttribute('src', `${book.volumeInfo.imageLinks.thumbnail}`)
                    selectedBookTitle.innerText = book.volumeInfo.title
                    selectedBookAuthor.innerText = book.volumeInfo.authors[0]
                    selectedBookDescription.innerText = book.volumeInfo.description
                })
                // Whenever a user adds a book to their list, two buttons must also be created, the remove book from list button and the status button (Not Read/Read)
                addBookButton.addEventListener('click', () => {
                    const userListItem = document.createElement('li')
                    const removeBookButton =  document.createElement('button')
                    const statusButton = document.createElement('button')
                    removeBookButton.innerText = 'Remove Book'
                    statusButton.innerText = 'Not Read'
                    statusButton.classList = 'not-read'
                    userListItem.innerText = `${book.volumeInfo.title}      `
                    userListItem.appendChild(removeBookButton)
                    userListItem.appendChild(statusButton)
                    userBookList.appendChild(userListItem)

                    removeBookButton.addEventListener('click', (e) => {
                        e.target.parentNode.remove()
                    })

                    statusButton.addEventListener('click', () => {
                        if(statusButton.innerText === 'Not Read') {
                            statusButton.innerText = 'Read'
                            statusButton.classList = "read"
                        }
                        else if (statusButton.innerText === 'Read') {
                            statusButton.innerText = 'Not Read'
                            statusButton.classList = 'not-read'
                        }
                    })
                })
            })
        })


    // Adding event listener on search form to start flow of data
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()      // prevent default behavior of submit event
        searchListHeader.innerText = `Search Results For '${userSearchTitle.value}'':`
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${userSearchTitle.value}`)
        .then((response) => response.json())
        .then((books) => {
            // changing book info to first book in the returned search list upon form submission
            selectedBookImage.setAttribute('src', `${books.items[0].volumeInfo.imageLinks.thumbnail}`)
            selectedBookTitle.innerText = books.items[0].volumeInfo.title
            selectedBookAuthor.innerText = books.items[0].volumeInfo.authors[0]
            selectedBookDescription.innerText = books.items[0].volumeInfo.description
            searchList.innerHTML= ''
            // iterating over the returned book list and creating a list item as well as buttons and event listeners for the buttons
            books.items.forEach((book) => {
                // Creating the list items and the more info/add book button
                const searchListItem = document.createElement('li')
                const moreInfoButton = document.createElement('button')
                const addBookButton = document.createElement('button')
                moreInfoButton.innerText = 'More Info  '
                moreInfoButton.classList=  "more-info"
                addBookButton.innerText = 'Add Book'
                addBookButton.classList = 'add-book'
                searchListItem.innerText = `${book.volumeInfo.title}       `
                searchListItem.appendChild(moreInfoButton)
                searchListItem.appendChild(addBookButton)
                searchList.appendChild(searchListItem)
                // adding event listeners to the buttons
                moreInfoButton.addEventListener('click', () => {
                    selectedBookImage.setAttribute('src', `${book.volumeInfo.imageLinks.thumbnail}`)
                    selectedBookTitle.innerText = book.volumeInfo.title
                    selectedBookAuthor.innerText = book.volumeInfo.authors[0]
                    selectedBookDescription.innerText = book.volumeInfo.description
                })
                // Whenever a user adds a book to their list, two buttons must also be created, the remove book from list button and the status button (Not Read/Read)
                addBookButton.addEventListener('click', () => {
                    const userListItem = document.createElement('li')
                    const removeBookButton =  document.createElement('button')
                    const statusButton = document.createElement('button')
                    removeBookButton.innerText = 'Remove Book'
                    statusButton.innerText = 'Not Read'
                    statusButton.classList = 'not-read'
                    userListItem.innerText = `${book.volumeInfo.title}      `
                    userListItem.appendChild(removeBookButton)
                    userListItem.appendChild(statusButton)
                    userBookList.appendChild(userListItem)

                    removeBookButton.addEventListener('click', (e) => {
                        e.target.parentNode.remove()
                    })

                    statusButton.addEventListener('click', () => {
                        if(statusButton.innerText === 'Not Read') {
                            statusButton.innerText = 'Read'
                            statusButton.classList = "read"
                        }
                        else if (statusButton.innerText === 'Read') {
                            statusButton.innerText = 'Not Read'
                            statusButton.classList = 'not-read'
                        }
                    })
                })
            })
        })
        searchForm.reset()  // resets input text of form - may have to move this depending on behavior, needs testing
    })







    // adding event to the user book submision form, will create a list item everytime form is submitted and append the same two buttons and their corresponding event listeners
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const userListItem = document.createElement('li')
        const removeBookButton =  document.createElement('button')
        const statusButton = document.createElement('button')
        removeBookButton.innerText = 'Remove Book'
        statusButton.innerText = 'Not Read'
        statusButton.classList = 'not-read'
        userListItem.innerText = `${userBookTitle.value}          `
        userListItem.appendChild(removeBookButton)
        userListItem.appendChild(statusButton)
        userBookList.appendChild(userListItem)

        removeBookButton.addEventListener('click', (e) => {
            e.target.parentNode.remove()
        })

        statusButton.addEventListener('click', () => {
            if(statusButton.innerText === 'Not Read') {
                statusButton.innerText = 'Read'
                statusButton.classList = "read"
            }
            else if (statusButton.innerText === 'Read') {
                statusButton.innerText = 'Not Read'
                statusButton.classList = 'not-read'
            }
        })

        addBookForm.reset()
    })
})
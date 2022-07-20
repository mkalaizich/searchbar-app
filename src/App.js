import React, { useState } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent/SearchComponent';
import SearchResultsComponent from './components/SearchResultsComponent/SearchResultsComponent';
import { sanitizeString } from './utils/sanitizeString';

const books = require('./assets/books.json').books;

function App() {
  const [displayBooks, setDisplayBooks] = useState(null);
  const searchBarCriteria = [
    {
      name: 'title',
      options: books.map((book) => book.title).sort(),
    },
    {
      name: 'author',
      options: [...new Set(books.map((book) => book.author))].sort(),
    },
    {
      name: 'genre',
      options: [
        ...new Set(books.map((book) => book.genres.split(', ')).flat()),
      ].sort(),
    },
  ];

  function getSearchParams(searchParams) {
    const { searchCriteria, searchValue } = searchParams;

    setDisplayBooks(
      books.filter((book) => {
        if (searchCriteria) {
          return sanitizeString(book[searchCriteria]).includes(
            sanitizeString(searchValue)
          );
        }
        sanitizeString(book.description).includes(sanitizeString(searchValue))
        return (
          sanitizeString(book.title).includes(sanitizeString(searchValue)) ||
          sanitizeString(book.author).includes(sanitizeString(searchValue)) ||
          sanitizeString(book.genres).includes(sanitizeString(searchValue)) ||
          sanitizeString(book.description).includes(sanitizeString(searchValue))
        );
      })
    );
  }

  return (
    <div className='app-container'>
      <SearchComponent
        criteria={searchBarCriteria}
        getData={getSearchParams}
      />
      {displayBooks && <SearchResultsComponent data={displayBooks}/>}
    </div>
  );
}

export default App;

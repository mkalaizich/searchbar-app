import React from 'react';
import './SearchResultsComponent.css';

function SearchResultsComponent({ data }) {
  return (
    <div className='search-results-container'>
      {!data.length && <p>No results found.</p>}
      {!!data.length &&
        data.map((item, i) => (
          <div className='result-card'>
            <img src={item.image} className='result-image' alt='No image found.'/>
            <div className='data-container'>
              <p className='title'>
                {item.title} ({item.published})
              </p>
              <p className='author'>{item.author}</p>
              <p className='description'>{item.description}</p>
              <div>
                {item.genres.split(', ').map((genre) => (
                  <span className='tag'>{genre}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SearchResultsComponent;

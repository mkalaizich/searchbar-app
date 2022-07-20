import React, { useState } from 'react';
import './SearchComponent.css';
import { sanitizeString } from '../../utils/sanitizeString';

function SearchComponent({ criteria, getData }) {
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [autocompleteEnabled, setAutocompleteEnabled] = useState(false);

  function changeCriteria(value) {
    if (value === searchCriteria) {
      setSearchCriteria(null);
      return;
    }
    setSearchCriteria(value);
    setSearchValue('');
  }

  return (
    <div className='search-component'>
      <div className='searchbar-container'>
        <input
          className='searchbar'
          type='text'
          placeholder='Type to search a book...'
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter' && searchValue !== '') {
              getData({ searchCriteria, searchValue });
            }
          }}
          onBlur={() => {
            setTimeout(() => setAutocompleteEnabled(false), 500);
          }}
          onFocus={() => setAutocompleteEnabled(true)}
          value={searchValue}
        />
        <button
          className='search-button'
          disabled={searchValue === ''}
          onClick={() => getData({ searchCriteria, searchValue })}
        >
          Search
        </button>
        {autocompleteEnabled && searchValue && searchCriteria && (
          <ul className='search-autocomplete'>
            {criteria
              .find((el) => el.name === searchCriteria)
              .options.filter((el) =>
                sanitizeString(el).includes(sanitizeString(searchValue))
              )
              .map((item, i) => (
                <li
                  key={`dataItem-${i}`}
                  onClick={(e) => {
                    setSearchValue(item);
                    setAutocompleteEnabled(false);
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className='criteria-container'>
        <p>Search by:</p>
        {criteria.map((item, i) => (
          <button
            key={`criteria-${i}`}
            className={`criteria-button ${
              searchCriteria === item.name && 'criteria-button_pressed'
            }`}
            onClick={() => changeCriteria(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchComponent;

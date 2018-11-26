import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';

import { SEARCH_CARS } from '../../queries';
import { StyledSearch, CarCard, CarCardLineWrapper } from '../Styles';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = async (event, client) => {
    event.persist();
    const { data } = await client.query({
      query: SEARCH_CARS,
      variables: { searchTerm: event.target.value },
    });
    setSearchResults(() => [...data.searchCars]);
  }

  return (
    <ApolloConsumer>
      {client => (
        <StyledSearch>
          <input
            type="search"
            placeholder="Search for cars badly parked 🔎"
            onChange={event => handleChange(event, client)}
          />
          <CarCardLineWrapper>
            {searchResults.map(car => (
              <CarCard key={car._id} multi={searchResults && searchResults.length > 1}>
                <div
                  className="car-image"
                  style={{ background: `url(${car.imageUrl}) center center / cover no-repeat` }}  
                >
                </div>
                <div>
                  <h2>
                    <strong>{car.plateNo}</strong>
                  </h2>
                  <p>
                    {car.likes} <span role="img" aria-label="Heart">❤</span>
                  </p>
                </div>
              </CarCard>
            ))}
          </CarCardLineWrapper>
        </StyledSearch>
      )}
    </ApolloConsumer>
  );
};

export default Search;

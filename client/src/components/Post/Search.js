import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';

import { SEARCH_POSTS } from '../../queries';
import { StyledSearch, PostCard, PostCardLineWrapper } from '../Styles';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = async (event, client) => {
    event.persist();
    console.log(event.target.value);
    if (event.target.value === '') {
      setSearchResults([]);
      return;
    }
    const { data } = await client.query({
      query: SEARCH_POSTS,
      variables: { searchTerm: event.target.value },
    });
    setSearchResults(() => [...data.searchPosts]);
  }

  return (
    <ApolloConsumer>
      {client => (
        <StyledSearch>
          <input
            type="search"
            placeholder="Search for bad parkings 🔎"
            onChange={event => handleChange(event, client)}
          />
          <PostCardLineWrapper>
            {searchResults.map(post => {
              return (
              <PostCard key={post._id} multi={searchResults && searchResults.length > 1}>
                <div
                  className="post-image"
                  style={{ background: `url(${post.imageUrl}) center center / cover no-repeat` }}  
                >
                </div>
                <div>
                  <h2>
                    <strong>{post.description}</strong>
                  </h2>
                  <p>
                    {post.likes} <span role="img" aria-label="Heart">❤</span>
                  </p>
                </div>
              </PostCard>
            );
            })}
          </PostCardLineWrapper>
        </StyledSearch>
      )}
    </ApolloConsumer>
  );
};

export default Search;

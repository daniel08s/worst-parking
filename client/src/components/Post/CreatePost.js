import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import withAuth from '../withAuth';
import { useFormInput } from '../../hooks';
import { ADD_POST } from '../../queries';
import { StyledButton } from '../Styles';

const Page = styled.form`
  padding-left: 20px;
  display: grid;
  grid-template-areas:
    ". . . . ." 
    ". . p . ." 
    ". . p . ."
    ". . . . .";
    justify-items: center;
    justify-content: center;
`;

const PostCard = styled.div`
  grid-area: p;
  background: rgb(30, 30, 30) none repeat scroll 0% 0%;
  border-radius: 5px;
  padding: 32px 32px 24px;
  width: 400px;
  box-shadow: rgb(0, 0, 0) 0px 16px 40px;
  margin-top: 100px;
  color: white;
  display: grid;
  grid-template-areas:
    "h h h h" 
    "il il i i" 
    "id id i i"
    "ib ib in in"
    ". b b .";
  grid-gap: 10px;
  
  input[type=text] {
    background: transparent;
    border: none;
    border-bottom: 2px solid #FFF;
    font-size: 14px;
    color: #FFF;

    :required {
      border-bottom-color: palegreen;
    }

    :optional {
      border-bottom-color: peachpuff;
    }

    :invalid {
      border-bottom-color: salmon;
    }
  }
`;

const PostHeader = styled.div`
  grid-area: h;
  font-weight: 800;
  font-size: 20px;
  text-align: center;
  margin-bottom: 25px;
`;

const PostImage = styled.div`
  grid-area: i;
  min-height: 200px;
  width: 200px;
`;

const PostImageInput = styled.div`
  grid-area: il;
  
`;

const PostDescInput = styled.div`
  grid-area: id;
  
`;
const PostBrandInput = styled.div`
  grid-area: ib;
  
`;

const PostNationalityInput = styled.div`
  grid-area: in;
  
`;

const SubmitButton = styled(StyledButton)`
  grid-area: b;
  margin-top: 25px;
`;

const CreatePost = props => {
  const imageUrl = useFormInput('');
  const description = useFormInput('');
  const brand = useFormInput('');
  const nationality = useFormInput('');
  const { username } = props.session.getCurrentUser;

  const validate = () => {
    return imageUrl.value && description.value;
  };

  const handleSubmit = (event, addPost) => {
    event.preventDefault();
    addPost().then(async () => {
      await props.refetch();
      props.history.push('/');
    });
  };

  return (
    <Mutation
      mutation={ADD_POST}
      variables={{
        imageUrl: imageUrl.value,
        description: description.value,
        brand: brand.value,
        nationality: nationality.value,
        username: username,
      }}
    >
      {(addPost, { loading, data, error }) => (
        <Page onSubmit={e => handleSubmit(e, addPost)}>
          <PostCard>
            <PostHeader>Something to share? Do it here!</PostHeader>
            <PostImageInput>
              <input
                type="text"
                placeholder="URL of the image"
                id="image"
                {...imageUrl}
                required
              />
            </PostImageInput>
            <PostImage style={{ background: `url(${imageUrl.value}) center center / cover no-repeat` }}  />
            <PostDescInput>
              <input
                type="text"
                placeholder="Description"
                id="description"
                {...description}
                required
              />
            </PostDescInput>
            <PostBrandInput>
              <input
                type="text"
                placeholder="Brand"
                id="brand"
                {...brand}
              />
            </PostBrandInput>
            <PostNationalityInput>
              <input
                type="text"
                placeholder="Nationality"
                id="nationality"
                {...nationality}
              />
            </PostNationalityInput>
            <SubmitButton
              type="submit"
              disabled={loading || !validate()}
              onSubmit={e => handleSubmit(e, addPost)}
            >
              Submit
            </SubmitButton>
          </PostCard>
        </Page>
      )}
    </Mutation>
  );
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(CreatePost));

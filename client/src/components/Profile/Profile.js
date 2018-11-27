import React from 'react';
import styled from 'styled-components';

import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import withAuth from '../withAuth';

const StyledProfile = styled.div`
  padding-left: 20px;
  display: grid;
  justify-items: center;
  justify-content: center;
  margin-top: 100px;
  color: white;

  ul {
    list-style: none;
    padding: 0px;
  }
`;

const StyledContainer = styled.div`
  background: rgb(30, 30, 30) none repeat scroll 0% 0%;
  border-radius: 5px;
  padding: 32px 32px 24px;
  width: 400px;
  box-shadow: rgb(0, 0, 0) 0px 16px 40px;
  color: white;
`;

const Profile = ({ session }) => (
  <StyledProfile>
    <StyledContainer>
      <UserInfo session={session} />
      <UserPosts username={session.getCurrentUser.username} />
    </StyledContainer>
  </StyledProfile>
);

export default withAuth(session => session && session.getCurrentUser)(Profile);

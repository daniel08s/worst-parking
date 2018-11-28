import React from 'react';

import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import withAuth from '../withAuth';
import { StyledContainer, StyledProfile } from '../Styles';

const Profile = ({ session }) => (
  <StyledContainer>
    <StyledProfile>
      <UserInfo session={session} />
      <UserPosts username={session.getCurrentUser.username} />
    </StyledProfile>
  </StyledContainer>
);

export default withAuth(session => session && session.getCurrentUser)(Profile);

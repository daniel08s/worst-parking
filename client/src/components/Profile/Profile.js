import React from 'react';

import UserInfo from './UserInfo';
import UserPosts from './UserPosts';
import withAuth from '../withAuth';
import { StyledContainer, StyledProfile } from '../Styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Profile = ({ session }) => (
  <StyledContainer>
    <PerfectScrollbar>
      <StyledProfile>
        <UserInfo session={session} />
        <UserPosts username={session.getCurrentUser.username} />
      </StyledProfile>
    </PerfectScrollbar>
  </StyledContainer>
);

export default withAuth(session => session && session.getCurrentUser)(Profile);

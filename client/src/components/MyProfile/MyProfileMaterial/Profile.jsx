import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import profileImg from '../../../assets/jpg-file/profile-img.jpg';

const ProfileInfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1100px;
  margin-bottom: 36px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 26px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Nickname = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FollowDetails = styled.div`
  display: flex;
  gap: 5px;
`;

const FollowStyle = styled.div`
  color: var(--light-gray-400);
  font-weight: 500;
`;

const MyProfileInfo = ({ profile }) => {
  return (
    <ProfileInfoBlock>
      <ProfileImage src={profile.profileImage || profileImg} alt='Profile' />
      <ProfileDetails>
        <Nickname>{profile.nickname}</Nickname>
        <FollowDetails>
          {profile.followings} <FollowStyle>팔로잉</FollowStyle>
          <div>&gt;</div>
          {profile.followers} <FollowStyle>팔로워</FollowStyle>
        </FollowDetails>
      </ProfileDetails>
    </ProfileInfoBlock>
  );
};

export default MyProfileInfo;

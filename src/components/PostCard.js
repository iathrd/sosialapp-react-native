import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Devider,
} from '../styles/FeedStyles';

export default function PostCard({item}) {
  const likeIcon = item.liked ? 'heart' : 'heart-outline';
  const likeIconColor = item.liked ? '#2e64e5' : '#333';
  let likeText = '';
  let commenText = '';

  if (item.likes === 1) {
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = `${item.likes} Likes`;
  } else {
    likeText = 'Like';
  }

  if (item.comments === 1) {
    commenText = '1 Comment';
  } else if (item.Comments > 1) {
    commenText = `${item.comments} Comment`;
  } else {
    commenText = 'Comment';
  }

  return (
    <Card>
      <UserInfo>
        <UserImg source={item.userImg} />
        <UserInfoText>
          <UserName>{item.userName}</UserName>
          <PostTime>{item.postTime}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg !== 'none' ? (
        <PostImg source={item.postImg} />
      ) : (
        <Devider />
      )}
      <InteractionWrapper>
        <Interaction active={item.liked}>
          <IonIcons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <IonIcons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commenText}</InteractionText>
        </Interaction>
      </InteractionWrapper>
    </Card>
  );
}

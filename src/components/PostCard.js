import React, {useContext} from 'react';
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
import {AuthContext} from '../Navigation/AuthProviders';
import moment from 'moment';
import ProgresiveImage from './ProgresiveImage';

export default function PostCard({item, onDelete}) {
  const likeIcon = item.liked ? 'heart' : 'heart-outline';
  const likeIconColor = item.liked ? '#2e64e5' : '#333';
  const {user} = useContext(AuthContext);
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
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg !== null ? (
        // <PostImg source={{uri: item.postImg}} />
        <ProgresiveImage
          defaultImageSource={require('../../assets/default-img.jpg')}
          source={{uri: item.postImg}}
          style={{width: '100%', height: 250}}
          resizeMode='cover'
        />
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
        {user.uid === item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <IonIcons name="md-trash-bin" size={25} />
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  );
}

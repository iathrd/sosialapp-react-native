import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList, Alert} from 'react-native';
import FormButton from '../components/FormButton';
import IonIcons from 'react-native-vector-icons/Ionicons';
import PostCard from '../components/PostCard';

import {AuthContext} from '../Navigation/AuthProviders';

import {Container} from '../styles/FeedStyles';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function Home() {
  const {logout, user} = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPost = async () => {
    const list = [];
    try {
      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {
              post,
              postImg,
              postTime,
              likes,
              comments,
              userId,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Christy Alex',
              userImg: require('../../assets/users/user-7.jpg'),
              postTime: postTime,
              post: post,
              postImg: postImg,
              liked: false,
              likes: likes,
              comments: comments,
            });
          });
        });
      setPost(list);
      if (loading) {
        setLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const deletePost = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();
          if (postImg !== null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log('Image has been deleted');
                deleteFirestoreData(postId);
                setDeleted(true);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            deleteFirestoreData(postId);
            setDeleted(true);
          }
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert('Post deleted', 'Your post has been deleted succesfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('canceled'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    fetchPost();
    setDeleted(false);
  }, [deleted]);

  return (
    <Container>
      <FlatList
        data={post}
        renderItem={({item}) => (
          <PostCard item={item} onDelete={handleDelete} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

import React from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <Onboarding
        onSkip={() => navigation.replace('Login')}
        onDone={() => navigation.navigate('Login')}
        pages={[
          {
            backgroundColor: '#a6e4d0',
            image: (
              <Image source={require('../../assets/onboarding-img1.png')} />
            ),
            title: 'Connect to the world',
            subtitle: 'A New Way To Connect With The World ',
          },
          {
            backgroundColor: '#fdeb93',
            image: (
              <Image source={require('../../assets/onboarding-img2.png')} />
            ),
            title: 'Share Your Favorites',
            subtitle: 'Share Your Thoughs With Similiar Kind of People ',
          },
          {
            backgroundColor: '#e9bcbe',
            image: (
              <Image source={require('../../assets/onboarding-img3.png')} />
            ),
            title: 'Become the start',
            subtitle: 'Let The Spot Light Capture You',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

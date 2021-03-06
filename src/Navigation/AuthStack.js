import React, {useEffect, useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-community/google-signin';

import Login from '../screens/Login';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignUp from '../screens/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function AuthStack() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
    GoogleSignin.configure({
      webClientId: '279876378955-i5kiag94m5tpl38jikakp19vn3l5ihte.apps.googleusercontent.com',
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Onboarding"
        component={OnboardingScreen}
      />
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={Login}
      />
      <Stack.Screen
        name="SignUp"
        options={{
          title: null,
          headerStyle: {elevation: 0, backgroundColor: 'transparent'},
        }}
        component={SignUp}
      />
    </Stack.Navigator>
  );
}

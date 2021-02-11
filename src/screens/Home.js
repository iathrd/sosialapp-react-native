import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../components/FormButton';

import {AuthContext} from '../Navigation/AuthProviders';

export default function Home() {
  const {logout, user} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>welcome {user.email}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});

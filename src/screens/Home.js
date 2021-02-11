import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../components/FormButton';

import {AuthContext} from '../Navigation/AuthProviders';

export default function Home() {
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
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

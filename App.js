/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Auth} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';

async function getUserInfo(setUserInfo) {
  const userInfo = await Auth.currentUserInfo();
  console.log('userInfo', userInfo);
  setUserInfo(userInfo);
}

function Home() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    getUserInfo(setUserInfo);
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Amplify Email Authentication</Text>
          <Text style={styles.sectionDescription}>
            Your userInfo is {JSON.stringify(userInfo)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const withAuthenticatorConfig = {
  usernameAttributes: 'email',
  signUpConfig: {
    hiddenDefaults: ['phone_number'],
  },
};

const App = withAuthenticator(Home, withAuthenticatorConfig);

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
});

export default App;

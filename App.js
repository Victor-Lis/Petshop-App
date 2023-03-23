import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabRoute from './src/routes/BottomTabRoute';

import firebase from './src/connections/fireBaseConfig';
import Login from './src/components/Login';

export default function App() {
  
  const [user, setUser] = useState(null)

  if(!user){

    return(

      <Login newUser={setUser}/>

    )

  }else{

    return (
      <NavigationContainer>
  
        <BottomTabRoute userUid={user}/>
  
      </NavigationContainer>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

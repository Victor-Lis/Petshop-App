import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AdmBottomTabRoute from './src/routes/AdmBottomTabRoute';
import BottomTabRoute from './src/routes/BottomTabRoute';

import firebase from './src/connections/fireBaseConfig';
import Login from './src/components/Login';

export default function App() {
  
  const [user, setUser] = useState(null)
  const [cargo, setCargo] = useState(null)

  useEffect(() => {

    if(user){

      function checkCargo(){

        firebase.database().ref(`cadastros/${user}`).on('value', (snapshot) => {
      
          setCargo();
  
          setCargo(snapshot?.val().cargo) 
  
        })
  
      }

      checkCargo()

    }

  }, [user])

  if(!user){

    return(

      <Login newUser={setUser}/>

    )

  }else if(cargo === "Cliente"){

    return (
      <NavigationContainer>
  
        <BottomTabRoute userUid={user}/>
  
      </NavigationContainer>
    );

  }else if(cargo === "Administrador"){

    return (
      <NavigationContainer>
  
        <AdmBottomTabRoute userUid={user}/>
  
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

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Picker from '@ouroboros/react-native-picker';
import firebase from '../connections/fireBaseConfig';

export default function Agendamentos({route}) {

    const [user, setUser] = useState(route.params?.userUid)
    const [pets, setPets] = useState([{}])
    const [picker, setPicker] = useState('');

    function getPets(){
    
      firebase.database().ref(`agendamentos/${user}/pets`).once('value', (snapshot) => {
  
        setPets([]);

          snapshot?.forEach((childItem) => {

            let nome = childItem.val().nome

            setPets(oldPets => [...oldPets, {value: nome, text: nome}])

          })

          setPicker(pets[0])

      })

    }

    useEffect(() => 

      getPets()
    
    ,[])

 return (
   <View>

      <Text> Cadastrar Agendamento </Text>
      <Picker
        onChanged={setPicker}
        options={pets}
        value={picker}
      />

   </View>
  );
}

const styles = StyleSheet.create({

  container: {
      padding: 3.5,
      alignItems: 'center',
      flexDirection: "row",
      borderRadius: 15,
      borderColor: "#fefbfe",
      backgroundColor: "#fff",
      borderWidth: 1.5,
      margin: 5,
  }, 

});
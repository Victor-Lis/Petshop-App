import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Picker from '@ouroboros/react-native-picker';
import firebase from '../connections/fireBaseConfig';

export default function Agendamentos({route}) {

    const [user, setUser] = useState(route.params?.userUid)
    const [pets, setPets] = useState([{}])
    const [picker, setPicker] = useState('');

    function getPets(){
    
      firebase.database().ref(`cadastros/${user}/pets`).on('value', (snapshot) => {

          setPets([])

          snapshot?.forEach((childItem) => {

            let pet = {

              key: childItem.key,
              value: childItem.key, 
              text: childItem.val().nome,

            }

            setPets(oldPets => [...oldPets, pet])

          })

          setPicker(pets[0].nome)

      })

    }

    useEffect(() => 

      getPets()
    
    ,[])

 return (
   <View>

      <Text> Cadastrar Agendamento do {picker} </Text>
      <Picker
        style={styles.addPicker}
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
  addPicker:{

    borderColor: "#d6d6d6",
    backgroundColor: "#fff",
    borderWidth: 1.0,
    paddingVertical: 1,
    paddingHorizontal: 15,
    borderRadius: 20,
    color: "#000",
    minWidth: '80%',

  },

});
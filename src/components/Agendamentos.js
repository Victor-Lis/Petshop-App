import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import Picker from '@ouroboros/react-native-picker';
import firebase from '../connections/fireBaseConfig';

export default function Agendamentos({route}) {

  const [user, setUser] = useState(route.params?.userUid)
  const [horario, setHorario] = useState(null)
  const [data, setDate] = useState(null)
  const [pets, setPets] = useState([])
  const [picker, setPicker] = useState(null)
  const [petDatas, setPetDatas] = useState({})

  async function marcar(){

    if(data != null && horario != null && picker != null){

      firebase.database().ref(`agendamentos/${data}`).once('value', (snapshot) => {

        if(snapshot.exists()) {
          firebase.database().ref(`agendamentos/${data}/${horario}`).on('value', (snapshot) => {

            if(snapshot.exists()){

              alert("Horário Indisponivel")
              
            }else{
      
              let agendamentos = firebase.database().ref(`agendamentos/${data}/${horario}`)
  
              // "agendamentos/${user}/pets/chave"
              agendamentos.set(petDatas)
              
            }
          })
        }else{
          let agendamentos = firebase.database().ref(`agendamentos/${data}/`)
  
          // "agendamentos/${user}/pets/chave"
          agendamentos.set(horario)
          firebase.database().ref(`agendamentos/${data}/${horario}`).set(petDatas)
        }

      })

    }

  }

  useEffect(() => {

    function getPetDatas(){

      firebase.database().ref(`cadastros/${user}/pets/${picker}`).on('value', (snapshot) => {

          console.log(snapshot.val())

          let petDatas = {

            petIdade: snapshot.val().idade,
            petNome: snapshot.val().nome,
            petId: snapshot.key,
            especie: snapshot.val().especie,
            responsavel: user

          }
          
          setPetDatas(petDatas)

      })

    }

    if(picker != null){

      getPetDatas()

    }

  }, [picker])

  useEffect(() => {

    function getPets(){

      firebase.database().ref(`cadastros/${user}/pets`).on('value', (snapshot) => {

        setPets([{text: "Selecione um pet", value: "selecione"}]);

        snapshot?.forEach((childItem) => {

          let data = {

            text: childItem.val().nome,
            value: childItem.key,

          }
          
          setPets(oldPets => [...oldPets, data])

        })

      })

    }

    getPets()

  }, [])

 return (
   <View style={styles.container}>
      <TextInput 
      
        placeholder='Data'
        value={data}
        onChangeText={(text) => setDate(text)}

      />
      <TextInput
      
        placeholder='Horário'
        value={horario}
        onChangeText={setHorario}

      />
      <Picker
      
        options={pets}
        value={picker}
        onChanged={setPicker}

      />
      <TouchableOpacity onPress={() => marcar()}>

        <Text> Marcar! </Text>

      </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({

  container: {
      padding: 3.5,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: "column",
      borderRadius: 15,
      borderColor: "#fefbfe",
      backgroundColor: "#fff",
      borderWidth: 1.5,
      margin: 5,
  },
  
});
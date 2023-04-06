import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import Picker from '@ouroboros/react-native-picker';
import firebase from '../connections/fireBaseConfig';

export default function Agendamentos({route}) {

  const [user, setUser] = useState(route.params?.userUid)
  const [hora, setHora] = useState(null)
  const [minuto, setMinuto] = useState("00")
  const [date, setDate] = useState(null)
  const [month, setMonth] = useState(null)
  const [pets, setPets] = useState([])
  const [picker, setPicker] = useState(null)
  const [petDatas, setPetDatas] = useState({})

  async function marcar(){

    let data = date+"-"+month;
    let horario = hora+":"+minuto;

    if(data != null && horario != null && picker != null){

      firebase.database().ref(`agendamentos/${date}`).once('value', (snapshot) => {

        console.log(`${data} já está registrado? ${!snapshot.exists()}`)

        if(!snapshot.exists()){
          firebase.database().ref(`agendamentos/${data}/${horario}`).once('value', (snapshot) => {

            console.log(`${data} as ${horario} já está registrado? ${snapshot.exists()}`)

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
          
          const agendamentosRef = firebase.database().ref(`cadastros/${user}/pets/${picker}/agendamentos`);
          const novoAgendamentoRef = agendamentosRef.push();
          novoAgendamentoRef.set(petDatas);
          
        }

      })

    }

  }

  useEffect(() => {

    function getPetDatas(){

      firebase.database().ref(`cadastros/${user}/pets/${picker}`).on('value', (snapshot) => {

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

        setPets("");

        snapshot?.forEach((childItem) => {

          let data = {

            text: " "+childItem.val().nome+"",
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
      <View style={styles.row}>
        <Text style={styles.title}> Dia </Text>
        <Text style={styles.title}> e </Text>
        <Text style={styles.title}> Mês </Text>
      </View>
      <View style={styles.row}>
        <TextInput 
      
          placeholder='Dia'
          value={date}
          onChangeText={(text) => setDate(text)}
          style={styles.input}
          maxLength={2}

        />
        <Text>

          /

        </Text>
        <TextInput 
      
          placeholder='Mês'
          value={month}
          onChangeText={(text) => setMonth(text)}
          style={styles.input}
          maxLength={2}

        />
      </View>
      <View style={[styles.row, {marginTop: 20}]}>
        <Text style={styles.title}> Hora </Text>
        <Text style={styles.title}> e </Text>
        <Text style={styles.title}> Minuto </Text>
      </View>

      <View style={styles.row}> 
        <TextInput
      
          placeholder='Hora'
          value={hora}
          onChangeText={setHora}
          style={styles.input}
          maxLength={2}

        />
        <Text>

          :

        </Text>
        <TextInput
      
          placeholder='Minuto'
          value={minuto}
          onChangeText={setMinuto}
          style={[styles.input, {color: "#000"}]}
          maxLength={2}
          editable={false}

        />
      </View>
        <Text style={[styles.title, {marginTop: 30}]}> Pet </Text>
        <Picker
      
          options={pets}
          value={picker}
          onChanged={setPicker}
          style={[styles.input]}

        />
      <TouchableOpacity onPress={() => marcar()} style={styles.button}>

        <Text style={styles.textButton}> Marcar! </Text>

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
    height: "98.5%",
    elevation: 2,

  },
  title: {

    fontSize: 18.5,
    fontWeight: 'bold',
    marginHorizontal: .5,
    marginTop: 15,
    marginBottom: 7.5,

  },
  row:{

    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row'

  },
  input:{

    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    marginHorizontal: 5,
    textAlign: "center",
    minWidth: "15%",

  },
  button: {

    backgroundColor: "#000",
    padding: 10,
    borderRadius: 15,
    elevation: 5,
    marginTop: "15%",

  },
  textButton: {

    color: "#fff",

  }
  
});
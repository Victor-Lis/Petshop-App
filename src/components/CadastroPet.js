import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Picker from '@ouroboros/react-native-picker';
import firebase from '../connections/fireBaseConfig';

export default function CadastroPet({route}) {

    const [user, setUser] = useState(route.params?.userUid)
    const [nomePet, setNomePet] = useState(null)
    const [idadePet, setIdadePet] = useState(null)
    const [picker, setPicker] = useState('C');

    async function setNewPet(){

      if(nomePet != " " && idadePet.indexOf("-") == -1 && idadePet.indexOf(".") == -1 && idadePet > 0 && idadePet < 100){

        let pets = firebase.database().ref(`cadastros/${user}/pets`)
        let chave = pets.push().key
  
        // "agendamentos/${user}/pets/chave"
        pets.child(chave).set({
  
          nome: nomePet,
          idade: idadePet,
          especie: picker,
          responsavel: user,
  
        })

        alert("Pet cadastrado!")

        setNomePet(null)
        setIdadePet(null)
        setPicker("C")

      }else{

        alert("Preencha os dados corretamente!")

      }

    }

  return (
   <View style={styles.container}>

      <Text style={styles.title}> Dados do Pet </Text>

    <View style={styles.addRow}>

      <Text style={styles.addText}> Nome do Pet </Text> 
      <TextInput style={styles.addInput} placeholder='Nome do Pet' onChangeText={setNomePet} value={nomePet} maxLength={10}/>

    </View>
    <View style={styles.addRow}>

      <Text style={styles.addText}> Idade </Text> 
      <TextInput style={styles.addInput} placeholder='Idade' keyboardType='number-pad' value={idadePet} maxLength={2} onChangeText={setIdadePet}/>

    </View>

    <View style={styles.addRow}>
      <Text style={styles.addText}> Espécie </Text>
      <Picker
        style={styles.addPicker}
        onChanged={setPicker}
        options={[
            {value: 'G', text: 'Gato'},
            {value: 'C', text: 'Cachorro'},
            {value: 'P', text: 'Papagaio'}
        ]}
        value={picker}
      />
    </View>

    <TouchableOpacity style={styles.addButton}>

        <Text style={{color: '#fff', fontSize: 15,}} onPress={setNewPet}> Salvar! </Text>

    </TouchableOpacity>

   </View>
  );
}

const styles = StyleSheet.create({

  container:{

    flex: 1,
    backgroundColor: "rgba(50,50,50,0.01)",
    flexDirection: 'column',
    alignItems: 'center'

  },
  title:{

    fontSize: 20,
    margin: 20,
    marginTop: 25,
    fontWeight: 'bold',

  },
  addRow: {

    marginVertical: 10,
    flexDirection: 'row',
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',

  },
  addText:{

    fontWeight: "bold",
    paddingRight: 5,
    width: '65%',
    textAlign: 'right'

  },
  addInput:{

    borderColor: "#d6d6d6",
    backgroundColor: "#fff",
    borderWidth: 1.0,
    paddingVertical: 1,
    paddingHorizontal: 15,
    borderRadius: 20,
    textAlign: 'left',
    minWidth: '40%',

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
  addButton:{

    backgroundColor: "#000",
    borderColor: "#d6d6d6",
    borderWidth: 2,
    borderRadius: 40,
    padding: 1,
    width: "25%",
    minHeight: "06.5%",
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 15,
    elevation: 5,

  }

})
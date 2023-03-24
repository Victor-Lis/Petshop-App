import React, {useState, useEffect} from 'react';
import { View, Text, FlatList } from 'react-native';

import firebase from '../connections/fireBaseConfig';
import Pet from './Pet';

export default function Pets({route}) {

    const [user, setUser] = useState(route.params?.userUid)
    const [pets, setPets] = useState([])

    function handleDelete(key){

      firebase.database().ref(`cadastros/${user}/pets/${key}`).remove()
      .then(() => {
  
        const findPets = pets.filter( item => item.key !== key)
        setPets(findPets)
  
      })
  
    }

    useEffect(() => {

        function getUser(){
    
          if(!user){
    
            return
    
          }
    
          firebase.database().ref(`cadastros/${user}/pets`).on('value', (snapshot) => {
    
            setPets([]);
    
            snapshot?.forEach((childItem) => {
    
              let data = {
    
                key: childItem.key,
                nome: childItem.val().nome,
                idade: childItem.val().idade,
                especie: childItem.val().especie
    
              }
              
              setPets(oldPets => [...oldPets, data])
    
            })
    
          })
    
        }
    
        getUser()
    
      }, [])
    
  return (
   <View style={{flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: "center"}}>

        <FlatList
            style={{flex: 1}}
            data={pets}
            renderItem={({item, index}) => <Pet handleDelete={handleDelete} chave={item.key} index={index} nome={item.nome} idade={item.idade} especie={item.especie}/>}
        />

   </View>
  );
}

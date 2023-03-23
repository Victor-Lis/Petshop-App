import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Feather from 'react-native-vector-icons/Feather'

export default function Pet({index, nome, idade, especie, handleDelete, chave}) {
 return (
      <View style={styles.container}>

        <Text style={{fontWeight: "bold",}}> {index+1} - </Text>

        <View style={styles.row}>

          <Text> {nome}, </Text>
          <Text style={{marginRight: 1.5}}>{idade} anos </Text>

        </View>

          {especie == "C" && <Text style={{marginLeft: 1.5, color: "rgba(0,0,0,0.55)"}}> Cachorro </Text>}
          {especie == "G" && <Text style={{marginLeft: 1.5, color: "rgba(0,0,0,0.55)"}}> Gato </Text>}
          {especie == "P" && <Text style={{marginLeft: 1.5, color: "rgba(0,0,0,0.55)"}}> Papagaio </Text>}

        <TouchableOpacity onPress={() => handleDelete(chave)}>

          <Feather name="trash" color='#000' size={22} style={{marginHorizontal: 8.5,}}/>

        </TouchableOpacity>

      </View>
  );
}

const styles = StyleSheet.create({

    container: {
        minWidth: "75%",
        padding: 3.5,
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 15,
        borderColor: "#fefbfe",
        backgroundColor: "#fff",
        borderWidth: 1.5,
        margin: 5,
    }, 
    row:{

        alignItems: 'center',
        flexDirection: "row",
        flex: 1,

    }

});
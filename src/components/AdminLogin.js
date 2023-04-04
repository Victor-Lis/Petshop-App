import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import firebase from '../connections/fireBaseConfig'

export default function AdminLogin() {

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [celular, setCelular] = useState("");
    const [cpf, setCPF] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");

    async function handleLogin(){
    
        let newEmail = '';

        if(email[email.length - 1] === " "){

            newEmail = email.slice(0, -1)

        }

            if(password != secondPassword){

                alert("As senhas estão diferentes!")
                return

            }
            
            await firebase.auth().createUserWithEmailAndPassword((newEmail == ''? email : newEmail), password)
            .then(user => {

                console.log(user.user.uid)
                const newRef = firebase.database().ref(`cadastros/${user.user.uid}`);
                newRef.set({

                    cargo: "Administrador",
                    email: (newEmail == ''? email : newEmail),
                    celular: celular,
                    CPF: cpf,
                    senha: password,
                    nome: nome,

                })
                setEmail("")
                setCelular("")
                setCPF("")
                setPassword("")
                setSecondPassword("")
                setNome("")
                console.log("Cadastro bem sucedido")
                alert("Funcionário Criado!")

            })
            .catch(err => {

                alert(err.message)
                console.log("Algo deu errado!")

            })

    }

 return (
   <SafeAreaView style={styles.container}>
        <StatusBar style="auto" hidden={true}/>

            <Text style={styles.title}> Cadastrar funcionário </Text>
            <TextInput
                placeholder='Nome'
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            /> 
            <TextInput
                placeholder='Seu email'
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder='Celular'
                style={styles.input}
                value={celular}
                onChangeText={setCelular}
            /> 
            <TextInput
                placeholder='CPF'
                style={styles.input}
                value={cpf}
                onChangeText={setCPF}
            /> 
            <TextInput
                placeholder='******'
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                placeholder='******'
                style={styles.input}
                value={secondPassword}
                onChangeText={setSecondPassword}
            /> 
        <TouchableOpacity
            style={[styles.handleLogin, {backgroundColor: "#141414", marginTop: 5}]}
            onPress={() => handleLogin()}
        >
            <Text style={styles.loginText}> Cadastrar </Text> 
        </TouchableOpacity>

   </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        paddingTop: 12.5,
        backgroundColor: "#f2f6fc",
        paddingHorizontal: 10,
        alignItems: "center"

    },
    title: {

        fontWeight: "bold",
        fontSize: 17.5,
        marginBottom: 15,

    },
    input: {

        marginBottom: 5,
        backgroundColor: "#fff",
        borderRadius: 5,
        height: 45,
        padding: 10,
        borderWidth: 0.5,
        borderColor: "#141414",
        minWidth: 350,

    },
    handleLogin: {

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#141414",
        height: 45,
        marginBottom: 10,
        borderRadius: 6.5,

    },
    loginText: {

        color: "#fff",
        fontSize: 17,

    }

})
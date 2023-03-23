import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import firebase from '../connections/fireBaseConfig'

export default function Login({newUser}) {

    const [type, setType] = useState("login")
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

        if(type === "login"){

            firebase.auth().signInWithEmailAndPassword((newEmail == ''? email : newEmail), password)
            .then(user => {
                newUser(user.user.uid)
                console.log("Login bem sucedido")

            })
            .catch(err => {

                alert(err.message)
                console.log("Algo deu errado!")

            })

        }else{

            if(password != secondPassword){

                alert("As senhas estão diferentes!")
                return

            }
            
            await firebase.auth().createUserWithEmailAndPassword((newEmail == ''? email : newEmail), password)
            .then(user => {

                newUser(user.user.uid)
                const newRef = firebase.database().ref(`agendamentos/${user.user.uid}`);
                newRef.set({

                    cargo: "Cliente",
                    email: newEmail,
                    celular: celular,
                    CPF: cpf,
                    senha: password,
                    nome: nome,
                    pets: "",

                })
                console.log("Cadastro bem sucedido")
            
            })
            .catch(err => {

                alert(err.message)
                console.log("Algo deu errado!")

            })

        }

    }

 return (
   <SafeAreaView style={styles.container}>
        <StatusBar style="auto" hidden={true}/>
        {type != 'login' && 
            <TextInput
                placeholder='Nome'
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            /> 
        }
        <TextInput
            placeholder='Seu email'
            style={styles.input}
            value={email}
            onChangeText={setEmail}
        />
        {type != 'login' && 
            <TextInput
                placeholder='Celular'
                style={styles.input}
                value={celular}
                onChangeText={setCelular}
            /> 
        }
        {type != 'login' && 
            <TextInput
                placeholder='CPF'
                style={styles.input}
                value={cpf}
                onChangeText={setCPF}
            /> 
        }
        <TextInput
            placeholder='******'
            style={styles.input}
            value={password}
            onChangeText={setPassword}
        />

        {type != 'login' && 
            <TextInput
                placeholder='******'
                style={styles.input}
                value={secondPassword}
                onChangeText={setSecondPassword}
            /> 
        }

        <TouchableOpacity
            style={[styles.handleLogin, {backgroundColor: type == "login"? "#3ea6f2": "#141414"}]}
            onPress={() => handleLogin()}
        >

            <Text style={styles.loginText}> {type == "login"? "Acessar": "Cadastrar"} </Text> 

        </TouchableOpacity>

        <TouchableOpacity onPress={() => setType(type => type === 'login' ? "cadastrar" : "login")}>

            <Text style={{textAlign: "center"}}> {type == "login"? "Criar uma conta": "Já possuo uma conta"} </Text>

        </TouchableOpacity>

   </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        paddingTop: 20,
        backgroundColor: "#f2f6fc",
        paddingHorizontal: 10,

    },
    input: {

        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        height: 45,
        padding: 10,
        borderWidth: 0.5,
        borderColor: "#141414",

    },
    handleLogin: {

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#141414",
        height: 45,
        marginBottom: 10,

    },
    loginText: {

        color: "#fff",
        fontSize: 17,

    }

})
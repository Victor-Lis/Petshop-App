import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import CadastroPet from '../components/CadastroPet';

import Feather from 'react-native-vector-icons/Feather';
import Agendamentos from '../components/Agendamentos';
import Pets from '../components/Pets';  

export default function BottomTabRoute({userUid}) {
 return (
    <Tab.Navigator>
        <Tab.Screen
            name="Cadastro"
            component={CadastroPet}
            initialParams={{userUid: userUid}}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="clipboard" color={color} size={size} />
                },
            }}
        />
        <Tab.Screen
            name="Pets"
            component={Pets}
            initialParams={{userUid: userUid}}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="file-text" color={color} size={size} />
                },
            }}
        />
        <Tab.Screen
            name="Agendamento"
            component={Agendamentos}
            initialParams={{userUid: userUid}}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="calendar" color={color} size={size} />
                },
            }}
        />
    </Tab.Navigator>
  );
}
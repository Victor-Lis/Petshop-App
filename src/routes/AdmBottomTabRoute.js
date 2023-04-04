import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Feather from 'react-native-vector-icons/Feather';
import AdminHome from '../components/AdminHome';
import AdminAgendamentos from '../components/AdminAgendamentos';
import AdminLogin from '../components/AdminLogin'

export default function AdmBottomTabRoute({userUid}) {
 return (
    <Tab.Navigator>
        <Tab.Screen
            name="Home"
            component={AdminHome}
            initialParams={{userUid: userUid}}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="home" color={color} size={size} />
                },
            }}
        />
        <Tab.Screen
            name="Agendamentos"
            component={AdminAgendamentos}
            initialParams={{userUid: userUid}}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="file-text" color={color} size={size} />
                },
                tabBarHideOnKeyboard: true,
            }}
        />
        <Tab.Screen
            name="Cadastrar"
            component={AdminLogin}
            initialParams={{userUid: userUid}}
            options={{
                tabBarIcon: ({ color, size }) => {
                  return <Feather name="file-text" color={color} size={size} />
                },
                tabBarHideOnKeyboard: true,
            }}
        />
    </Tab.Navigator>
  );
}
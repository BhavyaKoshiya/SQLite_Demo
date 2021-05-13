import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import AddData from '../Screens/AddData';
import UpdateData from '../Screens/UpdateData';
import { NavigationContainer } from '@react-navigation/native';



export default function MainStack() {

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>

                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="AddData" component={AddData} options={{ headerShown: false }} />
                <Stack.Screen name="UpdateData" component={UpdateData} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>

    );
};
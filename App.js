import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookScreen from './src/screens/BookScreen.js';
import CreateScreen from './src/screens/CreateScreen.js';
import HomeScreen from './src/screens/HomeScreen.js';
import SignInScreen from './src/screens/SignInScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Book" component={BookScreen} />
                <Stack.Screen name="Create" component={CreateScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

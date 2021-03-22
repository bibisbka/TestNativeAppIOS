import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import SecondScreen from '../screens/SecondScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'MainScreen'} component={MainScreen} />
        <Stack.Screen name={'SecondScreen'} component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;

import React from 'react';
import { Provider } from 'react-redux';
import Home from './src/screens/Home';
import Information from './src/screens/Information';
import Done from './src/screens/Done';
import Error from './src/screens/Error';
import OutOfNoodles from './src/screens/OutOfNoodles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ headerShown: false }} // Tắt header nếu không cần
          />
          <Stack.Screen 
            name="Information" 
            component={Information} 
            options={{ headerShown: false}} // Thay đổi tiêu đề
          />
          <Stack.Screen 
            name="Done" 
            component={Done} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Error" 
            component={Error} 
            options={{ headerShown: false, headerStyle: { backgroundColor: 'red' }, headerTintColor: '#fff' }}
          />
          <Stack.Screen 
            name="OutOfNoodles" 
            component={OutOfNoodles} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

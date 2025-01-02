import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Information from './src/screens/Information';
import Done from './src/screens/Done';
import Error from './src/screens/Error';
import OutOfNoodles from './src/screens/OutOfNoodles';
import store from './store'; // Redux store
import CameraView from "./src/screens/CameraView";
// Tạo Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // Tắt header mặc định của stack
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  opacity: current.progress, // Hiệu ứng mờ dần
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ], // Hiệu ứng di chuyển từ trái sang phải
                },
                overlayStyle: {
                  opacity: current.progress, // Tạo lớp mờ trong suốt
                },
              };
            },
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 500 } }, // Thời gian mở
              close: { animation: 'timing', config: { duration: 500 } }, // Thời gian đóng
            },
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Information" component={Information} />
          <Stack.Screen name="Done" component={Done} />
          <Stack.Screen name="Error" component={Error} />
          <Stack.Screen name="OutOfNoodles" component={OutOfNoodles} />
          <Stack.Screen name="CameraView" component={CameraView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


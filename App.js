import { StatusBar } from 'expo-status-bar';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Signup from './screens/Signup.js';
import Login from './screens/Login.js';
import HomeScreen from './screens/HomeScreen.js';
import { useState, useEffect } from 'react';
import ProfileScreen from './screens/ProfileScreen.js';
import { MaterialIcons } from '@expo/vector-icons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(null); // null to indicate loading state

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const userToken = await AsyncStorage.getItem('userToken'); // Get the token from AsyncStorage
  //     setIsLoggedIn(!!userToken); // Update state based on token existence
  //   };

  //   checkLoginStatus();
  // }, []);

  // if (isLoggedIn === null) {
  //   return null; // You can return a loading spinner here
  // }

  function TabNavigation() {
    return(
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
              color = focused ? 'coral' : 'white';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person';
              color = focused ? 'coral' : 'white';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: "coral",

          tabBarInactiveTintColor: '#fff',

          tabBarStyle: {
            height: 50, // Increase the height of the tab bar
            backgroundColor: '#231C4D', // Set your desired background color
            paddingBottom: 8,
            paddingTop: 2,
          },

          tabBarLabelStyle: {
            fontSize: 12, // Adjust label size
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
      </Tab.Navigator>
    )
  }
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName={'Login'} screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name="HomeScreen" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

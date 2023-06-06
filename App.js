import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import des icônes Ionicons
import Header from './Header';
import Inscription from './Inscription';
import Apropos from './Apropos';
import Connexion from './Connexion'; 
import Accueil from './Acceuil';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Accueil}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Registration"
              component={Inscription}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person-add" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="About"
              component={Apropos}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="information-circle" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Login"
              component={Connexion}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="log-in" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function HomeScreen() {
  return <View style={styles.screenContainer}><Text>Acceuil</Text></View>;
}

function RegistrationScreen() {
  return <View style={styles.screenContainer}><Text>Inscription</Text></View>;
}

function AboutScreen() {
  return <View style={styles.screenContainer}><Text>A propos</Text></View>;
}

function LoginScreen() {
  return <View style={styles.screenContainer}><Text>Connexion</Text></View>;
}

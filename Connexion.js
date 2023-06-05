import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Profil from './Profil';
import Rechercher from './RechercheScreen';
import Combinaison from './Combinaison';

let globalEmail = '';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('Profil');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    // Effectuer les actions nécessaires lors de la connexion
    // Par exemple, envoyer les informations au serveur
    console.log('Connexion en cours avec les informations suivantes :');
    console.log('Email:', email);
    console.log('Mot de passe:', password);
    globalEmail = email.toLowerCase();

    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: globalEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        // L'email existe dans l'API
        setIsLoggedIn(true);
      } else {
        // L'email n'existe pas dans l'API
        setErrorMessage('Email non trouvé');
      }
    } catch (error) {
      console.log('Une erreur s\'est produite lors de la vérification de l\'email:', error);
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordVisible(true);
  };

  const handleResetPassword = () => {
    // Effectuer les actions nécessaires pour réinitialiser le mot de passe
    // Par exemple, envoyer une demande de réinitialisation au serveur
    console.log('Demande de réinitialisation du mot de passe envoyée à :', email);
    setForgotPasswordVisible(false);
  };

  const handleLogout = () => {
    // Effectuer les actions nécessaires lors de la déconnexion
    // Par exemple, supprimer les informations d'authentification, réinitialiser l'état, etc.
    setIsLoggedIn(false);
    setPassword(''); // Efface le mot de passe
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Profil' && styles.activeTabButton]}
            onPress={() => handleTabPress('Profil')}
          >
            <Text style={styles.tabButtonText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Rechercher' && styles.activeTabButton]}
            onPress={() => handleTabPress('Rechercher')}
          >
            <Text style={styles.tabButtonText}>Rechercher</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Combinaison' && styles.activeTabButton]}
            onPress={() => handleTabPress('Combinaison')}
          >
            <Text style={styles.tabButtonText}>Combinaison</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.signOutButton}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Authentification</Text>
          <TextInput
            style={styles.input}
            placeholder="Adresse Email"
            value={email}
            onChangeText={text => setEmail(text.toLowerCase())} // Convertir en minuscule
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Log In" onPress={handleLogin} />
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal visible={forgotPasswordVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Réinitialisation du mot de passe</Text>
            <Text style={styles.modalDescription}>
              Veuillez entrer votre adresse email pour réinitialiser votre mot de passe :
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Button title="Reset Password" onPress={handleResetPassword} />
            <TouchableOpacity onPress={() => setForgotPasswordVisible(false)}>
              <Text style={styles.modalCancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isLoggedIn && (
        <View style={styles.tabContent}>
          {activeTab === 'Profil' && <Profil />}
          {activeTab === 'Rechercher' && <Rechercher />}
          {activeTab === 'Combinaison' && <Combinaison />}
        </View>
      )}
    </View>
  );
}

function ProfilScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Profil</Text>
    </View>
  );
}

function RechercherScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Rechercher</Text>
    </View>
  );
}

function CombinaisonsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Combinaisons</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  forgotPasswordText: {
    fontSize: 16,
    marginTop: 8,
    color: 'blue',
  },
  errorMessage: {
    color: 'red',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  modalCancelText: {
    fontSize: 16,
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#888',
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: '#888',
  },
  tabButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    color: 'red',
    fontSize: 16,
  },
  tabContent: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export { globalEmail };
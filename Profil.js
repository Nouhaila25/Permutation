import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from 'react-native';
import { globalEmail } from './Connexion.js';

export default function ProfilScreen() {
  const [profil, setProfil] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [garde, setGarde] = useState('');
  const [etablissement, setEtabl] = useState('');
  const [specialite, setSpécia] = useState('');
  const [villeActuelle, setVilleActu] = useState('');
  const [villeDesiree, setVilleDesi] = useState('');
  
 


  useEffect(() => {
    // Simuler l'utilisateur connecté avec un e-mail prédéfini
    const utilisateurConnecteEmail = globalEmail;
    fetchProfil(utilisateurConnecteEmail);
  }, []);

  const fetchProfil = async (globalEmail) => {
    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs');
      const data = await response.json();

      const utilisateurConnecte = data.find((utilisateur) => utilisateur.email === globalEmail);

      if (utilisateurConnecte) {
        setProfil(utilisateurConnecte);
        setNom(utilisateurConnecte.nom);
        setPrenom(utilisateurConnecte.prenom);
        setTelephone(utilisateurConnecte.tel);
        setEmail(utilisateurConnecte.email);
        setGarde(utilisateurConnecte.grade);
        setEtabl(utilisateurConnecte.faculteActuelle);
        setSpécia(utilisateurConnecte.specialite);
        setVilleActu(utilisateurConnecte.villeFaculteActuelle);
        setVilleDesi(utilisateurConnecte.villeDesiree);

      } else {
        console.error('Utilisateur non trouvé');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations du profil:', error);
    }
  };

  const handleDeleteAccount = () => {
    console.log("Supprimer le compte utilisateur");
  };

  const handleEditProfile = () => {
    console.log("Modifier les informations du profil utilisateur");
  };

  if (!profil) {
    return (
      <View style={styles.container}>
        <Text>Loadingof the  profile...</Text>
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Last name:</Text>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>First name:</Text>
        <TextInput
          style={styles.input}
          value={prenom}
          onChangeText={setPrenom}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Telephone:</Text>
        <TextInput
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Rank:</Text>
        <TextInput
          style={styles.input}
          value={garde}
          onChangeText={setGarde}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Institution:</Text>
        <TextInput
          style={styles.input}
          value={etablissement}
          onChangeText={setEtabl}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Specialty:</Text>
        <TextInput
          style={styles.input}
          value={specialite}
          onChangeText={ setSpécia}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Current city:</Text>
        <TextInput
          style={styles.input}
          value={villeActuelle}
          onChangeText={setVilleActu}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Desired cities:</Text>
        <TextInput
          style={styles.input}
          value={villeDesiree}
          onChangeText={ setVilleDesi}
        />
      </View>
      <Button title="Remove the account" onPress={handleDeleteAccount} color="red" />
      <Button title="Modify the information" onPress={handleEditProfile} />
    </View>
    
  );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 2,
      },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  info: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
  },
});



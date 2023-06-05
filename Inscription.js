import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet ,ScrollView} from 'react-native';

export default function Inscription() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [grade, setGrade] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villesDesirees, setVillesDesirees] = useState('');

  const handleInscription = () => {
    // Effectuer les actions nécessaires lors de l'inscription
    // Par exemple, envoyer les données au serveur
    console.log('Inscription soumise avec succès');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nom"
          value={nom}
          onChangeText={setNom}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Prénom</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre prénom"
          value={prenom}
          onChangeText={setPrenom}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Téléphone</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre numéro de téléphone"
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre adresse email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre mot de passe"
          value={motDePasse}
          onChangeText={setMotDePasse}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Grade</Text>
        <TextInput
          style={styles.input}
          placeholder="Choisissez votre grade"
          value={grade}
          onChangeText={setGrade}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Etablissement</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre établissement"
          value={etablissement}
          onChangeText={setEtablissement}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Spécialité</Text>
        <TextInput
          style={styles.input}
          placeholder="Choisissez une spécialité"
          value={specialite}
          onChangeText={setSpecialite}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Ville Actuelle</Text>
        <TextInput
          style={styles.input}
          placeholder="Choisissez une ville"
          value={villeActuelle}
          onChangeText={setVilleActuelle}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Villes Désirées</Text>
        <TextInput
          style={styles.input}
          placeholder="Select..."
          value={villesDesirees}
          onChangeText={setVillesDesirees}
        />
      </View>
      <Button title="Inscription" onPress={handleInscription} />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
      },
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});

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
        <Text style={styles.inputLabel}>Last name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your last name"
          value={nom}
          onChangeText={setNom}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>First name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          value={prenom}
          onChangeText={setPrenom}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Telephone</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={motDePasse}
          onChangeText={setMotDePasse}
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Rank</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your rank"
          value={grade}
          onChangeText={setGrade}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Institution</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your institution"
          value={etablissement}
          onChangeText={setEtablissement}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Specialty</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your specialty"
          value={specialite}
          onChangeText={setSpecialite}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Current city</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your current city"
          value={villeActuelle}
          onChangeText={setVilleActuelle}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Desired cities</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your desired cities"
          value={villesDesirees}
          onChangeText={setVillesDesirees}
        />
      </View>
      <Button title="Registration" onPress={handleInscription} />
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

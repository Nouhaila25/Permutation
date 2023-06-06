import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function RechercherScreen() {
  const [specialites, setSpecialites] = useState([]);
  const [villesActuelles, setVillesActuelles] = useState([]);
  const [villesDesirees, setVillesDesirees] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [selectedVilleActuelle, setSelectedVilleActuelle] = useState('');
  const [selectedVilleDesiree, setSelectedVilleDesiree] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Défaut : true

  useEffect(() => {
    fetchSpecialites();
    fetchVillesActuelles();
    fetchVillesDesirees();
  }, []);

  useEffect(() => {
    fetchSearchResults();
  }, [selectedSpecialite, selectedVilleActuelle, selectedVilleDesiree]);

  const fetchSpecialites = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs');
      const data = await response.json();
      const allSpecialites = Array.from(new Set(data.map((item) => item.specialite))).sort();
      setSpecialites(allSpecialites);
    } catch (error) {
      console.error('Erreur lors de la récupération des spécialités:', error);
    }
    setIsLoading(false);
  };

  const fetchVillesActuelles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs');
      const data = await response.json();
      const allVillesActuelles = Array.from(new Set(data.map((item) => item.villeFaculteActuelle))).sort();
      setVillesActuelles(allVillesActuelles);
    } catch (error) {
      console.error('Erreur lors de la récupération des villes actuelles:', error);
    }
    setIsLoading(false);
  };

  const fetchVillesDesirees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs');
      const data = await response.json();
      const allVillesDesirees = Array.from(new Set(data.flatMap((item) => item.villeDesiree.split(';')))).sort();
      setVillesDesirees(allVillesDesirees);
    } catch (error) {
      console.error('Erreur lors de la récupération des villes désirées:', error);
    }
    setIsLoading(false);
  };

  const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs');
      const data = await response.json();

      let filteredResults = data;

      if (selectedSpecialite) {
        filteredResults = filteredResults.filter((professeur) => professeur.specialite === selectedSpecialite);
      }

      if (selectedVilleActuelle) {
        filteredResults = filteredResults.filter((professeur) => professeur.villeFaculteActuelle === selectedVilleActuelle);
      }

      if (selectedVilleDesiree) {
        filteredResults = filteredResults.filter((professeur) => {
          if (professeur.villeDesiree === selectedVilleDesiree) {
            return true;
          }
          const autresVilles = professeur.villeDesiree.split(';');
          if (autresVilles && autresVilles.some((ville) => ville === selectedVilleDesiree)) {
            return true;
          }
          return false;
        });
      }

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView style={styles.container1}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.label}>Specialty :</Text>
          <Picker
            selectedValue={selectedSpecialite}
            onValueChange={(itemValue) => setSelectedSpecialite(itemValue)}
          >
            <Picker.Item label="All the  specialtys" value="" />
            {specialites.map((specialite, index) => (
              <Picker.Item key={index} label={specialite} value={specialite} />
            ))}
          </Picker>

          <Text style={styles.label}>Current city :</Text>
          <Picker
            selectedValue={selectedVilleActuelle}
            onValueChange={(itemValue) => setSelectedVilleActuelle(itemValue)}
          >
            <Picker.Item label="All the cities" value="" />
            {villesActuelles.map((ville, index) => (
              <Picker.Item key={index} label={ville} value={ville} />
            ))}
          </Picker>

          <Text style={styles.label}>Desired cities :</Text>
          <Picker
            selectedValue={selectedVilleDesiree}
            onValueChange={(itemValue) => setSelectedVilleDesiree(itemValue)}
          >
            <Picker.Item label="All the cities" value="" />
            {villesDesirees.map((ville, index) => (
              <Picker.Item key={index} label={ville} value={ville} />
            ))}
          </Picker>

          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Search results</Text>
            {searchResults.length > 0 ? (
              searchResults.map((professeur, index) => (
                <View key={index} style={styles.resultItem}>
                  <Text style={styles.resultText}>{professeur.nom}</Text>
                  <Text style={styles.resultText}>{professeur.specialite}</Text>
                  <Text style={styles.resultText}>{professeur.villeFaculteActuelle}</Text>
                  <Text style={styles.resultText}>{professeur.villeDesiree}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noResultsText}>Loading...</Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container1: { flex: 1, padding: 6 },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultsContainer: {
    flex: 1,
  },
  resultItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
  },
  resultsTitle: { fontWeight: 'bold', fontSize: 18, marginTop: 20, marginBottom: 10 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noResultsText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

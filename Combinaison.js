import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart, Grid } from 'react-native-svg-charts';

export default function CombinaisonScreen() {
  const [specialites, setSpecialites] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState('');
  const [professeurs, setProfesseurs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSpecialites();
    fetchProfesseurs();
  }, []);

  const fetchSpecialites = async () => {
    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des spécialités');
      }
      const data = await response.json();
      const allSpecialites = Array.from(new Set(data.map((item) => item.specialite))).sort();
      setSpecialites(allSpecialites);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchProfesseurs = async () => {
    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des professeurs');
      }
      const data = await response.json();
      setProfesseurs(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const renderGraph = () => {
    const filteredProfesseurs = professeurs.filter((professeur) => professeur.specialite === selectedSpecialite);
    const labels = filteredProfesseurs.map((professeur) => professeur.nom);
    const data = filteredProfesseurs.map((professeur) => professeur.score);

    return (
      <View style={styles.graphContainer}>
        <LineChart
          style={{ height: 300 }}
          data={data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          gridMin={0}
        >
          <Grid />
        </LineChart>
        <View style={styles.labelsContainer}>
          {labels.map((label, index) => (
            <Text key={index} style={styles.labelText}>{label}</Text>
          ))}
        </View>
      </View>
    );
  };

  const renderCombinaisons = () => {
    const filteredProfesseurs = professeurs.filter((professeur) => professeur.specialite === selectedSpecialite);
    const combinaisons = filteredProfesseurs.map((professeur) => ({
      professeurActuel: professeur.nom,
      villeFaculteActuelle: professeur.villeFaculteActuelle,
      villeDesiree: professeur.villeDesiree,
    }));

    return (
      <View>
        <Text style={styles.combinaisonsTitle}>combination :</Text>
        {combinaisons.map((combinaison, index) => (
          <Text key={index} style={styles.combinaisonText}>
            {`${combinaison.professeurActuel} - ${combinaison.villeFaculteActuelle} -> ${combinaison.villeDesiree}`}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Specialty :</Text>
        <Picker
          selectedValue={selectedSpecialite}
          onValueChange={(itemValue) => setSelectedSpecialite(itemValue)}
        >
          <Picker.Item label="Select the specialization" value="" />
          {specialites
            .filter((specialite) => specialite !== "Selectionnez la spécialité")
            .map((specialite, index) => (
              <Picker.Item key={index} label={specialite} value={specialite} />
            ))}
        </Picker>
      </View>

      {selectedSpecialite ? (
        <View>
          <Text style={styles.graphTitle}>Graph of professors for the specialty {selectedSpecialite}</Text>
          {renderGraph()}
          {renderCombinaisons()}
        </View>
      ) : null}

      {error ? (
        <Text style={styles.errorText}>Erreur : {error}</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  graphContainer: {
    marginTop: 16,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  labelText: {
    fontSize: 12,
    color: 'gray',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 16,
  },
  combinaisonsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  combinaisonText: {
    fontSize: 14,
    marginTop: 8,
  },
});

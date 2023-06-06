import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';

export default function Accueil() {
  const [numProfsInscrits, setNumProfsInscrits] = useState(0);
  const [specialites, setSpecialites] = useState([]);
  const [villesDemandees, setVillesDemandees] = useState([]);
  const [numProfsParGrade, setNumProfsParGrade] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://troubled-red-garb.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        setNumProfsInscrits(data.length);
        setSpecialites(computeSpecialites(data));
        setVillesDemandees(computeVillesDemandees(data));
        setNumProfsParGrade(computeNumProfsParGrade(data));
        setLoading(false);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
        setLoading(false);
      });
  }, []);

  const computeSpecialites = (data) => {
    const specialitesCount = {};
    data.forEach((prof) => {
      const specialite = prof.specialite;
      if (specialite in specialitesCount) {
        specialitesCount[specialite] += 1;
      } else {
        specialitesCount[specialite] = 1;
      }
    });
    return Object.entries(specialitesCount).map(([label, value]) => ({
      label,
      value,
    }));
  };

  const computeVillesDemandees = (data) => {
    const villesCount = {};
    data.forEach((prof) => {
      const villeDemandee = prof.villeDesiree;
      if (villeDemandee && villeDemandee !== 'undefined') {
        if (villeDemandee in villesCount) {
          villesCount[villeDemandee] += 1;
        } else {
          villesCount[villeDemandee] = 1;
        }
      }
    });
    return Object.entries(villesCount).map(([label, value]) => ({
      label: label !== 'undefined' ? label : 'Inconnue',
      value,
    }));
  };

  const computeNumProfsParGrade = (data) => {
    const gradesCount = {};
    data.forEach((prof) => {
      const grade = prof.grade;
      if (grade in gradesCount) {
        gradesCount[grade] += 1;
      } else {
        gradesCount[grade] = 1;
      }
    });
    return Object.entries(gradesCount).map(([label, value]) => ({
      label,
      value,
    }));
  };

  const renderPieChart = (data, legend) => {
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    let total = 0;
    data.forEach((item) => {
      total += item.value;
    });

    let startAngle = 0;
    const arcs = data.map((item, index) => {
      const endAngle = startAngle + (item.value / total) * 360;

      const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

      const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

      const pathData = `M ${centerX},${centerY} L ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

      startAngle = endAngle;

      const color = getRainbowColor(index, data.length);

      return (
        <Path key={index} d={pathData} fill={color} />
      );
    });

    const legendItems = legend.map((item, index) => {
      const color = getRainbowColor(index, legend.length);
      return (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: color }]} />
          <Text style={styles.legendLabel}>{item.label}</Text>
        </View>
      );
    });

    return (
      <View style={styles.pieChartContainer}>
        <Svg width={200} height={200}>
          {arcs}
        </Svg>
        <View style={styles.legendContainer}>
          {legendItems}
        </View>
      </View>
    );
  };

  const getRainbowColor = (index, total) => {
    const hue = (360 * index) / total;
    return `hsl(${hue}, 100%, 50%)`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>statistics</Text>

      <View style={styles.section}>
        <Text style={styles.section}>Number of registered teachers: {numProfsInscrits}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Number of teachers by specialty</Text>
        {renderPieChart(specialites, specialites)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cities in high demand</Text>
        {renderPieChart(villesDemandees, villesDemandees)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Number of teachers by rank</Text>
        {renderPieChart(numProfsParGrade, numProfsParGrade)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Number of teachers by specialty(Top 15)</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>specialty</Text>
            <Text style={styles.headerText}>Number</Text>
          </View>
          {specialites.slice(0, 15).sort((a, b) => b.value - a.value).map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.rowText, styles.specialiteText]}>{item.label}</Text>
              <Text style={styles.rowText}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cities in high demand (Top 15)</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>City</Text>
            <Text style={styles.headerText}>Number</Text>
          </View>
          {villesDemandees.slice(0, 15).sort((a, b) => b.value - a.value).map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.rowText, styles.specialiteText]}>{item.label}</Text>
              <Text style={styles.rowText}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Number of teachers by rank</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Rank</Text>
            <Text style={styles.headerText}>Number</Text>
          </View>
          {numProfsParGrade.slice(0, 15).sort((a, b) => b.value - a.value).map((item, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={[styles.rowText, styles.specialiteText]}>{item.label}</Text>
        <Text style={styles.rowText}>{item.value}</Text>
      </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  section: {
    fontSize: 18,
    marginBottom: 8,
  },
  pieChartContainer: {
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 14,
  },
  tableContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  rowText: {
    flex: 1,
  },
  specialiteText: {
    flex: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

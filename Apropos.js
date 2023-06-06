import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function Apropos() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Platform for University Faculty Swapping</Text>
      <Text style={styles.paragraph}>
      This platform is simply a space for university professors to search for a partner for a faculty exchange. 
      It is limited to this functionality. Teachers can search for partners interested in an exchange at other higher education institutions. 
      The system facilitates the search and matching between teachers who have a mutual willingness to exchange.
      </Text>
      <Text style={styles.paragraph}>
      The platform provides a user-friendly and secure interface for teachers to communicate and exchange necessary information. 
      Members can create personal profiles and provide details about their specialties, institutions, and contact information. 
      Teachers can browse through potential partner profiles and reach out to them to discuss the details of the exchange agreement.
      </Text>
      <Text style={styles.paragraph}>
      By using this platform, teachers can streamline their search for exchange partners, saving time and effort by avoiding individual communications and continuous searches for exchange opportunities. 
      This system is efficient and beneficial for teachers looking to change institutions or work in a new establishment to broaden their academic experience.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
  },
});

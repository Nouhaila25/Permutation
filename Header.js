import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Header = () => {
  

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.header, { width: screenWidth }]}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>ProfSwap - أساتذة التعليم العالي</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Header;

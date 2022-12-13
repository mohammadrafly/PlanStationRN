import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Tombol(props) {
  const { onPress, title = 'Save' } = props;
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 15,
    elevation: 3,
    padding: 8,
    backgroundColor: '#5E548E',
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
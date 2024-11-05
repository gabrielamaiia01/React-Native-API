import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

const App = () => {
  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDogImage = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error("Erro ao buscar a imagem", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dog</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#F2A71B" />
      ) : (
        dogImage && <Image source={{ uri: dogImage }} style={styles.image} />
      )}
      <TouchableOpacity style={styles.button} onPress={fetchDogImage}>
        <Text style={styles.buttonText}>Ver outro cachorro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 30,
  },
  image: {
    width: 280,
    height: 280,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#F2A71B',
  },
  button: {
    backgroundColor: '#F2A71B',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;

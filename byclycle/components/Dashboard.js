// src/components/Welcome.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';

const Welcome = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const renderDonut = ({ item }) => (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Detail', { product: item })}>
      <View style={styles.donutCard}>
        <Image source={{ uri: item.image }} style={styles.donutImage} />
        <View style={styles.donutDetails}>
          <Text style={styles.donutName}>{item.name}</Text>
          <Text style={styles.donutPrice}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>The world's best Bike</Text>
      </View>

      {productStatus === 'loading' && <Text>Loading...</Text>}
      {productStatus === 'failed' && <Text>Error: {error}</Text>}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderDonut}
        contentContainerStyle={styles.donutList}
        scrollEna
        
        bled={true}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 16 },
  header: { marginBottom: 16 },
  welcomeText: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  choiceText: { fontSize: 16, marginBottom: 8 },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },

  categoryContainer: { flexDirection: 'row', marginBottom: 16 },
  categoryButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activeCategory: { backgroundColor: '#FFC107' },
  categoryText: { fontSize: 14, fontWeight: '600' },

  donutList: { paddingBottom: 16, flex:1, alignItems:"center", minWidth:"100%" },
  donutCard: {
    width:"200px",
    minWidth:"95%",
    maxWidth:"100%",
    flexDirection: 'column',
    backgroundColor: '#fdfdfd',
    justifyContent:"space-evenly",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    marginLeft:0,
    marginHorizontal:4,
    cursor: "pointer"
  },
  donutImage: { width: "100%", height: 150, marginRight: 16, borderRadius: 8 },
  donutDetails: { flex: 1 },
  donutName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  donutDesc: { fontSize: 14, color: '#666', marginBottom: 4 },
  donutPrice: { fontSize: 16, fontWeight: 'bold', color: '#000' },

  addButton: {
    backgroundColor: '#FFC107',
    // borderRadius: "20px 0px 20px 0px",
    borderTopLeftRadius: 40, // bo góc bên trái trên cùng
    padding: '5px 10px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { fontSize: 20, color: '#fff' },
});



export default Welcome;

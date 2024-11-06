// src/components/Welcome.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../redux/productSlice';

const Welcome = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleSave = () => {
    if (selectedProduct) {
      dispatch(updateProduct({ id: selectedProduct.id, name, price, image }));
    } else {
      dispatch(addProduct({ name, price, image }));
    }
    closeModal();
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setName(product?.name || '');
    setPrice(product?.price || '');
    setImage(product?.image || '');
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setName('');
    setPrice('');
    setImage('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Product Management</Text>

      {productStatus === 'loading' && <Text>Loading...</Text>}
      {productStatus === 'failed' && <Text>Error: {error}</Text>}

      <Button title="Add Product" onPress={() => openModal(null)} />
      
<FlatList
  data={products}
  numColumns={2}
  keyExtractor={(item) => item.id}
  contentContainerStyle={styles.flatList}
  renderItem={({ item }) => (
    <TouchableOpacity style={{width:"48%"}} onPress={() => openModal(item)}>
      <View style={styles.donutCard}>
        <Image source={{ uri: item.image }} style={styles.donutImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.priceText}>${item.price}</Text>
        <Button title="Delete" onPress={() => handleDelete(item.id)} />
      </View>
    </TouchableOpacity>
  )}
/>


      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Image source={{uri:image}} style={{width:"100%", height:300}}/>
          <TextInput placeholder="Name" value={name} onChangeText={setName} />
          <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
          <TextInput placeholder="Image URL" value={image} onChangeText={setImage} />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
  welcomeText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  donutCard: { 
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, 
  },
  donutImage: { 
    width: 120, 
    height: 120, 
    borderRadius: 10, 
    marginBottom: 8 
  },
  modalContent: { 
    padding: 16, 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#fff' 
  },
  flatList: { 
    flex: 1 ,
    justifyContent:"space-between"
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
    marginVertical: 4
  }
});


export default Welcome;

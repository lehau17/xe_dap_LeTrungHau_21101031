import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../redux/productSlice';

const Admin = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [des, setDes] = useState('');

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleSave = () => {
    if (selectedProduct) {
      dispatch(updateProduct({ id: selectedProduct.id, name, price, image, description: des }));
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
    setDes(product?.description || '');
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
    <TouchableOpacity style={{position:"absolute", padding:15, backgroundColor :"red", borderRadius:100, right:0, }} onPress={()=>{
      navigation.navigate("Home")
    }}>Home</TouchableOpacity>
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
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}
  >
    <View
      style={{
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 10,
          marginBottom: 16,
        }}
      />
      
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
          fontSize: 16,
          color: '#333',
        }}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
          fontSize: 16,
          color: '#333',
        }}
      />

      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
          fontSize: 16,
          color: '#333',
        }}
      />

      <TextInput
        placeholder="Description"
        value={des}
        onChangeText={setDes}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
          fontSize: 16,
          color: '#333',
        }}
      />

      <Button title="Save" onPress={handleSave} color="#4CAF50" />
      <View style={{ height: 10 }} />
      <Button title="Cancel" onPress={closeModal} color="#FF5252" />
    </View>
  </View>
</Modal>

    </View>
  );
};
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f0f4f8' 
  },
  welcomeText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center', 
    color: '#333'
  },
  donutCard: { 
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  donutImage: { 
    width: 110, 
    height: 110, 
    borderRadius: 8, 
    marginBottom: 8,
    resizeMode: 'cover'
  },
  modalContent: { 
    padding: 16, 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#ffffff',
    borderRadius: 15,
  },
  flatList: { 
    flex: 1,
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginVertical: 4
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
    marginVertical: 4
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold'
  }
});


export default Admin;

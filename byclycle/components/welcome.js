import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';

export default function Welcome({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#f0f4f8',
      }}>
      <Text style={{textAlign:"center", fontWeight:800, fontSize:18}}>A premium online store for sporter and their stylish choice</Text>
      <Image
        source={{ uri: 'https://picsum.photos/271/271' }}
        style={{
          width: 271,
          height: 271,
          marginBottom: 20,
          borderRadius: 15, // Bo tròn nhiều hơn để trông hiện đại hơn
          borderWidth: 2, // Thêm viền ảnh
          borderColor: '#ccc'
        }}
      />
     <Text style={{textAlign:"center", fontWeight:800, fontSize:18}}>POWER BIKE SHOP</Text>
      <TouchableOpacity style={{backgroundColor:"red", width:"100%", paddingVertical: 10, borderRadius:40}} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={{color: "#ccc", textAlign:"center", fontWeight:800}}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
}

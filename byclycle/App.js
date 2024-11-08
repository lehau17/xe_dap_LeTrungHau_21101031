import * as React from 'react';
import Welcome from './components/welcome';
// import DetailsScreen from './components/Detail';
import Dashboard from "./components/Dashboard"
import ProductDetail from "./components/ProductDetail"
import Admin from "./components/AdminProductScreen"
import {Provider} from "react-redux"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { store } from './redux/store';
const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Admin">
        <Stack.Screen name="Home" component={Welcome} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Detail" component={ProductDetail} />
        <Stack.Screen name="Admin" component={Admin} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;

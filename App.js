// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import Header from "./component/home/Header";
import Slider from "./component/home/Slider";
import Content from "./component/home/Content";
import ProductDetail from "./component/productdetail/ProductDetail";
import ProductCart from "./component/cart/ProductCart";
import Footer from "./component/home/Footer";
import Menu from "./component/home/Menu";
import CategoryIcon from "./component/home/CategoryIcon";
import Login from "./component/login/Login";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TIỆM NHÀ THỶ THỶ">
        <Stack.Screen name="TIỆM NHÀ THỶ THỶ" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="ProductCart" component={ProductCart} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitleStyle: { color: "red" },
          }}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = () => (
  <View style={styles.container}>
    <Header />
    {/* <Menu /> */}
    {/* <CategoryIcon/> */}
    <Slider />
    <Content />
    <Footer />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start", // Duy trì sự sắp xếp từ trên xuống
  },
});

export default App;

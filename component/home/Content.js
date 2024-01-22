import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductListDynamic = () => {
  const navigation = useNavigation();
  const [visibleSpringItemCount, setVisibleSpringItemCount] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const categoryData = await response.json();
        setCategories(["all", ...categoryData]);

        const productResponse = await fetch(
          "https://fakestoreapi.com/products"
        );
        const productData = await productResponse.json();
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure it runs only once on mount

  useEffect(() => {
    const apiUrl = selectedCategory
      ? `https://fakestoreapi.com/products/category/${selectedCategory}`
      : "https://fakestoreapi.com/products";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedCategory]);

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetail", { product });
  };

  const addToCart = (addcart) => {
    navigation.navigate("ProductCart", { addcart });
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category === "all" ? null : category);
  };

  const renderCategoryButtons = () => {
    return categories.map((category) => (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryButton,
          category === selectedCategory && styles.selectedCategoryButton,
        ]}
        onPress={() => handleCategoryPress(category)}>
        <Text>{category}</Text>
      </TouchableOpacity>
    ));
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <View style={styles.productItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.productName} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>{`$${item.price}`}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => addToCart(item)}>
          <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm sản phẩm"
        onChangeText={(text) => setSearchQuery(text)}
      />
      <View style={styles.categoryContainer}>{renderCategoryButtons()}</View>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 180,
    width: 180,
    zIndex: 1,
    // Tăng giá trị để làm cho khung lớn hơn
  },
  image: {
    width: "50%",
    height: "50%",
    borderRadius: 5,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    color: "green",
  },
  addToCartButton: {
    backgroundColor: "pink",
    padding: 5,
    borderRadius: 3,
    marginTop: 5,
  },
  addToCartButtonText: {
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "black",
    backgroundColor: "oldlace",
    zIndex: 2,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 20,
    overflow: "hidden",
  },
  selectedCategoryButton: {
    backgroundColor: "blue",
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default ProductListDynamic;

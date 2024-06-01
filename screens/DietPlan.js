import * as React from "react";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Button, StyleSheet, FlatList, Image } from "react-native";
import { Video } from "expo-av";

import DietCart from "@/components/DietCard";
import { ScrollView } from "react-native-gesture-handler";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const cards = [
    {
      title: "Breakfast",
      // imageSource: require('./assets/breakfast.jpg'), // Replace with your image path
      description: "Start your day with a healthy breakfast.",
      target: "Breakfast",
    },
    {
      title: "Lunch",
      // imageSource: require('./assets/lunch.jpg'), // Replace with your image path
      description: "Enjoy a delicious lunch.",
      target: "Lunch",
    },
    {
      title: "Snacks",
      // imageSource: require('./assets/snacks.jpg'), // Replace with your image path
      description: "Grab a quick snack.",
      target: "Snacks",
    },
    {
      title: "Dinner",
      // imageSource: require('./assets/dinner.jpg'), // Replace with your image path
      description: "End your day with a satisfying dinner.",
      target: "Dinner",
    },
  ];

  return (
    <ScrollView style={styles.scrollCard}>
      {cards.map((card, index) => (
        <DietCart
          key={index}
          title={card.title}
          // imageSource={card.imageSource}
          description={card.description}
          onPress={() => navigation.navigate(card.target)}
        />
      ))}
    </ScrollView>
  );
};

const MealScreen = ({ route }) => {
  const { category } = route.params;
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals(category);
  }, []);

  const fetchMeals = (category) => {
    const mealData = {
      Breakfast: [
        {
          name: "Oatmeal with Fruits and Nuts",
          description:
            "A healthy bowl of oatmeal topped with fresh fruits and nuts.",
          image: "https://example.com/oatmeal.jpg",
          video: "https://example.com/oatmeal.mp4",
        },
        {
          name: "Greek Yogurt Parfait",
          description: "Greek yogurt layered with granola and fresh berries.",
          image: "https://example.com/yogurt.jpg",
          video: "https://example.com/yogurt.mp4",
        },
      ],
      Lunch: [
        {
          name: "Grilled Chicken Salad",
          description:
            "A nutritious salad with grilled chicken and fresh veggies.",
          image: "https://example.com/chicken_salad.jpg",
          video: "https://example.com/chicken_salad.mp4",
        },
        {
          name: "Quinoa and Vegetable Bowl",
          description: "A hearty bowl of quinoa mixed with roasted vegetables.",
          image: "https://example.com/quinoa_bowl.jpg",
          video: "https://example.com/quinoa_bowl.mp4",
        },
      ],
      Snacks: [
        {
          name: "Hummus and Veggie Sticks",
          description: "Fresh veggie sticks served with hummus.",
          image: "https://example.com/hummus.jpg",
          video: "https://example.com/hummus.mp4",
        },
        {
          name: "Apple Slices with Almond Butter",
          description: "Crisp apple slices paired with creamy almond butter.",
          image: "https://example.com/apple_almond.jpg",
          video: "https://example.com/apple_almond.mp4",
        },
        {
          name: "Trail Mix",
          description: "A mix of nuts, dried fruits, and dark chocolate.",
          image: "https://example.com/trail_mix.jpg",
          video: "https://example.com/trail_mix.mp4",
        },
      ],
      Dinner: [
        {
          name: "Baked Salmon with Asparagus",
          description: "Tender baked salmon served with steamed asparagus.",
          image: "https://example.com/salmon.jpg",
          video: "https://example.com/salmon.mp4",
        },
        {
          name: "Vegetable Stir-Fry with Tofu",
          description: "A colorful vegetable stir-fry with tofu.",
          image: "https://example.com/stir_fry.jpg",
          video: "https://example.com/stir_fry.mp4",
        },
      ],
    };
    setMeals(mealData[category]);
  };

  const renderMealItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      {/* <Video
        source={{ uri: data.video }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        useNativeControls
        style={styles.itemVideo}
      /> */}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{category}</Text> */}
      <FlatList
        data={meals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default function DietPlan() {
  return (
    <Stack.Navigator
      initialRouteName="Diet Plan"
      screenOptions={{
        headerTitleAlign: "center",
        headerShown: false,
        headerStyle: {
          // backgroundColor: "#051810",
          borderRadius: 10,
          // height:70,
        },
        headerTintColor: "#051810",
      }}
    >
      <Stack.Screen name="Diet Plan" component={HomeScreen} />
      <Stack.Screen
        name="Breakfast"
        component={MealScreen}
        initialParams={{ category: "Breakfast" }}
      />
      <Stack.Screen
        name="Lunch"
        component={MealScreen}
        initialParams={{ category: "Lunch" }}
      />
      <Stack.Screen
        name="Snacks"
        component={MealScreen}
        initialParams={{ category: "Snacks" }}
      />
      <Stack.Screen
        name="Dinner"
        component={MealScreen}
        initialParams={{ category: "Dinner" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fff",
    padding: 16,
  },

  scrollCard: {
    padding: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  item: {
    // backgroundColor: "#f9c2ff",
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginVertical: 8,
    width: "100%",
  },
  itemTitle: {
    // color:"#F5F5F5",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    // color:"#F5F5F5",
    fontSize: 16,
    marginVertical: 8,
  },
  itemImage: {
    width: 200,
    height: 150,
    marginBottom: 8,
  },
  itemVideo: {
    width: 300,
    height: 200,
  },
});

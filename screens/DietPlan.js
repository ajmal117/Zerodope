// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// import {
//   Card,
//   Title,
//   Paragraph,
//   Divider,
//   Button,
//   Chip,
// } from "react-native-paper";

// const NutritionCard = ({ title, imageSource, data }) => {
//   return (
//     <Card style={styles.card}>
//       <View style={styles.cardRow}>
//         <Card.Cover source={imageSource} style={styles.cardCover} />
//         <Card.Content style={styles.cardContent}>
//           <Title style={styles.cardTitle}>{title}</Title>
//           <Paragraph style={styles.cardData}>
//             {data.gm} | {data.kcal} Kcal
//           </Paragraph>
//           <View style={styles.cardNutrients}>
//             <Chip style={styles.cardNutrientChip}>
//               <Text style={styles.cardNutrientText}>P: {data.p}g</Text>
//             </Chip>
//             <Chip style={styles.cardNutrientChip}>
//               <Text style={styles.cardNutrientText}>C: {data.c}g</Text>
//             </Chip>
//             <Chip style={styles.cardNutrientChip}>
//               <Text style={styles.cardNutrientText}>F: {data.f}g</Text>
//             </Chip>
//           </View>
//         </Card.Content>
//       </View>
//     </Card>
//   );
// };

// const DietPlan = () => {
//   const breakfastData = [
//     {
//       title: "Milk",
//       imageSource: require("../assets/images/dosa.webp"),
//       data: { gm: "150 ml", kcal: "78.2", p: "0.5", c: "12.5", f: "7.1" },
//     },
//     {
//       title: "Dosa",
//       imageSource: require("../assets/images/dosa.webp"),
//       data: { gm: "75 gm", kcal: "105.8", p: "2.8", c: "22.4", f: "0.6" },
//     },
//     {
//       title: "Scrambled eggs",
//       imageSource: require("../assets/images/dosa.webp"),
//       data: { gm: "2.0 large eggs", kcal: "176", p: "12", c: "2", f: "13.4" },
//     },
//   ];
//   const lunchData = [
//     {
//       title: "Jeera rice",
//       imageSource: require("../assets/images/dosa.webp"),
//       data: { gm: "100 gm", kcal: "79", p: "0.8", c: "12.8", f: "2.8" },
//     },
//     {
//       title: "Dal tadka",
//       imageSource: require("../assets/images/dosa.webp"),
//       data: { gm: "100 gm", kcal: "94", p: "5", c: "14", f: "2" },
//     },
//     {
//       title: "Paneer jalfrezi",
//       imageSource: require("../assets/images/dosa.webp"),
//       data: { gm: "150 gm", kcal: "201", p: "7.4", c: "9.1", f: "15" },
//     },
//   ];

//   const [data, setData] = useState("");

//   const getToken = async () => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       // const token = await AsyncStorage.getItem("token");
//       return token;
//     } catch (error) {
//       console.error("Error retrieving token:", error);
//     }
//   };

//   useEffect(() => {
//     const getData = async () => {
//       const token = await getToken();
//       console.log("Token:", token);
//       try {
//         const response = await axios.get(
//           "https://beta.zerodope.in/api/diet-plans?filters[users_permissions_users].[id].[$eq]=1&populate=*",
//           {
//             headers: {
//               accept: "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const responseData = response.data;
//         console.log(
//           "Complete Response Data:",
//           JSON.stringify(responseData, null, 2)
//         );

//         // Access the nested data
//         if (responseData.data && responseData.data.length > 0) {
//           const fetchedData = responseData.data.map((item) => {
//             const { id, attributes } = item;
//             return { id, attributes };
//           });
//           console.log("Fetched Data:", JSON.stringify(fetchedData, null, 2));
//         } else {
//           console.log("No data found");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     getData();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Routine for : 1 week</Text>
//       <View style={styles.section}>
//         <View style={styles.sectionItem}>
//           <Text style={styles.sectionTitle}>Breakfast (360 Kcal)</Text>
//         </View>
//         {breakfastData.map((item, index) => (
//           <NutritionCard
//             key={index}
//             title={item.title}
//             imageSource={item.imageSource}
//             data={item.data}
//           />
//         ))}
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionItem}>
//           <Text style={styles.sectionTitle}>Lunch (374 Kcal)</Text>
//         </View>
//         {lunchData.map((item, index) => (
//           <NutritionCard
//             key={index}
//             title={item.title}
//             imageSource={item.imageSource}
//             data={item.data}
//           />
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionItem: {
//     borderBottomWidth: 1, // Add bottom border
//     borderColor: "blue",
//     marginBottom: 10,
//     // elevation: 1, // Add elevation for shadow effect
//     // shadowOffset: { width: 0, height: 1 }, // Shadow offset
//     // shadowOpacity: 0.1, // Shadow opacity
//     // shadowRadius: 1,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   card: {
//     marginBottom: 12,
//   },
//   cardRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   cardContent: {
//     flex: 1,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   cardNutrients: {
//     flexDirection: "row",
//     // marginTop: 4,
//   },
//   cardNutrientText: {
//     fontSize: 12,
//   },
//   cardCover: {
//     paddingLeft: 4,
//     height: 85,
//     width: 90,
//     resizeMode: "cover",
//   },

//   cardData: {
//     fontSize: 14,
//     marginBottom: 6,
//   },
//   cardNutrients: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   cardNutrientChip: {
//     marginHorizontal: 3,
//     marginVertical: 4,
//   },
//   cardNutrientText: {
//     fontSize: 12,
//   },
// });

// export default DietPlan;



import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { Card, Paragraph } from "react-native-paper";

const SubCard = ({ imageSource, data }) => (
  <Card style={styles.subCard}>
    <View style={styles.subCardRow}>
      <Card.Cover source={imageSource} style={styles.subCardCover} />
      <Card.Content style={styles.subCardContent}>
        <Paragraph style={styles.cardData}>{data}</Paragraph>
      </Card.Content>
    </View>
  </Card>
);

const NutritionCard = ({ data, tillDate }) => (
  <Card style={styles.card}>
    <Card.Content style={styles.cardContent}>
      <Paragraph style={styles.cardDate}>Till Date: {tillDate}</Paragraph>
      {data.map((item, index) => (
        <SubCard
          key={index}
          imageSource={require("../assets/images/dosa.webp")}
          data={item}
        />
      ))}
    </Card.Content>
  </Card>
);

const DietPlan = () => {
  const [dietData, setDietData] = useState({
    breakFast: { WriteDiet: [], TillDate: "" },
    lunch: { WriteDiet: [], TillDate: "" },
    snacks: { WriteDiet: [], TillDate: "" },
    dinner: { WriteDiet: [], TillDate: "" },
  });

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      // const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const token = await getToken();
      console.log("Token:", token);
      try {
        const response = await axios.get(
          "https://beta.zerodope.in/api/diet-plans?filters[users_permissions_users].[id].[$eq]=1&populate=*",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = response.data;
        console.log(
          "Complete Response Data:",
          JSON.stringify(responseData, null, 2)
        );

        // Access the nested data
        if (responseData.data && responseData.data.length > 0) {
          const fetchedData = responseData.data[0].attributes;
          setDietData({
            breakFast: {
              WriteDiet: fetchedData.breakFast.WriteDiet.split("\n"),
              TillDate: fetchedData.breakFast.TillDate,
            },
            lunch: {
              WriteDiet: fetchedData.lunch.WriteDiet.split("\n"),
              TillDate: fetchedData.lunch.TillDate,
            },
            snacks: {
              WriteDiet: fetchedData.snacks.WriteDiet.split("\n"),
              TillDate: fetchedData.snacks.TillDate,
            },
            dinner: {
              WriteDiet: fetchedData.dinner.WriteDiet.split("\n"),
              TillDate: fetchedData.dinner.TillDate,
            },
          });
          console.log("Fetched Data:", JSON.stringify(fetchedData, null, 2));
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>Breakfast</Text>
        </View>
        <NutritionCard
          data={dietData.breakFast.WriteDiet}
          tillDate={dietData.breakFast.TillDate}
        />
      </View>
      <View style={styles.section}>
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>Lunch</Text>
        </View>
        <NutritionCard
          data={dietData.lunch.WriteDiet}
          tillDate={dietData.lunch.TillDate}
        />
      </View>
      <View style={styles.section}>
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>Snacks</Text>
        </View>
        <NutritionCard
          data={dietData.snacks.WriteDiet}
          tillDate={dietData.snacks.TillDate}
        />
      </View>
      <View style={styles.section}>
        <View style={styles.sectionItem}>
          <Text style={styles.sectionTitle}>Dinner</Text>
        </View>
        <NutritionCard
          data={dietData.dinner.WriteDiet}
          tillDate={dietData.dinner.TillDate}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionItem: {
    borderBottomWidth: 1,
    borderColor: "blue",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  card: {
    marginBottom: 6,
  },
  cardContent: {
    paddingHorizontal: 10, // Reduced horizontal padding
    paddingVertical: 7,    // Reduced vertical padding
  },
  cardDate: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 8,
  },
  subCard: {
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  subCardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  subCardContent: {
    flex: 1,
    paddingLeft: 10,
  },
  subCardCover: {
    height: 60,
    width: 60,
    resizeMode: "cover",
  },
  cardData: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
});

export default DietPlan;

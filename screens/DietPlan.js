// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Text, ScrollView } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// import { Card, Paragraph } from "react-native-paper";

// const SubCard = ({ imageSource, data }) => (
//   <Card style={styles.subCard}>
//     <View style={styles.subCardRow}>
//       <Card.Cover source={imageSource} style={styles.subCardCover} />
//       <Card.Content style={styles.subCardContent}>
//         <Paragraph style={styles.cardData}>{data}</Paragraph>
//       </Card.Content>
//     </View>
//   </Card>
// );

// const NutritionCard = ({ data, tillDate }) => (
//   <Card style={styles.card}>
//     <Card.Content style={styles.cardContent}>
//       <Paragraph style={styles.cardDate}>Till Date: {tillDate}</Paragraph>
//       {data.map((item, index) => (
//         <SubCard
//           key={index}
//           imageSource={require("../assets/images/dosa.webp")}
//           data={item}
//         />
//       ))}
//     </Card.Content>
//   </Card>
// );

// const DietPlan = () => {
//   const [dietData, setDietData] = useState({
//     breakFast: { WriteDiet: [], TillDate: "" },
//     lunch: { WriteDiet: [], TillDate: "" },
//     snacks: { WriteDiet: [], TillDate: "" },
//     dinner: { WriteDiet: [], TillDate: "" },
//   });

//   const [userId, setUserId] = useState("");

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
//           const fetchedData = responseData.data[0].attributes;
//           setDietData({
//             breakFast: {
//               WriteDiet: fetchedData.breakFast.WriteDiet.split("\n"),
//               TillDate: fetchedData.breakFast.TillDate,
//             },
//             lunch: {
//               WriteDiet: fetchedData.lunch.WriteDiet.split("\n"),
//               TillDate: fetchedData.lunch.TillDate,
//             },
//             snacks: {
//               WriteDiet: fetchedData.snacks.WriteDiet.split("\n"),
//               TillDate: fetchedData.snacks.TillDate,
//             },
//             dinner: {
//               WriteDiet: fetchedData.dinner.WriteDiet.split("\n"),
//               TillDate: fetchedData.dinner.TillDate,
//             },
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
//       <View style={styles.section}>
//         <View style={styles.sectionItem}>
//           <Text style={styles.sectionTitle}>Breakfast</Text>
//         </View>
//         <NutritionCard
//           data={dietData.breakFast.WriteDiet}
//           tillDate={dietData.breakFast.TillDate}
//         />
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionItem}>
//           <Text style={styles.sectionTitle}>Lunch</Text>
//         </View>
//         <NutritionCard
//           data={dietData.lunch.WriteDiet}
//           tillDate={dietData.lunch.TillDate}
//         />
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionItem}>
//           <Text style={styles.sectionTitle}>Snacks</Text>
//         </View>
//         <NutritionCard
//           data={dietData.snacks.WriteDiet}
//           tillDate={dietData.snacks.TillDate}
//         />
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionItem}>
//           <Text style={styles.sectionTitle}>Dinner</Text>
//         </View>
//         <NutritionCard
//           data={dietData.dinner.WriteDiet}
//           tillDate={dietData.dinner.TillDate}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#fff",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   section: {
//     marginBottom: 12,
//   },
//   sectionItem: {
//     borderBottomWidth: 1,
//     borderColor: "blue",
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "semibold",
//     marginBottom: 4,
//   },
//   card: {
//     marginBottom: 6,
//   },
//   cardContent: {
//     paddingHorizontal: 10, // Reduced horizontal padding
//     paddingVertical: 7, // Reduced vertical padding
//   },
//   cardDate: {
//     fontSize: 14,
//     fontStyle: "italic",
//     marginBottom: 6,
//   },
//   subCard: {
//     marginBottom: 8,
//     backgroundColor: "#f9f9f9",
//   },
//   subCardRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   subCardContent: {
//     flex: 1,
//     paddingLeft: 10,
//   },
//   subCardCover: {
//     height: 60,
//     width: 60,
//     resizeMode: "cover",
//   },
//   cardData: {
//     fontSize: 15,
//     fontWeight: "400",
//     color: "#333",
//   },
// });

// export default DietPlan;

//data with id

// import axios from "axios";
// import * as SecureStore from "expo-secure-store";
// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Text, ScrollView } from "react-native";
// import { Card, Paragraph, Button } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";

// const SubCard = ({ imageSource, data }) => (
//   <Card style={styles.subCard}>
//     <View style={styles.subCardRow}>
//       <Card.Cover source={imageSource} style={styles.subCardCover} />
//       <Card.Content style={styles.subCardContent}>
//         <Paragraph style={styles.cardData}>{data}</Paragraph>
//       </Card.Content>
//     </View>
//   </Card>
// );

// const NutritionCard = ({ data, tillDate }) => (
//   <Card style={styles.card}>
//     <Card.Content style={styles.cardContent}>
//       <Paragraph style={styles.cardDate}>Till Date: {tillDate}</Paragraph>
//       {data.map((item, index) => (
//         <SubCard
//           key={index}
//           imageSource={require("../assets/images/dosa.webp")}
//           data={item}
//         />
//       ))}
//     </Card.Content>
//   </Card>
// );

// const DietPlan = () => {
//   const navigation = useNavigation();

//   const [dietData, setDietData] = useState({
//     breakFast: { WriteDiet: [], TillDate: "" },
//     lunch: { WriteDiet: [], TillDate: "" },
//     snacks: { WriteDiet: [], TillDate: "" },
//     dinner: { WriteDiet: [], TillDate: "" },
//   });

//   const [noData, setNoData] = useState(false); // State to handle no data status

//   const getToken = async () => {
//     try {
//       const token = await SecureStore.getItemAsync("token");
//       return token;
//     } catch (error) {
//       console.error("Error retrieving token:", error);
//     }
//   };

//   const getId = async () => {
//     try {
//       const id = await SecureStore.getItemAsync("userid");
//       return id;
//     } catch (error) {
//       console.error("Error retrieving user ID:", error);
//     }
//   };

//   useEffect(() => {
//     const getData = async () => {
//       const token = await getToken();
//       const id = await getId();
//       console.log("Token:", token);

//       try {
//         const response = await axios.get(
//           `https://beta.zerodope.in/api/diet-plans?filters[users_permissions_users].[id].[$eq]=${id}&populate=*`,
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

//         if (responseData.data && responseData.data.length > 0) {
//           const fetchedData = responseData.data[0].attributes;
//           setDietData({
//             breakFast: {
//               WriteDiet: fetchedData.breakFast.WriteDiet.split("\n"),
//               TillDate: fetchedData.breakFast.TillDate,
//             },
//             lunch: {
//               WriteDiet: fetchedData.lunch.WriteDiet.split("\n"),
//               TillDate: fetchedData.lunch.TillDate,
//             },
//             snacks: {
//               WriteDiet: fetchedData.snacks.WriteDiet.split("\n"),
//               TillDate: fetchedData.snacks.TillDate,
//             },
//             dinner: {
//               WriteDiet: fetchedData.dinner.WriteDiet.split("\n"),
//               TillDate: fetchedData.dinner.TillDate,
//             },
//           });
//           setNoData(false);
//           console.log("Fetched Data:", JSON.stringify(fetchedData, null, 2));
//         } else {
//           console.log("No data found");
//           setNoData(true);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setNoData(true);
//       }
//     };

//     getData();
//   }, []);

//   if (noData) {
//     return (
//       <View style={styles.noDataContainer}>
//         <Text style={styles.noDataText}>
//           There is no Diet plan for you right now. Please contact your Diet
//           Planner.
//         </Text>
//         <Button mode="contained" onPress={() => navigation.navigate("BookNow")}>
//           BOOK NOW
//         </Button>
//       </View>
//     );
//   }
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.section}>
//         <View style={styles.sectionItem}>
//           <Text style={styles.sectionTitle}>Breakfast</Text>
//         </View>
//         <NutritionCard
//           data={dietData.breakFast.WriteDiet}
//           tillDate={dietData.breakFast.TillDate}
//         />
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionItem}>
//           <Text style={styles.sectionTitle}>Lunch</Text>
//         </View>
//         <NutritionCard
//           data={dietData.lunch.WriteDiet}
//           tillDate={dietData.lunch.TillDate}
//         />
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionItem}>
//           <Text style={styles.sectionTitle}>Snacks</Text>
//         </View>
//         <NutritionCard
//           data={dietData.snacks.WriteDiet}
//           tillDate={dietData.snacks.TillDate}
//         />
//       </View>
//       <View style={styles.section}>
//         <View style={styles.sectionItem}>
//           <Text style={styles.sectionTitle}>Dinner</Text>
//         </View>
//         <NutritionCard
//           data={dietData.dinner.WriteDiet}
//           tillDate={dietData.dinner.TillDate}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#fff",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   section: {
//     marginBottom: 12,
//   },
//   sectionItem: {
//     borderBottomWidth: 1,
//     borderColor: "blue",
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "semibold",
//     marginBottom: 4,
//   },
//   card: {
//     marginBottom: 6,
//   },
//   cardContent: {
//     paddingHorizontal: 10, // Reduced horizontal padding
//     paddingVertical: 7, // Reduced vertical padding
//   },
//   cardDate: {
//     fontSize: 14,
//     fontStyle: "italic",
//     marginBottom: 6,
//   },
//   subCard: {
//     marginBottom: 8,
//     backgroundColor: "#f9f9f9",
//   },
//   subCardRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   subCardContent: {
//     flex: 1,
//     paddingLeft: 10,
//   },
//   subCardCover: {
//     height: 60,
//     width: 60,
//     resizeMode: "cover",
//   },
//   cardData: {
//     fontSize: 15,
//     fontWeight: "400",
//     color: "#333",
//   },
//   noDataContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   noDataText: {
//     fontSize: 20,
//     textAlign: "center",
//     marginBottom: 20,
//   },
// });

// export default DietPlan;

// component after loader is added

import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Card, Paragraph, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

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
  const navigation = useNavigation();
  const [dietData, setDietData] = useState({
    breakFast: { WriteDiet: [], TillDate: "" },
    lunch: { WriteDiet: [], TillDate: "" },
    snacks: { WriteDiet: [], TillDate: "" },
    dinner: { WriteDiet: [], TillDate: "" },
  });

  const [loading, setLoading] = useState(true); // Loader state
  const [noData, setNoData] = useState(false); // No data state

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  const getId = async () => {
    try {
      const id = await SecureStore.getItemAsync("userid");
      return id;
    } catch (error) {
      console.error("Error retrieving user ID:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const token = await getToken();
      const id = await getId();
      console.log("Token:", token);

      try {
        const response = await axios.get(
          `${API_URL}/diet-plans?filters[users_permissions_users].[id].[$eq]=${id}&populate=*`,
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
          setNoData(false);
        } else {
          console.log("No data found");
          setNoData(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNoData(true);
      } finally {
        setLoading(false); // Stop the loader once data is fetched
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FAB917" />
        <Text>Loading diet plan...</Text>
      </View>
    );
  }

  if (noData) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>
          There is no Diet plan for you right now. Please contact your Diet
          Planner.
        </Text>
        <Button
          mode="contained"
          style={styles.bookNowButton}
          onPress={() => navigation.navigate("BookNow")}
        >
          BOOK NOW
        </Button>
      </View>
    );
  }

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
    marginBottom: 12,
  },
  sectionItem: {
    borderBottomWidth: 1,
    borderColor: "blue",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom: 4,
  },
  card: {
    marginBottom: 6,
  },
  cardContent: {
    paddingHorizontal: 10, // Reduced horizontal padding
    paddingVertical: 7, // Reduced vertical padding
  },
  cardDate: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 6,
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
    fontWeight: "400",
    color: "#333",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noDataText: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  bookNowButton: {
    backgroundColor: "#FAB917",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DietPlan;

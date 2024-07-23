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

//         // console.log(
//         //   response.data.attributes.users_permissions_users.data.attributes.email
//         // );

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
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
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
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [noDietPlan, setNoDietPlan] = useState(false);

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  const getUserId = async () => {
    try {
      const id = await SecureStore.getItemAsync("userid");
      return id;
    } catch (error) {
      console.error("Error retrieving userId:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const token = await getToken();
      const storedUserId = await getUserId();
      setUserId(storedUserId);
      console.log("Token:", token);
      console.log("Stored User ID:", storedUserId);

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

        if (responseData.data && responseData.data.length > 0) {
          const fetchedData = responseData.data[0].attributes;
          const fetchedUserId = responseData.data[0].id;

          if (storedUserId === fetchedUserId.toString()) {
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
          } else {
            setNoDietPlan(true);
          }
        } else {
          setNoDietPlan(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setNoDietPlan(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (noDietPlan) {
    return (
      <View style={styles.noDietContainer}>
        <Text>
          There is no diet plan for you right now. Please contact your Diet
          Planner.
        </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDietContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    paddingHorizontal: 10,
    paddingVertical: 7,
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
});

export default DietPlan;

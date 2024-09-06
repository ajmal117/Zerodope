// import React from "react";
// import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
// import { useRoute } from "@react-navigation/native";

// const BodyBuildData = () => {
//   const route = useRoute();
//   const { day, data } = route.params;

//   if (!data || !data.sets || data.sets.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.restMessage}>TAKE REST</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.scrollContainer}>
//         <View style={styles.workoutContainer}>
//           <Text style={styles.workoutsIncluded}>
//             <Text style={{ fontWeight: "bold", fontSize: 16 }}>
//               Workouts Included: {data.ExerciseName}
//             </Text>
//           </Text>
//           <ScrollView contentContainerStyle={styles.workoutList}>
//             {data.sets.map((exercise, index) => (
//               <View key={index} style={styles.workoutItem}>
//                 <Image
//                   source={require("../../assets/images/gymi.jpg")}
//                   style={styles.workoutImage}
//                   alt="image"
//                 />
//                 <View style={styles.workoutDetailsContainer}>
//                   <Text style={styles.workoutName}>{exercise.name}</Text>
//                   <Text style={styles.sectionHeading}>Target Muscles:</Text>
//                   <Text style={styles.targetMuscles}>
//                     {exercise.targetMuscles}
//                   </Text>
//                   <Text style={styles.sectionHeading}>How to Do:</Text>
//                   <Text style={styles.howToDo}>{exercise.howToDo}</Text>
//                 </View>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 10,
//     paddingVertical: 16,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   workoutContainer: {
//     flexGrow: 1,
//   },
//   workoutsIncluded: {
//     marginBottom: 25,
//     fontSize: 14,
//     fontFamily: "poppinsMedium",
//   },
//   workoutItem: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 5,
//   },
//   workoutDetailsContainer: {
//     flex: 1,
//   },
//   workoutDetails: {
//     fontSize: 14,
//     color: "#0366be",
//     flexWrap: "wrap",
//   },
//   sectionHeading: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginTop: 5,
//   },
//   targetMuscles: {
//     fontSize: 14,
//     paddingTop:2,
//     // color: "#FF5733",
//     marginBottom: 5,
//   },
//   howToDo: {
//     fontSize: 14,
//     color: "#0366be",
//   },
//   workoutList: {
//     flexGrow: 1,
//   },
//   workoutImage: {
//     width: 80,
//     height: 50,
//     marginRight: 15,
//     borderRadius: 5,
//   },
//   workoutName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "black",
//   },
//   restMessage: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 40,
//   },
// });

// export default BodyBuildData;

//updated comp

import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

const BodyBuildData = () => {
  const route = useRoute();
  const { day, data } = route.params;

  if (!data || !data.sets || data.sets.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.restMessage}>TAKE REST</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../assets/images/gymi.jpg")}
        style={styles.headerImage}
        alt="image"
      />
      <Text style={styles.workoutsIncluded}>
        Workouts Included:{" "}
        <Text style={styles.exerciseName}>{data.ExerciseName}</Text>
      </Text>
      <View style={styles.scrollContainer}>
        <View style={styles.workoutContainer}>
          {data.sets.map((exercise, index) => (
            <View key={index} style={styles.workoutItem}>
              <View style={styles.workoutDetailsContainer}>
                <Text style={styles.workoutName}>{exercise.name}</Text>
                <Text style={styles.sectionHeading}>Target Muscles:</Text>
                <Text style={styles.targetMuscles}>
                  {exercise.targetMuscles}
                </Text>
                <Text style={styles.sectionHeading}>How to Do:</Text>
                <Text style={styles.howToDo}>{exercise.howToDo}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  headerImage: {
    width: "100%",
    height: 150,
    marginBottom: 20,
    borderRadius: 5,
  },
  workoutsIncluded: {
    marginBottom: 22,
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  exerciseName: {
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  workoutContainer: {
    flexGrow: 1,
  },
  workoutItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  workoutDetailsContainer: {
    flex: 1,
  },
  workoutDetails: {
    fontSize: 14,
    color: "#0366be",
    flexWrap: "wrap",
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  targetMuscles: {
    fontSize: 14,
    paddingTop: 2,
    marginBottom: 5,
  },
  howToDo: {
    fontSize: 14,
    color: "#0366be",
  },
  workoutName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  restMessage: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
});

export default BodyBuildData;
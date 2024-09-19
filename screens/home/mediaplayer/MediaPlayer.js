// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { WebView } from "react-native-webview";
// import { Ionicons } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");

// const MediaPlayer = ({ route }) => {
//   const { video } = route.params; // Assuming video data is passed via route.params
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   // Function to extract video ID from YouTube URL
//   const getVideoID = (url) => {
//     const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|watch)(?:\/|%2F)?(?!\S))(?!\/)[^\/\n\s]*|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   const videoID = getVideoID(video.videoUrl);
//   const videoSource = videoID ? `https://www.youtube.com/embed/${videoID}?autoplay=${isPlaying ? 1 : 0}` : null;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>{video.heading}</Text>

//       {/* YouTube Video using WebView with iframe */}
//       {videoSource ? (
//         <WebView
//           style={styles.webview}
//           source={{ uri: videoSource }}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//           allowsInlineMediaPlayback={true}
//           onError={(error) => {
//             console.error("WebView error: ", error);
//             alert("There was an error loading the video.");
//           }}
//         />
//       ) : (
//         <Text style={styles.errorText}>Invalid video URL.</Text>
//       )}

//       <View style={styles.controls}>
//         <TouchableOpacity onPress={handlePlayPause}>
//           <Ionicons
//             name={isPlaying ? "pause" : "play"}
//             size={50}
//             color="white"
//           />
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.details}>Title: {video.title}</Text>
//       <Text style={styles.details}>Category: {video.category}</Text>
//       <Text style={styles.details}>Time: {video.time}</Text>
//     </View>
//   );
// };

// export default MediaPlayer;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   heading: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   webview: {
//     width: width * 0.9,
//     height: height * 0.4,
//     backgroundColor: "black",
//   },
//   controls: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     width: "60%",
//     marginTop: 20,
//   },
//   details: {
//     color: "#fff",
//     fontSize: 16,
//     marginTop: 10,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 16,
//     marginTop: 20,
//   },
// });


import { View, Text } from "react-native";
import React from "react";

const MediaPlayer = () => {
  return (
    <View>
      <Text>MediaPlayer</Text>
    </View>
  );
};

export default MediaPlayer;

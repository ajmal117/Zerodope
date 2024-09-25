// import React, { useState, useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
// } from "react-native";
// import YoutubePlayer from "react-native-youtube-iframe";
// import { Ionicons } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");

// const MediaPlayer = ({ route }) => {
//   const { video } = route.params; // Assuming video data is passed via route.params
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [videoID, setVideoID] = useState(null); // Moved videoID to state

//   // Updated function to extract video ID from YouTube URL
//   const getVideoID = (url) => {
//     const regex =
//       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:v|e(?:mbed)?|watch\?v=|shorts\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   useEffect(() => {
//     const id = getVideoID(video.videoUrl);
//     if (id) {
//       setVideoID(id);
//     } else {
//       Alert.alert("Error", "Invalid video URL.");
//     }
//   }, [video.videoUrl]);

//   const onStateChange = useCallback((state) => {
//     if (state === "ended") {
//       setIsPlaying(false);
//       Alert.alert("Video has finished playing!");
//     }
//   }, []);

//   const togglePlaying = useCallback(() => {
//     setIsPlaying((prev) => !prev);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>{video.heading}</Text>

//       {/* YouTube Video using YoutubePlayer with iframe */}
//       {videoID ? (
//         <YoutubePlayer
//           height={height * 0.4} // Ensure this height is sufficient
//           width={width * 0.9} // Ensure width is also sufficient
//           play={isPlaying}
//           videoId={videoID}
//           onChangeState={onStateChange}
//         />
//       ) : (
//         <Text style={styles.errorText}>Invalid video URL.</Text>
//       )}

//       <View style={styles.controls}>
//         <TouchableOpacity onPress={togglePlaying}>
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
//     textAlign: "center", // Center the heading
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

//---------full view video specification comps

// import React, { useState, useCallback, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
// } from "react-native";
// import YoutubePlayer from "react-native-youtube-iframe";
// import { Ionicons } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");

// const MediaPlayer = ({ route }) => {
//   const { video } = route.params; // Assuming video data is passed via route.params
//   const [isPlaying, setIsPlaying] = useState(true); // Start playing automatically
//   const [videoID, setVideoID] = useState(null);
//   const [isFullScreen, setIsFullScreen] = useState(true); // Default to full-screen

//   // Extract video ID from YouTube URL
//   const getVideoID = (url) => {
//     const regex =
//       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:v|e(?:mbed)?|watch\?v=|shorts\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   useEffect(() => {
//     const id = getVideoID(video.videoUrl);
//     if (id) {
//       setVideoID(id);
//     } else {
//       Alert.alert("Error", "Invalid video URL.");
//     }
//   }, [video.videoUrl]);

//   const onStateChange = useCallback((state) => {
//     if (state === "ended") {
//       setIsPlaying(false);
//       Alert.alert("Video has finished playing!");
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>{video.heading}</Text>

//       {/* YouTube Video using YoutubePlayer with iframe */}
//       {videoID ? (
//         <YoutubePlayer
//           height={height * 0.4} // Ensure this height is sufficient
//           width={width * 0.9}
//           play={isPlaying}
//           videoId={videoID}
//           onChangeState={onStateChange}
//           forceAndroidAutoplay // Ensure autoplay on Android
//           initialPlayerParams={{
//             modestbranding: true, // No YouTube logo
//             controls: 1, // Show controls
//             fs: 1, // Enable full-screen
//           }}
//           onFullScreenChange={(fullscreen) => setIsFullScreen(fullscreen)}
//           fullscreen={isFullScreen} // Force full-screen mode
//         />
//       ) : (
//         <Text style={styles.errorText}>Invalid video URL.</Text>
//       )}

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
//     textAlign: "center", // Center the heading
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

// refrence component ---

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

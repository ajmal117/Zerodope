// import { Video } from "expo-av";
// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Animated,
//   TouchableOpacity,
//   Dimensions,
//   ActivityIndicator,
// } from "react-native";

// const { width } = Dimensions.get("window");

// const VideoCard = ({ video }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [videoLoaded, setVideoLoaded] = useState(false);

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <View style={[styles.videoCard]}>
//       {!videoLoaded && (
//         <View style={styles.loadingContainer}>
//           {/* <ActivityIndicator size="large" color="#0000ff" /> */}
//         </View>
//       )}
//       <Video
//         source={video.uri}
//         style={styles.video}
//         resizeMode="cover"
//         isLooping
//         shouldPlay={isPlaying}
//         onLoad={() => setVideoLoaded(true)}
//       />
//       <View style={styles.videoOverlay}>
//         <Text style={styles.videoTitle}>{video.title}</Text>
//         <TouchableOpacity
//           onPress={handlePlayPause}
//           style={styles.playPauseButton}
//         >
//           <Text style={styles.playPauseIcon}>{isPlaying ? "❚❚" : "▶"}</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.videoBottomTitle}>
//         {/* <View style={styles.videoBottomTitleIconContainer}> */}
//         <View style={{ paddingBottom: 4 }}>
//           <Text style={styles.bottomTitleFirst}>Two hour bulking training</Text>
//         </View>
//         <View style={styles.bottomTitle}>
//           <View style={styles.bottomTitle}>
//             <Text style={styles.videoBottomTitleSubicon}>{video.icon}</Text>
//             <Text style={styles.videoBottomTitleSubText}>Beginner</Text>
//           </View>
//           <Text style={styles.videoBottomTitleSubTextMnt}> • 42 Min</Text>
//         </View>
//         {/* </View> */}
//       </View>
//     </View>
//   );
// };

// export default VideoCard;

// const styles = StyleSheet.create({
//   videoCard: {
//     width: width * 0.88,
//     height: 240,
//     borderRadius: 15,
//     overflow: "hidden",
//     marginRight: 10,
//     // backgroundColor:'white',
//     // borderBottomWidth: 3,
//     paddingLeft: 7,
//     paddingBottom: 10,
//     // Adjusted shadow properties
//     shadowColor: "#FAB917",
//     shadowOffset: { width: -5, height: 5 }, // Shadow evenly around the card
//     shadowOpacity: 0.4, // Reduce opacity for a softer shadow
//     shadowRadius: 15, // Increase radius for a smoother shadow
//     elevation: 8, // Slightly increase elevation for a more pronounced shadow on Android
//   },
//   video: {
//     width: "100%",
//     height: "80%",
//     borderRadius: 15,
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   videoOverlay: {
//     position: "absolute",
//     bottom: 62,
//     left: 14,
//     right: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   videoTitle: {
//     borderRadius: 15,
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   playPauseButton: {
//     backgroundColor: "#FDEEC7",
//     borderRadius: 50,
//     padding: 6,
//   },
//   playPauseIcon: {
//     fontSize: 15,
//   },
//   videoBottomTitle: {
//     marginTop: 2,
//     // borderRadius: 15,
//     borderEndEndRadius: 15,
//     borderEndStartRadius: 15,
//     bottom: 0,
//     width: "100%",
//     paddingHorizontal: 14,
//     paddingTop: 5,
//     backgroundColor: "white",
//     // borderTopWidth: 1,
//     // borderTopColor: "white",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },
//   videoBottomTitleText: {
//     fontSize: 14,
//     color: "#333",
//     fontWeight: "600",
//   },
//   bottomTitleFirst: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   bottomTitle: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   videoBottomTitleSubicon: {
//     paddingRight: 5,
//   },
//   videoBottomTitleSubText: {
//     paddingBottom: 10,
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#777",
//   },
//   videoBottomTitleSubTextMnt: {
//     fontSize: 12,
//   },
//   videoBottomTitleIconContainer: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   videoBottomTitleIcon: {
//     fontSize: 12,
//     color: "#999",
//     marginRight: 5,
//   },
// });

//new compo
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import axios from "axios"; // Import axios
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env"; // Make sure to configure .env for API_URL

const { width } = Dimensions.get("window");

// Helper function to get YouTube thumbnail from video URL
const getYoutubeThumbnail = (url) => {
  const videoId = url.split("v=")[1];
  const ampersandPosition = videoId ? videoId.indexOf("&") : -1;
  if (ampersandPosition !== -1) {
    return `https://img.youtube.com/vi/${videoId.substring(
      0,
      ampersandPosition
    )}/hqdefault.jpg`;
  }
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const VideoCard = () => {
  const navigation = useNavigation();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/youtube-videos?populate=*`
        );

        if (response.data && response.data.data) {
          const videos = response.data.data
            .map((item) => {
              if (item && item.attributes && item.attributes.youtubeVideo) {
                return item.attributes.youtubeVideo;
              }
              return null; // Return null if youtubeVideo is missing
            })
            .filter((video) => video !== null); // Filter out any null values

          setVideoData(videos); // Set only valid videos
        } else {
          console.error("Invalid API response structure");
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, []);

  const handlePress = (video) => {
    navigation.navigate("MediaPlayer", {
      video,
    });
  };

  if (!videoData) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView horizontal style={styles.videoContainer}>
      {videoData.map((video, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(video)}>
          <View style={styles.videoCard}>
            {/* Use the YouTube thumbnail URL for the image */}
            <Image
              source={{
                uri: video.videoUrl
                  ? getYoutubeThumbnail(video.videoUrl)
                  : require("../../../assets/images/powerlifting.jpg"),
              }}
              style={styles.video}
              resizeMode="cover"
              alt="image"
            />
            <View style={styles.videoOverlay}>
              <Text style={styles.videoTitle}>{video.heading}</Text>
            </View>
            <View style={styles.videoBottomTitle}>
              <View style={{ paddingBottom: 4 }}>
                <Text style={styles.bottomTitleFirst}>{video.title}</Text>
              </View>
              <View style={styles.bottomTitle}>
                <Text style={styles.videoBottomTitleSubText}>
                  {video.category}
                </Text>
                <Text style={styles.videoBottomTitleSubTextMnt}>
                  • {video.time}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  videoCard: {
    width: width * 0.88,
    height: 242,
    borderRadius: 5,
    overflow: "hidden",
    // borderWidth: 1,
    padding: 5,
    marginRight: 10,
    paddingLeft: 5,
    shadowColor: "#FAB917",
    shadowOffset: { width: -5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  video: {
    width: "100%",
    height: "84%",
    borderRadius: 5,
  },
  videoOverlay: {
    position: "absolute",
    bottom: 44,
    left: 10,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  videoTitle: {
    borderRadius: 15,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  videoBottomTitle: {
    // marginTop: 2,
    borderEndEndRadius: 5,
    borderEndStartRadius: 5,
    bottom: 0,
    width: "100%",
    paddingHorizontal: 4,
    paddingTop: 5,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bottomTitleFirst: {
    fontSize: 13,
    fontWeight: "bold",
  },
  bottomTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  videoBottomTitleSubText: {
    // marginLeft: 10,
    // paddingBottom: 16,
    fontSize: 12,
    fontWeight: "bold",
    color: "#777",
  },
  videoBottomTitleSubTextMnt: {
    fontSize: 12,
  },
  videoContainer: {
    flexDirection: "row",
    // paddingVertical: 6,
    borderRadius: 5,
  },
});

import { Video } from "expo-av";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const { width } = Dimensions.get("window");

const VideoCard = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={[styles.videoCard]}>
      {!videoLoaded && (
        <View style={styles.loadingContainer}>
          {/* <ActivityIndicator size="large" color="#0000ff" /> */}
        </View>
      )}
      <Video
        source={video.uri}
        style={styles.video}
        resizeMode="cover"
        isLooping
        shouldPlay={isPlaying}
        onLoad={() => setVideoLoaded(true)}
      />
      <View style={styles.videoOverlay}>
        <Text style={styles.videoTitle}>{video.title}</Text>
        <TouchableOpacity
          onPress={handlePlayPause}
          style={styles.playPauseButton}
        >
          <Text style={styles.playPauseIcon}>{isPlaying ? "❚❚" : "▶"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.videoBottomTitle}>
        {/* <View style={styles.videoBottomTitleIconContainer}> */}
        <View style={{ paddingBottom: 4 }}>
          <Text style={styles.bottomTitleFirst}>Two hour bulking training</Text>
        </View>
        <View style={styles.bottomTitle}>
          <View style={styles.bottomTitle}>
            <Text style={styles.videoBottomTitleSubicon}>{video.icon}</Text>
            <Text style={styles.videoBottomTitleSubText}>Beginner</Text>
          </View>
          <Text style={styles.videoBottomTitleSubTextMnt}> • 42 Min</Text>
        </View>
        {/* </View> */}
      </View>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  videoCard: {
    width: width * 0.78,
    height: 240,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 10,
    // backgroundColor:'white',
    // borderBottomWidth: 3,
    paddingLeft: 7,
    paddingBottom: 10,
    // Adjusted shadow properties
    shadowColor: "#FAB917",
    shadowOffset: { width: -5, height: 5 }, // Shadow evenly around the card
    shadowOpacity: 0.4, // Reduce opacity for a softer shadow
    shadowRadius: 15, // Increase radius for a smoother shadow
    elevation: 6, // Slightly increase elevation for a more pronounced shadow on Android
  },
  video: {
    width: "100%",
    height: "80%",
    borderRadius: 15,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  videoOverlay: {
    position: "absolute",
    bottom: 62,
    left: 14,
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
  playPauseButton: {
    backgroundColor: "#FDEEC7",
    borderRadius: 50,
    padding: 6,
  },
  playPauseIcon: {
    fontSize: 15,
  },
  videoBottomTitle: {
    marginTop: 2,
    // borderRadius: 15,
    borderEndEndRadius: 15,
    borderEndStartRadius: 15,
    bottom: 0,
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: "white",
    // borderTopWidth: 1,
    // borderTopColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  videoBottomTitleText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  bottomTitleFirst: {
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  videoBottomTitleSubicon: {
    paddingRight: 5,
  },
  videoBottomTitleSubText: {
    paddingBottom: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#777",
  },
  videoBottomTitleSubTextMnt: {
    fontSize: 12,
  },
  videoBottomTitleIconContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  videoBottomTitleIcon: {
    fontSize: 12,
    color: "#999",
    marginRight: 5,
  },
});

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
          <ActivityIndicator size="large" color="#0000ff" />
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
    backgroundColor: "#fff",
    borderBottomWidth: 3,
    marginHorizontal: 10,
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: { width: -5, height: 5 }, // Left shadow with slight vertical offset
    shadowOpacity: 0.7, // Visible shadow
    shadowRadius: 3, // Soft shadow edges
    // Elevation for Android
    elevation: 5, // Elevated shadow on Android
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
    bottom: 50,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  videoTitle: {
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
    bottom: 0,
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
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

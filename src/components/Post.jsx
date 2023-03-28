import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { CommentsIcon, LocationIcon } from "../assets/custom-icons";

export default function Post({
  source,
  photoTitle,
  locationTitle,
  commentsCount = 0,
}) {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
      <Text style={styles.title}>{photoTitle}</Text>
      <View style={styles.interactiveArea}>
        <View style={styles.commentsArea}>
          <CommentsIcon />
          <Text style={styles.commentsCount}>{commentsCount}</Text>
        </View>
        <TouchableOpacity style={styles.locationArea}>
          <LocationIcon />
          <Text style={styles.location}>{locationTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    marginTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  image: {
    flex: 1,
    objectFit: "cover",
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    marginTop: 8,
  },
  interactiveArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  commentsArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsCount: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  locationArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    marginLeft: 3,
  },
});

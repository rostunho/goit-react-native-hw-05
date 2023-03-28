import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Location from "expo-location";
import { nanoid } from "nanoid";
import PhotoViewer from "../../components/PhotoViewer";
import PostInput from "../../components/PostInput";
import SubmitButton from "../../components/SubmitButton";
import { ClearFormIcon } from "../../assets/custom-icons";

export default function CreatePostScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [locationTitle, setLocationTitle] = useState("");
  const [hasLocationPermision, setHasLocationPermision] = useState(false);
  // const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const location = await Location.requestForegroundPermissionsAsync();
        if (!location.granted) {
          setErrorMessage("Permission to access location was denied");
          return;
        }
        setHasLocationPermision(true);
      } catch (error) {
        return Alert.alert(error.message);
      }
    })();
  }, []);

  const onPublishHandler = async () => {
    if (!photo) {
      return Alert.alert("You should choose or take a photo for publication.");
    }

    try {
      if (!hasLocationPermision) {
        return Alert.alert(errorMessage);
      }

      const location = await Location.getCurrentPositionAsync({});
      const data = createPost(location);
      navigation.navigate("Posts", data);
      clearForm();
    } catch (error) {
      return Alert.alert(error.message);
    }
  };

  const clearForm = () => {
    setPhoto(null);
    setPhotoTitle("");
    setLocationTitle("");
    // setLocation(false);
  };

  const createPost = (location) => {
    const newPost = {
      id: nanoid(4).toString(),
      photo: photo,
      photoTitle: photoTitle,
      location: location,
      locationTitle: locationTitle,
      comments: [],
    };
    return newPost;
  };

  return (
    <View style={styles.container}>
      <PhotoViewer setPhoto={setPhoto} photo={photo} />
      <View style={styles.form}>
        <PostInput
          placeholder="Photo Title"
          onChangeText={setPhotoTitle}
          value={photoTitle}
        />
        <PostInput
          location
          placeholder="Location"
          onChangeText={setLocationTitle}
          value={locationTitle}
        />
      </View>
      <SubmitButton
        text="Publish"
        style={{ marginTop: 32 }}
        onSubmit={onPublishHandler}
      />
      <TouchableOpacity style={styles.button}>
        <ClearFormIcon onPress={clearForm} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#fff",
  },
  form: {
    marginTop: 32,
  },
  button: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 34,
  },
});

import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import PhotoViewer from "../../components/PhotoViewer";
import PostInput from "../../components/PostInput";
import SubmitButton from "../../components/SubmitButton";
import { ClearFormIcon } from "../../assets/custom-icons";

export default function CreatePostScreen() {
  const [photo, setPhoto] = useState(null);
  const [photoTitle, setPhotoTitle] = useState(null);
  const [photoLocation, setPhotoLocation] = useState(null);

  const clearForm = () => {
    setPhoto(null);
    setPhotoTitle(null);
    setPhotoLocation(null);
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
          onChangeText={setPhotoLocation}
          value={photoLocation}
        />
      </View>
      <SubmitButton text="Publish" style={{ marginTop: 32 }} />
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

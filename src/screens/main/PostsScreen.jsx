import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import Post from "../../components/Post";

export default function PostsScreen({ route }) {
  const [posts, setPosts] = useState([]);

  // console.log(route);
  // console.log(posts);
  posts.length > 0 && console.log(posts[0].photo.uri);

  useEffect(() => {
    const newPost = route.params;
    newPost && setPosts((prevState) => [newPost, ...prevState]);
  }, [route.params]);

  return (
    posts.length > 0 && (
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post
              source={{ uri: item.photo.uri }}
              photoTitle={item.photoTitle}
              locationTitle={item.locationTitle}
            />
          )}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    // alignItems: "center",
  },
});

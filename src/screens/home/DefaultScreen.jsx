import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, StyleSheet } from "react-native";
import PostsScreen from "../main/PostsScreen";
import CreatePostScreen from "../main/CreatePostScreen";
import ProfileScreen from "../main/ProfileScreen";
import {
  LogOutIcon,
  PostsIcon,
  CreatePostIcon,
  ProfileIcon,
} from "../../assets/custom-icons";

const MainTab = createBottomTabNavigator();

export default function DefaultScreen({ navigation }) {
  return (
    <>
      <MainTab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          ...options.screen,
          headerRight: () => {
            return (
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => navigation.navigate("Login")}
              >
                <LogOutIcon />
              </TouchableOpacity>
            );
          },
        }}
      >
        <MainTab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            title: "Publications",
            tabBarIcon: ({ focused }) => {
              return <PostsIcon focused={focused} />;
            },
          }}
        />

        <MainTab.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{
            title: "Create Publication",
            style: { marginHorizontal: 31 },
            tabBarStyle: { display: "none" },
            tabBarIcon: () => {
              return <CreatePostIcon />;
            },
          }}
        />

        <MainTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return <ProfileIcon focused={focused} />;
            },
          }}
        />
      </MainTab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 83,
    paddingBottom: 25,
  },
  header: {
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(179,179,179)",
  },
});

const options = {
  screen: {
    tabBarStyle: styles.tabBar,
    tabBarShowLabel: false,
    headerTitleAlign: "center",
    headerStyle: styles.header,
    headerTitleStyle: { fontSize: 17 },
    headerRightContainerStyle: { paddingRight: 16 },
    headerLeftContainerStyle: { paddingLeft: 16 },
  },
};

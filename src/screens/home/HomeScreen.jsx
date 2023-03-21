import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreen from "./DefaultScreen";
import CommetsScreen from "./CommetsScreen";
import MapScreen from "./MapScreen";

const HomeStack = createStackNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <HomeStack.Navigator initialRouteName="Default">
      <HomeStack.Screen
        name="Default"
        options={{ headerShown: false }}
        component={DefaultScreen}
      />
      <HomeStack.Screen name="Comments" component={CommetsScreen} />
      <HomeStack.Screen name="Map" component={MapScreen} />
    </HomeStack.Navigator>
  );
}

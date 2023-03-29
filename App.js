import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "react-native-get-random-values";
import HomeScreen from "./src/screens/home/HomeScreen";
import RegistrationScreen from "./src/screens/auth/RegistrationScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";

const AuthStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

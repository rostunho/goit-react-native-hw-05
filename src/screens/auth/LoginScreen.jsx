import { useState, useEffect } from "react";
import { Keyboard, StyleSheet, View, Text } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Input from "../../components/Input";
import AuthButtons from "../../components/AuthButtons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(false)
    );

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleSubmit = () => {
    console.log("Email :", email);
    console.log("Password :", password);
    setEmail("");
    setPassword("");
    navigation.navigate("Home", {
      screen: "Default",
      params: { screen: "Posts" },
    });
  };

  const onOutputPress = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss();
  };

  return (
    <ScreenWrapper keyboardVerticalOffset={-307} onPress={onOutputPress}>
      <View
        style={{
          ...styles.container,
          paddingBottom: isKeyboardVisible ? 307 : 128,
        }}
      >
        <Text style={styles.title}>Log In</Text>
        <View style={styles.form}>
          <Input
            placeholder="Email"
            value={email}
            onFocus={() => setIsKeyboardVisible(true)}
            onChangeText={(value) => {
              setEmail(value);
            }}
          />
          <Input
            placeholder="Password"
            secured
            value={password}
            onFocus={() => setIsKeyboardVisible(true)}
            onChangeText={(value) => {
              setPassword(value);
            }}
          />
          {!isKeyboardVisible && (
            <AuthButtons
              text="Log In"
              secondaryText="Don't have an account? Register?"
              onSubmit={handleSubmit}
              onRedirect={() => navigation.navigate("Register")}
            />
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35.16,
    marginBottom: 32,
  },
  form: {
    width: "100%",
  },
});

import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Keyboard } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import AuthButtons from "../../components/AuthButtons";

export default function RegistrationScreen({ navigation }) {
  const [login, setLogin] = useState("");
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
    console.log("Login :", login);
    console.log("Email :", email);
    console.log("Password :", password);
    setLogin("");
    setEmail("");
    setPassword("");
    setIsKeyboardVisible(false);
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
          paddingBottom: isKeyboardVisible ? 307 : 45,
        }}
      >
        <Avatar />
        <Text style={styles.title}>Registration</Text>
        <View style={styles.form}>
          <Input
            placeholder="Login"
            value={login}
            onFocus={() => setIsKeyboardVisible(true)}
            onChangeText={(value) => {
              setLogin(value);
            }}
          />
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
              text="Register"
              secondaryText="Already have an account? Log In ?"
              onSubmit={handleSubmit}
              onRedirect={() => navigation.navigate("Login")}
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
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35.16,
    marginBottom: 32,
  },
  form: {
    width: "100%",
    // height: 300,
  },
});

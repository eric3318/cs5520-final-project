import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';

const SIGNUP = 'signUp';
const LOGIN = 'logIn';

export default function Auth() {
  const [mode, setMode] = useState(SIGNUP);

  const changeMode = () => {
    if (mode === SIGNUP) {
      setMode(LOGIN);
      return;
    }
    setMode(SIGNUP);
  };

  return (
    <View style={styles.container}>
      <TextInput label="Email" />
      {mode === SIGNUP && <TextInput label="Username" />}
      <TextInput label="Password" />
      {mode === SIGNUP && <TextInput label="Confirm password" />}
      <View>
        <Button mode="contained">Register</Button>
        <View style={styles.prompt}>
          <Text>Already have an account?</Text>
          <Button onPress={changeMode}>Log in</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    rowGap: 10,
  },
  prompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';

const SIGNUP = 'Sign Up';
const LOGIN = 'Log In';

export default function Auth() {
  const [mode, setMode] = useState(SIGNUP);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changeMode = () => {
    if (mode === SIGNUP) {
      setMode(LOGIN);
      return;
    }
    setMode(SIGNUP);
  };

  const authHandler = () => {
    switch (mode) {
      case SIGNUP:
        signUpHandler();
        break;
      case LOGIN:
        logInHandler();
        break;
    }
  };

  const signUpHandler = () => {};

  const logInHandler = () => {};

  return (
    <View style={styles.container}>
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      {mode === SIGNUP && (
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
        />
      )}
      <TextInput label="Password" value={password} onChangeText={setPassword} />
      {mode === SIGNUP && (
        <TextInput
          label="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      )}
      <View>
        <Button mode="contained" onPress={authHandler}>
          {mode}
        </Button>
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

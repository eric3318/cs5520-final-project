import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { auth } from '../firebase/firebaseSetup';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const SIGNUP = 'Sign Up';
const LOGIN = 'Log In';

export default function Auth({ navigation }) {
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

  const signUpHandler = async () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Missing required fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch');
      return;
    }
    // todo: add more data verification
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCred);
    } catch (err) {
      if (err.code === 'auth/weak-password') {
        Alert.alert('Password should be at least 6 characters');
      }
      console.log(err);
    }
  };

  const logInHandler = async () => {
    if (!email || !password) {
      Alert.alert('Missing required fields');
      return;
    }
    // todo: add more data verification
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred);
    } catch (err) {
      console.log(err);
    }
  };

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
        <Button mode="contained" onPress={() => authHandler()}>
          {mode}
        </Button>
        <View style={styles.prompt}>
          {mode === SIGNUP ? (
            <>
              <Text>Already have an account?</Text>
              <Button onPress={changeMode}>Log in</Button>
            </>
          ) : (
            <>
              <Text>New to the app?</Text>
              <Button onPress={changeMode}>Sign Up</Button>
            </>
          )}
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

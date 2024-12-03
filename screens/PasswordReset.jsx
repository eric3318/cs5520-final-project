import { StyleSheet, View, Text, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseSetup';
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';

function PasswordReset({ navigation }) {
  const [email, setEmail] = useState('');
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  const sendResetEmail = async (emailInput) => {
    try {
      await sendPasswordResetEmail(auth, emailInput);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmEmail = async () => {
    if (!email) {
      Alert.alert('Invalid email');
      return;
    }

    await sendResetEmail(email);
    setEmailConfirmed(true);
  };

  const returnToLogin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {emailConfirmed ? (
        <>
          <View style={styles.textContainer}>
            <Text>
              You will receive an email if there is an account associated with
              the address your entered. Follow the instructions to reset the
              password.
            </Text>
          </View>
          <Button mode="contained" onPress={returnToLogin}>
            Return to Login Page
          </Button>
        </>
      ) : (
        <>
          <Text>Enter the login email:</Text>
          <TextInput label="Email" value={email} onChangeText={setEmail} />
          <Button mode="contained" onPress={confirmEmail}>
            Confirm
          </Button>
        </>
      )}
    </View>
  );
}

export default PasswordReset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    rowGap: 10,
  },
  textContainer: {
    alignItems: 'center',
    paddingTop: 24,
  },
});

import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const VerifyAccount: React.FC = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState('');
  const router = useRouter();

  const onVerifyPress = useCallback(async () => {
    if (!isLoaded) return;

    // Use the code the user provided to attempt verification
    const signUpAttempt = await signUp.attemptEmailAddressVerification({
      code,
    });

    if (signUpAttempt.status === 'complete') {
      await setActive({ session: signUpAttempt.createdSessionId });
      router.replace('/');
    } else {
      console.error(JSON.stringify(signUpAttempt, null, 2));
    }
  }, [signUp, code, router, isLoaded, setActive]);

  return (
    <View>
      <Text>Verify your email</Text>
      <TextInput
        value={code}
        placeholder="Enter your verification code"
        onChangeText={(code) => setCode(code)}
      />
      <TouchableOpacity onPress={onVerifyPress}>
        <Text>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyAccount;

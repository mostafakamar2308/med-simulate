import { useFormatMessage } from '@/hooks/intl';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type FormParams = {
  email: string;
  password: string;
};

const SignInForm: React.FC = () => {
  const router = useRouter();

  const { signIn, setActive, isLoaded } = useSignIn();

  const intl = useFormatMessage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormParams>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignInPress = useCallback(
    async (props: FormParams) => {
      if (!isLoaded) return;

      try {
        const signInAttempt = await signIn.create({
          identifier: props.email,
          password: props.password,
        });

        if (signInAttempt.status === 'complete') {
          await setActive({ session: signInAttempt.createdSessionId });
          router.replace('/');
        } else {
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    },
    [signIn, isLoaded, router, setActive],
  );

  return (
    <View className="my-6 w-full">
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text className="text-xl">{intl('label.email')}</Text>
            <TextInput
              placeholder={intl('label.email.placeholder')}
              onBlur={onBlur}
              className="border my-2 p-1 text-lg rounded-lg"
              onChangeText={onChange}
              value={value}
            />
          </>
        )}
        name="email"
      />
      {errors.email && (
        <Text className="text-red-700 text-xs text-center">
          {intl('errors.required')}
        </Text>
      )}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text className="text-xl">{intl('label.password')}</Text>
            <TextInput
              secureTextEntry
              placeholder={intl('label.password.placeholder')}
              onBlur={onBlur}
              className="border my-2 p-1 text-lg rounded-lg"
              onChangeText={onChange}
              value={value}
            />
          </>
        )}
        name="password"
      />
      {errors.password && (
        <Text className="text-red-700 text-xs text-center">
          {intl('errors.required')}
        </Text>
      )}

      <TouchableOpacity
        className="rounded-md py-3 px-2 mt-2 w-fit mx-auto bg-green-700"
        onPress={handleSubmit(onSignInPress)}
      >
        <Text className="text-white">{intl('auth.sign-in')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInForm;

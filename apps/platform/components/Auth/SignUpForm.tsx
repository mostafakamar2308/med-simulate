import { useFormatMessage } from '@/hooks/intl';
import { useSignUp } from '@clerk/clerk-expo';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type FormParams = {
  email: string;
  password: string;
};

const SignUpForm: React.FC<{ enableVerification: () => void }> = ({
  enableVerification,
}) => {
  const { isLoaded, signUp } = useSignUp();

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

  const onSignUpPress = useCallback(
    async (props: FormParams) => {
      if (!isLoaded) return;
      await signUp.create({
        emailAddress: props.email,
        password: props.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      enableVerification();
    },
    [signUp, enableVerification, isLoaded],
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
        onPress={handleSubmit(onSignUpPress)}
      >
        <Text className="text-white">{intl('auth.sign-up')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;

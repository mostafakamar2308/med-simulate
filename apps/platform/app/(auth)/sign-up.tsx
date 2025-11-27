import logo from '@/assets/images/logo.png';
import SignUpForm from '@/components/Auth/SignUpForm';
import VerifyAccount from '@/components/Auth/VerifyAccount';
import { useFormatMessage } from '@/hooks/intl';
import { Link } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, Text, View } from 'react-native';

export default function SignUpScreen() {
  const intl = useFormatMessage();

  const [pendingVerification, setPendingVerification] = useState(false);

  const enableVerification = useCallback(
    () => setPendingVerification(true),
    [],
  );

  if (pendingVerification) return <VerifyAccount />;

  return (
    <View className="px-6 bg-[#eee] py-12 flex-1 flex items-center flex-col font-bold">
      <Image className="invert" width={64} height={64} source={logo} />
      <Text className="text-4xl my-4">{intl('auth.welcome')}</Text>
      <SignUpForm enableVerification={enableVerification} />
      <Text className="text-lg">
        {intl.rich('auth.redirect-to-sign-in', {
          register: (
            <Link className="border-b" href="/sign-up">
              {intl('auth.sign-in.title')}
            </Link>
          ),
        })}
      </Text>
    </View>
  );
}

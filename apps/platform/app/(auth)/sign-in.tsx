import logo from '@/assets/images/logo.png';
import SignInForm from '@/components/Auth/SignInForm';
import { useFormatMessage } from '@/hooks/intl';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

export default function Page() {
  const intl = useFormatMessage();

  return (
    <View className="px-6 bg-[#eee] py-12 flex-1 flex items-center flex-col font-bold">
      <Image className="invert" width={64} height={64} source={logo} />
      <Text className="text-4xl my-4">{intl('auth.welcome')}</Text>
      <SignInForm />
      <Text className="text-lg">
        {intl.rich('auth.redirect-to-sign-up', {
          register: (
            <Link className="border-b" href="/sign-up">
              {intl('auth.register.title')}
            </Link>
          ),
        })}
      </Text>
    </View>
  );
}

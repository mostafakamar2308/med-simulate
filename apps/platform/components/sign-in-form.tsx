import { SocialConnections } from "@/components/social-connections";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Stethoscope } from "lucide-react-native";
import * as React from "react";
import { type TextInput, View } from "react-native";
import { Icon } from "@/components/ui/icon";

export function SignInForm() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const passwordInputRef = React.useRef<TextInput>(null);
  const [error, setError] = React.useState<{ email?: string; password?: string }>({});

  async function onSubmit() {
    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        setError({ email: "", password: "" });
        await setActive({ session: signInAttempt.createdSessionId });
        return;
      }
      // TODO: Handle other statuses
      console.error(JSON.stringify(signInAttempt, null, 2));
    } catch (err) {
      // See https://go.clerk.com/mRUDrIe for more info on error handling
      if (err instanceof Error) {
        const isEmailMessage =
          err.message.toLowerCase().includes("identifier") ||
          err.message.toLowerCase().includes("email");
        setError(isEmailMessage ? { email: err.message } : { password: err.message });
        return;
      }
      console.error(JSON.stringify(err, null, 2));
    }
  }

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  return (
    <Card className="h-screen justify-center border-border/0 shadow-none">
      <CardHeader className="flex flex-col items-center">
        <View className="mx-auto mb-6 flex h-20 w-20 rotate-3 items-center justify-center rounded-3xl bg-primary/10 text-primary">
          <Icon as={Stethoscope} className="mx-auto h-10 w-10 text-primary"></Icon>
        </View>
        <CardTitle className="font-display text-3xl font-bold text-foreground">
          Med Simulate
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Train your clinical reasoning
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-6">
        <View className="gap-6">
          <View className="gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              keyboardType="email-address"
              autoComplete="email"
              autoCapitalize="none"
              onChangeText={setEmail}
              onSubmitEditing={onEmailSubmitEditing}
              returnKeyType="next"
              submitBehavior="submit"
            />
            {error.email ? (
              <Text className="text-sm font-medium text-destructive">{error.email}</Text>
            ) : null}
          </View>
          <View className="gap-1.5">
            <View className="flex-row items-center">
              <Label htmlFor="password">Password</Label>
              <Link asChild href={`/(auth)/forgot-password?email=${email}`}>
                <Button variant="link" size="sm" className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4">
                  <Text className="font-normal leading-4">Forgot your password?</Text>
                </Button>
              </Link>
            </View>
            <Input
              ref={passwordInputRef}
              id="password"
              secureTextEntry
              onChangeText={setPassword}
              returnKeyType="send"
              onSubmitEditing={onSubmit}
            />
            {error.password ? (
              <Text className="text-sm font-medium text-destructive">{error.password}</Text>
            ) : null}
          </View>
          <Button className="w-full" onPress={onSubmit}>
            <Text>Continue</Text>
          </Button>
        </View>
        <Text className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/(auth)/sign-up" className="text-sm underline underline-offset-4">
            Sign up
          </Link>
        </Text>
        <View className="flex flex-row items-center">
          <View className="h-[.5] flex-1 bg-primary" />
          <Text className="px-4 text-center text-muted-foreground">Or</Text>
          <View className="h-[.5] flex-1 bg-primary" />
        </View>
        <SocialConnections />
      </CardContent>
    </Card>
  );
}

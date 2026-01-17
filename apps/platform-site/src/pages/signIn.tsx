import { SocialConnections } from "@/components/auth/social-connection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/clerk-react";
import { Stethoscope } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    email?: string;
    password?: string;
  }>({});

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
        setError(
          isEmailMessage ? { email: err.message } : { password: err.message }
        );
        return;
      }
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <section className="w-screen bg-primary/5 h-screen px-2 flex justify-center items-center">
      <Card className="border border-primary max-w-sm shadow md:h-3/4  w-full justify-center">
        <CardHeader className="flex flex-col items-center">
          <div className="mx-auto mb-6 flex h-20 w-20 rotate-3 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <Stethoscope />
          </div>
          <CardTitle className="font-display text-3xl font-bold text-foreground">
            Ped Simulate
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Train your pediatric clinical reasoning
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                autoCapitalize="none"
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email ? (
                <p className="text-sm font-medium text-destructive">
                  {error.email}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex-row items-center flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to={`/(auth)/forgot-password?email=${email}`}>
                  <Button
                    variant="link"
                    size="sm"
                    className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4"
                  >
                    <p className="font-normal leading-4">
                      Forgot your password?
                    </p>
                  </Button>
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password ? (
                <p className="text-sm font-medium text-destructive">
                  {error.password}
                </p>
              ) : null}
            </div>
            <Button className="w-full cursor-pointer" onClick={onSubmit}>
              Continue
            </Button>
          </div>
          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              className="text-sm underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>
          <div className="flex flex-row items-center">
            <div className="h-[.5px] grow flex-1 bg-primary" />
            <p className="px-4 text-center text-muted-foreground">Or</p>
            <div className="h-[.5px] grow flex-1 bg-primary" />
          </div>
          <SocialConnections />
        </CardContent>
      </Card>
    </section>
  );
}

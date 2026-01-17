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
import { useSignUp } from "@clerk/clerk-react";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router";

const RESEND_CODE_INTERVAL_SECONDS = 30;

export default function VerifyEmail() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [searchParams] = useSearchParams();
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
  const { countdown, restartCountdown } = useCountdown(
    RESEND_CODE_INTERVAL_SECONDS
  );
  const navigate = useNavigate();

  async function onSubmit() {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        return;
      }
      // TODO: Handle other statuses
      // If the status is not complete, check why. User may need to
      // complete further steps.
      console.error(JSON.stringify(signUpAttempt, null, 2));
    } catch (err) {
      // See https://go.clerk.com/mRUDrIe for more info on error handling
      if (err instanceof Error) {
        setError(err.message);
        return;
      }
      console.error(JSON.stringify(err, null, 2));
    }
  }

  async function onResendCode() {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      restartCountdown();
    } catch (err) {
      // See https://go.clerk.com/mRUDrIe for more info on error handling
      if (err instanceof Error) {
        setError(err.message);
        return;
      }
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <section className="w-screen bg-primary/5 h-screen px-2 flex justify-center items-center">
      <Card className="border border-primary max-w-sm shadow md:h-3/4  w-full justify-center">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            Verify your email
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Enter the verification code sent to{" "}
            {searchParams.get("email") || "your email"}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="code">Verification code</Label>
              <Input
                id="code"
                autoCapitalize="none"
                onChange={(e) => setCode(e.target.value)}
                type="number"
              />
              {!error ? null : (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}
              <Button
                variant="link"
                size="sm"
                disabled={countdown > 0}
                onClick={onResendCode}
              >
                <p className="text-center text-xs">
                  Didn&apos;t receive the code? Resend{" "}
                  {countdown > 0 ? (
                    <span className="text-xs">({countdown})</span>
                  ) : null}
                </p>
              </Button>
            </div>
            <div className="gap-3 flex">
              <Button className="grow" onClick={onSubmit}>
                Continue
              </Button>
              <Button
                variant="outline"
                className="grow"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function useCountdown(seconds = 30) {
  const [countdown, setCountdown] = React.useState(seconds);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = React.useCallback(() => {
    setCountdown(seconds);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [seconds]);

  React.useEffect(() => {
    startCountdown();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startCountdown]);

  return { countdown, restartCountdown: startCountdown };
}

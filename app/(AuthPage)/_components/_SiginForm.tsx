'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { useToast } from '~/components/ui/use-toast';
import { auth } from '~/config/firebase';
import { useBoundStore } from '~/app/stores';
import { setCookie } from 'nookies';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setSession } = useBoundStore((state) => state);

  const router = useRouter();
  const { toast } = useToast();

  const onAuth = () => {
    setIsLoading(true);

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { user } = result;
        const token = await user.getIdToken();

        if (user) {
          setSession({
            userId: user.uid,
            avatar: user.photoURL ?? '',
            name: user.displayName ?? '',
            email: user.email ?? '',
          });

          setIsLoading(false);
          setCookie(null, 'setala-token', token);
          router.push('/dashboard');
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast({ description: `Login gagal: ${errorMessage}` });
      });
  };

  return (
    <div className="flex justify-center items-center h-screen px-6">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Continue with your Google account.</CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            onClick={onAuth}
            disabled={isLoading}
            variant="secondary"
            className="w-full"
            size="lg"
          >
            <span className="mr-4">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg role="img" viewBox="0 0 24 24" className="w-4 h-4">
                  <path
                    fill="currentColor"
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  />
                </svg>
              )}
            </span>
            Login with Google
          </Button>
        </CardContent>

        <CardFooter className="text-center text-sm text-muted-foreground">
          <p>
            By clicking continue, you agree to our{' '}
            <a
              target="_blank"
              className="underline underline-offset-4 hover:text-primary"
              href="https://policies.google.com/terms"
              rel="noreferrer"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              className="underline underline-offset-4 hover:text-primary"
              href="https://policies.google.com/privacy"
              rel="noreferrer"
            >
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

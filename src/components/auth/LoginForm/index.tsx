'use client';

import Lottie from 'lottie-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PageLayout from '@/tools/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
// import loginAnimation from '../../../../public/lottie/login.json';
import loginAnimation from '@/assets/lottie/login.json';
import { signInUser } from '@/services/Auth';
import { ErrorToast, SuccessToast } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

const LoginForm = ({ redirectPath }: { redirectPath: string }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { setIsLoading: setIsLoadingContext } = useUser();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignInUser = async (data: z.infer<typeof loginSchema>) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      setIsLoading(true);
      const res = await signInUser(payload);

      if (res?.success) {
        SuccessToast(res?.message || 'Login successful');
        setIsLoading(true);
        setIsLoadingContext(true);
        // router.refresh();
        // router.push('/');
        router.push(redirectPath || '/');
      } else {
        ErrorToast(res.message || 'Login failed');
        if (res.message === 'User does not exist!') {
          router.push('/auth/register');
        } else if (
          res.message ===
          'Verify your account with the new OTP sent to the mail!'
        ) {
          router.push(
            '/auth/verify-otp?email=' +
              encodeURIComponent(data.email) +
              '&type=register'
          );
        }
      }
    } catch (err: unknown) {
      ErrorToast(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-linear-to-br from-background via-primary/5 to-background">
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-105 w-105 translate-x-1/3 translate-y-1/3 rounded-full bg-secondary/20 blur-[140px]" />

      <PageLayout className="relative z-10 flex items-center p-4">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="hidden sm:flex w-full flex-col items-center gap-6 rounded-4xl border border-primary/20 bg-primary/5 p-4 text-center shadow-inner lg:items-start lg:text-left">
            <div className="relative w-full max-w-135 rounded-4xl p-6">
              <Lottie
                animationData={loginAnimation}
                loop
                className="relative z-10 w-full max-h-105"
                aria-label="Login illustration"
              />
            </div>
          </div>

          <Card className="relative overflow-hidden border-border/60 bg-background/90 shadow-2xl backdrop-blur">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-60" />
            <CardContent className="relative z-10">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Link href="/">
                    <ArrowLeft className="size-4" />
                  </Link>
                </Button>
                <Link
                  href="/support/faqs"
                  className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground hover:text-primary"
                >
                  Need help?
                </Link>
              </div>

              <div className="mt-8 space-y-2 text-center sm:text-left">
                <h2 className="text-3xl font-semibold text-foreground">
                  Welcome back
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sign in with your email to pick up where you left off and
                  track every order.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSignInUser)}
                  className="mt-8 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="student@example.com"
                            className="rounded-2xl border-border/40 bg-background/95 px-4 py-5"
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <div className="flex items-center">
                          <FormLabel className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            Password
                          </FormLabel>
                          <Link
                            href="/auth/forgot-password"
                            className="ml-auto text-xs font-medium transition hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className="rounded-2xl border-border/40 bg-background/95 px-4 py-5 pr-12"
                              {...field}
                              value={field.value || ''}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground transition hover:text-primary"
                              onClick={togglePasswordVisibility}
                              aria-label={
                                showPassword ? 'Hide password' : 'Show password'
                              }
                            >
                              {showPassword ? (
                                <EyeOff className="size-5" />
                              ) : (
                                <Eye className="size-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full rounded-full py-5 text-sm font-semibold uppercase tracking-[0.35em]"
                  >
                   {isLoading ? <><Loader2 className="size-5 animate-spin" /> Logging in...</> : 'Login'}
                  </Button>
                </form>
              </Form>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/register"
                  className="font-semibold hover:underline"
                >
                  Create one now
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </div>
  );
};

export default LoginForm;

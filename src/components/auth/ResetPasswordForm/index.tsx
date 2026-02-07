'use client';

import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ErrorToast, SuccessToast } from '@/lib/utils';
import { setNewPassword } from '@/services/Auth';

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: 'New password must be at least 6 characters.' }),
    confirmNewPassword: z.string().min(6, {
      message: 'Confirm new password must be at least 6 characters.',
    }),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match.",
    path: ['confirmNewPassword'],
  });

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = useMemo(() => searchParams.get('email') ?? '', [searchParams]);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isPending, startTransition] = useTransition();
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(previous => !previous);
  const toggleConfirmNewPasswordVisibility = () =>
    setShowConfirmNewPassword(previous => !previous);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    setStatus('idle');
    startTransition(async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('resetPasswordToken='))
          ?.split('=')[1];

        if (!token) {
          ErrorToast('Invalid or expired reset token');
          setStatus('error');
          return;
        }

        const res = await setNewPassword(data.newPassword);

        if (res?.success) {
          SuccessToast(res?.message || 'Password reset successfully');
          setStatus('success');
          router.push('/auth/login');
        } else {
          ErrorToast(res?.message || 'Failed to reset password');
          setStatus('error');
        }
      } catch (err: unknown) {
        setStatus('error');
        ErrorToast(
          err instanceof Error
            ? err.message
            : 'An error occurred while resetting password'
        );
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-linear-to-br from-background via-primary/5 to-background p-4">
      <div className="w-full max-w-sm md:max-w-lg">
        <Card className="overflow-hidden p-0 shadow-2xl">
          <CardContent className="p-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 p-6 md:p-8"
              >
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm font-medium text-muted-foreground transition hover:text-primary"
              >
                <ArrowLeft className="mr-2 size-4" />
                Back to login
              </Link>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <h1 className="text-2xl font-semibold text-foreground">
                    Reset your password
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Choose a new password below. For security reasons, the link
                    is valid for a short time only.
                  </p>
                  {email ? (
                    <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
                      {email}
                    </p>
                  ) : null}
                </div>

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="********"
                            {...field}
                            value={field.value || ''}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-primary cursor-pointer"
                            onClick={toggleNewPasswordVisibility}
                            aria-label={
                              showNewPassword
                                ? 'Hide password'
                                : 'Show password'
                            }
                          >
                            {showNewPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            placeholder="********"
                            {...field}
                            value={field.value || ''}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-primary cursor-pointer"
                            onClick={toggleConfirmNewPasswordVisibility}
                            aria-label={
                              showConfirmNewPassword
                                ? 'Hide password'
                                : 'Show password'
                            }
                          >
                            {showConfirmNewPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {status === 'success' ? (
                  <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                    Your password was reset successfully. You can now log in
                    with your new credentials.
                  </p>
                ) : null}
                {status === 'error' ? (
                  <p className="rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                    Something went wrong. Please try again or request a fresh
                    reset link.
                  </p>
                ) : null}

                <Button
                  type="submit"
                  className="w-full"
                  loading={isPending}
                  disabled={isPending}
                >
                  {isPending ? 'Updating...' : 'Reset password'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  </div>
);
};

export default ResetPasswordForm;

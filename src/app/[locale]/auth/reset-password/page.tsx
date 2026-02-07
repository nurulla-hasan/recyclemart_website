import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { Suspense } from 'react';

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex w-full justify-center p-8 text-sm text-muted-foreground">
          Loading reset form...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;

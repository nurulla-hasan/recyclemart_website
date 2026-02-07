import LoginForm from '@/components/auth/LoginForm';

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirectPath: string }>;
}) => {
  const { redirectPath } = await searchParams;

  return (
    <>
      <LoginForm redirectPath={redirectPath} />
    </>
  );
};

export default LoginPage;

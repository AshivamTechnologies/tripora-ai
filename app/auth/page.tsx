import { AuthForm } from '@/components/auth/auth-form';

type AuthPageProps = {
  searchParams: { next?: string };
};

function safeNextPath(value: string | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/trips';
  return value;
}

export default function AuthPage({ searchParams }: AuthPageProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-brand-mist px-5 py-16">
      <AuthForm nextPath={safeNextPath(searchParams.next)} />
    </div>
  );
}

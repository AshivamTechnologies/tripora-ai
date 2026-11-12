import { AuthForm } from '@/components/auth/auth-form';

type AuthPageProps = {
  searchParams: { next?: string; reason?: string };
};

function safeNextPath(value: string | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/trips';
  return value;
}

export default function AuthPage({ searchParams }: AuthPageProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#080E0A] px-4 py-16 selection:bg-[#F5D794] selection:text-[#0A120D]">
      <AuthForm
        nextPath={safeNextPath(searchParams.next)}
        reason={searchParams.reason}
      />
    </div>
  );
}

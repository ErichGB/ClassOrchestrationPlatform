import { LoginForm } from '@/components/auth/login-form.tsx';

export default function In() {
  console.log('In');
  return (
    <section className="flex w-full h-full items-center justify-center p-6 md:p-10 preview bg-surface-100">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </section>
  );
}
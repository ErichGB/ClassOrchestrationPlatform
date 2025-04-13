import { ForgotPasswordForm } from '../../../components/auth/forgot-password-form.tsx';

export default function Forgot() {
  return (
    <section className="flex w-full h-full items-center justify-center p-6 md:p-10 preview bg-surface-100">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </section>
  );
} 
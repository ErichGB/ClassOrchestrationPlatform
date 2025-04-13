import { UpdatePasswordForm } from '../../../components/auth/update-password-form.tsx';

export default function Update() {
  return (
    <section className="flex w-full h-full items-center justify-center p-6 md:p-10 preview bg-surface-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Actualizar contraseña</h1>
          <p className="mt-2 text-gray-600">Ingresa tu nueva contraseña</p>
        </div>
        <UpdatePasswordForm />
      </div>
    </section>
  );
} 
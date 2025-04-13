import { FC } from 'react';
import { useNavigate } from 'react-router';

const ErrorPage: FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-4">Página no encontrada</p>
      <button 
        onClick={() => navigate('/')}
        className="text-blue-500 hover:text-blue-700"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default ErrorPage; 
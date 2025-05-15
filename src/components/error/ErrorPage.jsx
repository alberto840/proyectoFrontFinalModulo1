import { useRouteError, Link } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-xl mb-4">Ocurrio un error.</p>
        <p className="text-gray-500 mb-8">
          <i>{error.statusText || error.message}</i>
        </p>
        <Link 
          to="/" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retornar a Login
        </Link>
      </div>
    </div>
  );
}
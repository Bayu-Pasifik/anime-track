// src/pages/NotFound.tsx
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-2xl">Page Not Found</p>
      <p className="text-2xl">Oops... We couldn't find the page you were looking for.</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;

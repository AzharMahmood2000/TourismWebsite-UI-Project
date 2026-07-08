import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <h1 className="text-6xl font-extrabold text-[#A7412A] mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md text-center">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="px-6 py-3 bg-[#A7412A] text-white rounded-lg font-medium hover:bg-[#8e3723] transition-colors">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;

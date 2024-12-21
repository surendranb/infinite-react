import React from 'react';
import { signInWithGoogle } from '../firebase';

const Auth = () => {
    return (
         <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md">
            <div className="text-center mb-8">
                   <div className="text-blue-500 mb-6">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313-12.454z"></path>
                            <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
                            <path d="M19 11h2m-1 -1v2"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h1>
                    <p className="text-gray-600">Sign in to start learning</p>
                </div>

                <button
                     onClick={signInWithGoogle}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Auth;
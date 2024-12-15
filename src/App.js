import React, { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Auth from './components/Auth';
import MainApp from './MainApp';
import Loading from './components/Loading';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
    const { currentUser, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {currentUser ? <MainApp /> : <Auth />}
        </div>
    );
}


const router = createBrowserRouter([
   {
     path: "/",
     element: <App />
   }
]);

function AppWrapper() {
    return (
        <AuthProvider>
             <RouterProvider router={router} />
        </AuthProvider>
    )
}

export default AppWrapper;
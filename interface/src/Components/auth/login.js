import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginPage = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px6 lg:px-8">
            <div className="sm:mx-auto sm_w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="/casama_black_logo.png"
                    alt="Casama Black Logo"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold test-gray-900">Sign in to / Register your account</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <button 
                        onClick={() => loginWithRedirect()}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign In / Register
                    </button>
                </div>
            </div>
            

        </div>
        
    )
}

export default LoginPage;
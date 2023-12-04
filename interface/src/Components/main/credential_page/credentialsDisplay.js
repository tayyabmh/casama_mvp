import React, { useEffect, useState } from 'react';
import {
    EyeIcon,
    EyeOffIcon,
} from '@heroicons/react/outline'
import { useAuth0 } from "@auth0/auth0-react";
import { returnCreds } from '../../../utils/credentials';

export default function CredentialDisplay(props) {
    const { getAccessTokenSilently, user } = useAuth0();
    const [showSecret, setShowSecret] = useState(false);
    const [client_id, setClientId] = useState('');
    const [client_secret, setClientSecret] = useState('');

    useEffect(() => {
        retrieveCredentials();
    })

    const retrieveCredentials = async () => {
        const access_token = await getAccessTokenSilently();
        const { client_id, client_secret } = await returnCreds(user, access_token);
        setClientId(client_id);
        setClientSecret(client_secret);
    }
    return (
        <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">
                                Client ID
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                
                                <input
                                type="text"
                                name="client_id"
                                id="client_id"
                                disabled
                                value={client_id}
                                autoComplete="username"
                                className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="client_secret" className="block text-sm font-medium text-gray-700">
                                Client Secret
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                type={showSecret ? 'text' : 'password'}
                                name="client_secret"
                                id="client_secret"
                                disabled
                                value={client_secret}
                                autoComplete="username"
                                className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                />
                                <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-auto'>
                                {showSecret ?
                                    <EyeIcon className='h-5 w-5 text-gray-400 hover:cursor-pointer' onClick={() => setShowSecret(!showSecret)} />
                                :
                                    <EyeOffIcon className='h-5 w-5 text-gray-400 hover:cursor-pointer' onClick={() => setShowSecret(!showSecret)}/>}
                                    </div>
                            </div>
                        </div>
                    </div>
                    <label className="block text-lg font-medium text-gray-700 mt-6 ">
                                Credentials request
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                        Casama uses Auth0 and JSON Web Tokens to authenticate your requests.
                    </p>
                    <div className="bg-gray-700 overflow-hidden shadow rounded-lg w-3/5 mt-2">
                        <div className="px-4 py-2 sm:p-4">
                            <code className='text-gray-200'>curl --request POST \ </code><br/>
                            <code className='text-gray-200'> --url https://dev-4lcixyeh.us.auth0.com/oauth/token \</code><br/>
                            <code className='text-gray-200'>--header 'Content-Type: application/json' \</code><br/>
                            <code className='text-gray-200'></code>
                            <code className='text-gray-200'>--data {"'{"}
                                "client_id": "YOUR_CLIENT_ID",
                                "client_secret": "YOUR_CLIENT_SECRET",
                                "audience": "https://casama-api.herokuapp.com/",
                                "grant_type": "client_credentials"
                            {"}'"}
                            </code>
                        </div>
                    </div>
                    <label className="block text-lg font-medium text-gray-700 mt-6 ">
                        Credentials response
                    </label>
                    <p className="mt-1 text-sm text-gray-500">
                        Access tokens must be refreshed every 24 hours.
                    </p>
                    <div className="bg-gray-700 overflow-hidden shadow rounded-lg w-3/5 mt-2">
                        <div className="px-4 py-2 sm:p-4">
                            <code className='text-gray-200'>{"{"}</code><br/>
                            <code className='text-gray-200'>&ensp; "access_token": "YOUR_ACCESS_TOKEN"</code><br/>
                            <code className='text-gray-200'>&ensp; "scope": "YOUR_SCOPE_ACCESS"</code><br/>
                            <code className='text-gray-200'>&ensp; "expires_in": 86400</code><br/>
                            <code className='text-gray-200'>&ensp; "token_type": "Bearer"</code><br/>
                            <code className='text-gray-200'>{"}"}</code>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
};
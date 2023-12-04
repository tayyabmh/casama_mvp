import React from 'react';
import CredentialDisplay from './credentialsDisplay';

export default function Token(props) {
    return (
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-gray-900">API Access</h1>
                <p className="mt-1 text-md text-gray-500">
                  These are your access credentials to retrieve an access token to make HTTP requests to the Casama API.
                </p>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                {
                props.isTokenLaunched 
                ?
                <CredentialDisplay client_id={props.client_id} client_secret={props.client_secret}/>
                :
                <div className="mx-auto px-4 py-2 sm:px-6 md:px-8">
                  <p>You have not launched your token yet, please go to the Setup page on the right to launch your token.</p>  
                </div>
               }
                {/* /End replace */}
            </div>
            </div>
          </main>
        </div>
    )
}
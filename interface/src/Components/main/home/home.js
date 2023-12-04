import React from 'react';
import TokenDisplay from './tokenDisplay';
import { ChevronDownIcon } from '@heroicons/react/outline';

export default function Home(props) {
    return (
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
                <h1 className="text-3xl font-semibold text-gray-900">Home</h1>
                <button className='flex rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 '>
                  Actions (Coming Soon...)
                  <ChevronDownIcon className="-mr-2 ml-2 h-5 w-5" />
                </button>
              </div>
              {props.isTokenLaunched ?
              <div>
              <div className="mx-auto px-4 py-2 sm:px-6 md:px-8">
                {/* Replace with your content */}
                
                <a 
                  href={`https://rinkeby.etherscan.io/tx/${localStorage.getItem('txn_hash')}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className='font-medium no-underline hover:underline text-blue-700 hover:text-blue-600'
                  >
                    Confirm your Token Launch transaction on the blockchain here.</a>
                {/* /End replace */}
              </div>
              <TokenDisplay/>
              </div>
            :
            <div className="mx-auto px-4 py-2 sm:px-6 md:px-8">
              <p>You have not launched your token yet, please go to the Setup page on the right to launch your token.</p>  
            </div>}
            </div>
          </main>
        </div>
    )
}
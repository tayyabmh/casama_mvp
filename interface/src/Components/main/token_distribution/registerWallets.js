import React, { useState } from 'react';

export default function RegisterWallets(props) {
    const [ registering, setRegistering ] = useState(false);
    const [ userId, setUserId ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleRegister = async () => {
        setRegistering(true);
        await props.registerWallet(userId, email);
        setRegistering(false);
        setEmail('');
        setUserId('');
    }

    return (
        <div className='bg-white overflow-hidden shadow rounded-lg py-4 px-4'>
            <h1 className='text-lg text=gray-600 font-semibold'>
                Register Wallets
            </h1>
            <p className='text-gray-600 text-sm'>
                Create new user wallets to distribute tokens to.
            </p>
            <div>
            <form className='mt-4'>
                <div>
                    <label htmlFor='id' className='block text-sm font-medium leading-5 text-gray-700'>
                        User ID 
                    </label>
                    <div className='mt-1'>
                        <input
                            id='id'
                            name='id'
                            type='text'
                            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                            placeholder='User ID from your internal system'
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <div className='flex justify-between'>
                        <label htmlFor='email' className='block text-sm font-medium leading-5 text-gray-700'>
                            Email
                        </label>
                        <span className='text-sm font-medium leading-5 text-gray-500'>
                            Highly recommended
                        </span>
                    </div>
                    <div className='mt-1'>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                            placeholder='Email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
            </form> 
            </div>
            <div className="mt-4 py-3 sm:flex sm:flex-row-reverse">
                <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleRegister}
                    >
                        {registering ? 'Registering...' : 'Register'}
                    </button>
                </div>
        </div>
    );
}
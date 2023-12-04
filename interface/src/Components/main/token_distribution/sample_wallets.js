import React, { useState } from 'react';
import { getERC20BalanceForWallet } from '../../../utils/ERC20_functions';
import {
    RefreshIcon,
} from '@heroicons/react/outline';

export default function SampleWallets(props) {
    const [ tokenBalanceLoading, setTokenBalanceLoading ] = useState(false);


    const getTokenBalance = async (e, address) => {
        e.preventDefault();
        setTokenBalanceLoading(true);
        const balance = await getERC20BalanceForWallet(props.tokenContractAddress, address);
        const newArray = props.wallets.map(wallet => {
            if (wallet.address === address) {
                wallet.balance = balance;
            }
            return wallet;
        });
        props.setWallets([...newArray]);
        setTokenBalanceLoading(false);
    }

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg py-4 px-4">
            <div className="flex justify-between">
                <div>
                    <h2 className='text-lg text-gray-700 font-semibold'>
                        Wallets
                    </h2>
                </div>
                <div className='flex'>
                    <button
                        className="mr-3 justify-center inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <RefreshIcon className={`h-5 w-5 text-gray-700 ${tokenBalanceLoading ? 'animate-spin' : null}`} />
                    </button>
                    
                </div>
                
            </div>
            
            <div className="mt-2 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                                >
                                    Wallet Identifier
                                </th>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                                >
                                    Wallet Address
                                </th>
                                <th scope="col" className="py-3.5 px-3 text-center text-sm font-semibold text-gray-900">
                                    Token Balance
                                </th>
                                <th scope="col" className="py-3.5 px-3 text-center text-sm font-semibold text-gray-900">
                                    Actions
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.wallets.length > 0
                                    ?
                                    props.wallets.map((wallet, index) => {
                                        return(
                                            <tr key={index}>
                                                <td className="border-t-2 text-sm border-gray-200 text-center whitespace-no-wrap py-4 pl-4 pr-3">
                                                {
                                                (wallet.wallet_metadata.hasOwnProperty('email'))
                                                ? 
                                                wallet.wallet_metadata.email
                                                :
                                                ''
                                                }
                                                </td><td className="border-t-2 text-sm border-gray-200 text-center whitespace-no-wrap py-4 px-3">
                                                    {wallet.address}
                                                </td>
                                                <td className="border-t-2 text-sm border-gray-200 text-center whitespace-no-wrap py-4 px-3">
                                                    {wallet.balance}
                                                </td>
                                                <td className='border-t-2 text-sm border-gray-200 text-center whitespace-no-wrap py-4 px-3'>
                                                    <button className='text-indigo-600 hover:underline hover:text-indigo-900' onClick={(e) => {getTokenBalance(e, wallet.address)}}>
                                                        Get/Refresh Balance
                                                    </button>
                                                    <span>&nbsp; | &nbsp;</span>
                                                    <button className='text-indigo-600 hover:underline hover:text-indigo-900' onClick={(e) => props.handleSendTokensChange(e, wallet.address)}>
                                                        Send Tokens
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    
                                        (props.tableLoading === true)
                                        ?
                                        <tr>
                                            <td>Loading...</td>
                                        </tr>
                                        :
                                        <tr>
                                            <td>No Wallets found, begin with registering a wallet above.</td>
                                        </tr>
                                    
                                    }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
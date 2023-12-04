import React, {useState} from 'react';
import { PaperAirplaneIcon, RefreshIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import TokenSentSuccess from '../notifications/token_send_success';
import TokenSentFail from '../notifications/token_send_fail';

export default function SendTokens(props) {
    const { getAccessTokenSilently } = useAuth0();
    const [amount, setAmount ] = useState(0);
    const [ isSending, setIsSending ] = useState(false);
    const [ txn_hash, setTxn_hash ] = useState('');
    const [ showSuccessToast, setShowSuccessToast ] = useState(false);
    const [ showFailToast, setShowFailToast ] = useState(false);
    const [ message, setMessage ] = useState('');

    const sendTokens = async (e) => {
        e.preventDefault();
        setIsSending(true);
        const accessToken = await getAccessTokenSilently();
        axios.post(`${process.env.REACT_APP_API_URL}/token/distribute`, {
            toAddress: props.to,
            amount: amount,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        }).then(res => {
            setIsSending(false);
            setTxn_hash(res.data.transactionHash);
            setShowSuccessToast(true);
            setTimeout(() => {
                setShowSuccessToast(false)
            }, 5000)
            }).catch(err => {
            setIsSending(false);
            setMessage(err.response.data.message);
            setShowFailToast(true);
            setTimeout(() => {
                setShowFailToast(false)
            }, 5000);
        })
    }


    return (
        <div className="bg-white overflow-hidden shadow rounded-lg py-4 px-4">
            <h2 className='text-lg text-gray-700 font-semibold'>
                Send Tokens
            </h2>
            <form className='divide-y space-y-8 divide-gray-200'>
                <div className="divide-y space-y-8 divide-gray-200">
                    <div className="grid gap-4 grid-rows-2">
                        <div className='row-span-1'>
                            <label className='mt-2 block text-md font-medium text-gray-700'>
                                To
                            </label>
                            <p className='mt-1 text-sm text-gray-500'>
                                Who would you like to send the tokens to?
                            </p>
                            <input
                                type='text'
                                name='to'
                                id='to'
                                value={props.to}
                                disabled
                                readOnly
                                className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full bg-gray-100 min-w-0 hover:cursor-not-allowed rounded-none rounded-r-md sm:text-sm border-gray-300"
                            />
                        </div>
                        <div className='row-span-1'>
                            <label className='mt-2 block text-md font-medium text-gray-700'>
                                Amount
                            </label>
                            <p className='mt-1 text-sm text-gray-500'>
                                How many tokens would you like to send?
                            </p>
                            <input
                                type='number'
                                name='amount'
                                id='amount'
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                            />
                        </div>
                        <div className='grid grid-cols-3'>
                        <button 
                            className="justify-center col-start-3 inline-flex items-center px-2 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={sendTokens}    
                        >
                            {
                                isSending 
                                ?
                                <span className='flex'><RefreshIcon className='animate-spin h-5 w-5'/>&ensp; Sending...</span> 
                                :
                                <><PaperAirplaneIcon className='h-5 w-5 text-white' />
                                &ensp; Send Tokens</>
                            }
                                
                        </button>
                        </div>
                        
                    </div>
                </div>
            </form>
            {
                showSuccessToast
                ?
                <TokenSentSuccess showToast={showSuccessToast} txn_hash={txn_hash}/>
                :
                null
            }
            {
                showFailToast
                ?
                <TokenSentFail showToast={showFailToast} message={message}/>
                :
                null
            }
        </div>
    )
}
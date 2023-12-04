import React, { useEffect, useState } from 'react';
// import { useAccount } from 'wagmi';
import ConnectAlert from './connect_alert';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RefreshIcon } from '@heroicons/react/outline'

localStorage.removeItem('tokenCreated')

export default function Setup(props) {
  const navigate = useNavigate();

  const { user, getAccessTokenSilently } = useAuth0();
  const [ tokenName, setTokenName ] = useState('');
  const [ tokenSymbol, setTokenSymbol ] = useState('');
  const [ isDeploying, setIsDeploying ] = useState(false);
  // const account = useAccount();

  useEffect(() => {
    if(props.isTokenLaunched){
      (async() => {
        try {
          const accessToken = await getAccessTokenSilently();
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/token/config`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          })
          setTokenName(data.tokenName);
          setTokenSymbol(data.tokenSymbol);
        } catch(err) {
          console.log(err)
        }
      })();
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tokenName, tokenSymbol]);

  // TODO: not possible if you have a token already
  const handleTokenLaunchSubmit = async (e) => {
    e.preventDefault();
    setIsDeploying(true);
    const accessToken = await getAccessTokenSilently();

    axios.post(`${process.env.REACT_APP_API_URL}/token/launch`, {
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {      
      setIsDeploying(false);
      props.setIsTokenLaunched(true);
      navigate('/', { replace: true });
      localStorage.setItem('txn_hash', response.data.txn_hash);
      localStorage.setItem(`${user.nickname}tokenLaunched`, true);
    }).catch(error => {
      console.log(error)
    });
  }

    return (
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-semibold text-gray-900">Token Launch</h1>
                <p className='mt-1 text-sm text-gray-600'>
                  Let's create a token for your community or marketplace, but only launch in on testnet for now.
                </p>

              </div>
              
                <form className='space-y-8 divide-y divide-gray-200 px-4 sm:px-6 lg:px-8'>
                  
                  <div className='space-y-8 divide-y divide-gray-200'>
                    <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                    {props.isTokenLaunched ? 
              <div className="sm:col-span-4">
                <ConnectAlert/>
              </div> 
              :
              <></>}
                      <div className="sm:col-span-4">
                        <label htmlFor="TokenName" className="block text-sm font-medium leading-5 text-gray-700">
                          Token Name
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <input 
                            type='text'
                            disabled={props.isTokenLaunched}
                            name='TokenName'
                            value={tokenName}
                            onChange={(e) => setTokenName(e.target.value)}
                            id='TokenName'
                            className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded round-r-md sm:text-sm border-gray-300 disabled:bg-slate-50 disabled:text-slate-500 disabled::border-slate-200 disabled:shadow-none"
                            />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label htmlFor='ticker' className='block text-sm font-medium leading-5 text-gray-700'>
                          Token Symbol
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <input
                            type='text'
                            disabled={props.isTokenLaunched}
                            value={tokenSymbol}
                            onChange={(e) => setTokenSymbol(e.target.value)}
                            name='symbol'
                            id='symbol'
                            className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded round-r-md sm:text-sm border-gray-300 disabled:bg-slate-50 disabled:text-slate-500 disabled::border-slate-200 disabled:shadow-none"
                            />

                        </div>
                        <p className='mt-2 text-sm text-gray-500'>Selecting a ticker will help you identify your token on the blockchain.</p>
                      </div>
                      <div className="sm:col-span-4">
                        <label htmlFor='mintSupply' className='block text-sm font-medium leading-5 text-gray-700'>
                          Mint Supply (in tokens)
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                          <input
                            type='text'
                            name='ticker'
                            value="1,000,000,000,000"
                            id='ticker'
                            disabled
                            className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded round-r-md sm:text-sm border-gray-300 disabled:bg-slate-50 disabled:text-slate-500 disabled::border-slate-200 disabled:shadow-none"
                            />

                        </div>
                        <p className='mt-2 text-sm text-gray-500'>We currently only support a 1 billion fixed supply tokens launch.</p>
                      </div>
                      <div className="sm:col-span-4">
                        <button
                          type='submit'
                          className={`mt-6 w-full flex items-center justify-center px-4 py-2 text-base font-medium leading-6 ${props.isTokenLaunched ? 
                          "text-gray-700 bg-gray-300 border border-gray-400 rounded-md hover:cursor-not-allowed"
                          : 
                            "text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                          }`}
                          onClick={handleTokenLaunchSubmit}
                          disabled={isDeploying || props.isTokenLaunched }
                          >
                            {props.isTokenLaunched 
                              ? "Token Deployed" 
                              : 
                              isDeploying 
                                ? 
                                <span className='flex'><RefreshIcon className='animate-spin h-5 w-5'/>&ensp; Deploying...</span> 
                                : 
                                "Deploy Token"
                                }


                          {/* {isDeploying ? <span className='flex'><RefreshIcon className='animate-spin h-5 w-5'/>&ensp; Deploying...</span> : 'Deploy Token'} */}
                          </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
          </main>
        </div>
    )
}
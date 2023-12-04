import React, { useEffect, useState } from 'react';
import SendTokens from './send_tokens';
import SampleWallets from './sample_wallets';
import { useAuth0 } from '@auth0/auth0-react';
import { getTokenConfig } from '../../../utils/tokenConfig';
import RegisterWallets from './registerWallets';
import axios from 'axios';

export default function Tokens(props) {
  const {getAccessTokenSilently} = useAuth0();
  const [tokenContractAddress, setTokenContractAddress] = useState('');
  const [ wallets, setWallets ] = useState([]);
  const [ to, setTo ] = useState('');
  const [ tableLoading, setTableLoading ] = useState(false);
  const [ walletsNotFound, setWalletsNotFound ] = useState(false);

  useEffect(() => {
    (async () => {
      const access_token = await getAccessTokenSilently();
      const tokenConfig = await getTokenConfig(access_token);
      setTokenContractAddress(tokenConfig.data.tokenContractAddress);

    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenContractAddress]);

  // This gets all the wallets under this customer's account
  useEffect(() => {
    if (wallets.length <= 0 && walletsNotFound === false) {
    (async () => {
      setTableLoading(true);
      const access_token = await getAccessTokenSilently();
      await axios.get(`${process.env.REACT_APP_API_URL}/wallets/list`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.data.length === 0) {
          setWalletsNotFound(true);
        }
        const addBalance = response.data.map(wallet => {
          return {
            ...wallet,
            balance: 0
          }
        })
        setWallets([...wallets, ...addBalance]);
        setTableLoading(false);
      }).catch(error => {
        console.log(error);
      });
    })();
  }
  }, [setWallets, wallets, getAccessTokenSilently]);

  const registerWallet = async (id, email) => {
    const access_token = await getAccessTokenSilently();
    axios.post(`${process.env.REACT_APP_API_URL}/wallets`, {
      id,
      wallet_metadata: {
        email
      }
    }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setWalletsNotFound(false);
      const wallet = res.data.wallet;
      setWallets([...wallets, {
        ...wallet,
        balance: 0
    }]);
    }).catch(err => {
      console.log(err);
    });
  }

  const handleSendTokensChange = (e, walletAddress) => {
    e.preventDefault();
    setTo(walletAddress);
  }


    return(
      <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-3xl font-semibold text-gray-900">Tokens</h1>
                <p className='mt-1 text-md text-gray-500'>
                  Manage your token distributions through here.
                </p>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  {
                    props.isTokenLaunched
                    ?
                    <div className="grid gap-4 grid-rows-2">
                      <div className='grid row-span-1 gap-4 sm:grid-cols-2 grid-cols-1'>
                        <SendTokens to={to}/>
                        <RegisterWallets registerWallet={registerWallet} setWallets={setWallets}/>
                      </div>
                      <div className='grid'>
                        <SampleWallets  
                          wallets={wallets} 
                          tokenContractAddress={tokenContractAddress} 
                          setWallets={setWallets} 
                          handleSendTokensChange={handleSendTokensChange}
                          tableLoading={tableLoading}
                          />
                      </div>
                    </div>
                    :
                    <div className="mx-auto px-4 py-2 sm:px-6 md:px-8">
                      <p>You have not launched your token yet, please go to the Setup page on the right to launch your token.</p>  
                    </div>
                  }
                </div>
                {/* /End replace */}
              </div>
            </div>
            </main>
      </div>
    )
}
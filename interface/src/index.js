import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';


const { chains, provider } = configureChains(
  [chain.goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Casama App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});



const root = ReactDOM.createRoot(document.getElementById('root'));

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  }
  return (
    <Auth0Provider
      {...props}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
        audience={process.env.REACT_APP_AUTH0_AUDIENCE}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <App />
            </RainbowKitProvider>
        </WagmiConfig>
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

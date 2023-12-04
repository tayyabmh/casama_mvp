import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginPage from "./Components/auth/login";
import Nav from "./Components/main/nav";
import { Route, Routes } from 'react-router-dom';
import Setup from './Components/main/token_launch/setup';
import Wallets from './Components/main/wallets';
import Credentials from "./Components/main/credential_page/credential_page";
import Home from "./Components/main/home/home";
import Tokens from "./Components/main/token_distribution/Tokens";
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  const { isLoading, isAuthenticated, error, user, logout} = useAuth0();
  const [isTokenLaunched, setIsTokenLaunched] = useState(false);

  useEffect(() => {
    if(isAuthenticated) {
      setIsTokenLaunched(user['https://www.casama.xyz/tokenLaunched'] || localStorage.getItem(`${user.nickname}tokenLaunched`) === 'true');
      
      window.pendo.initialize({
        visitor: {
          id: user.sub,
          email: user.email,
        }
      })
      
    }
  }, [isAuthenticated,user]);


  if(isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Oops...{error.message}</div>
  }
  
  if (isAuthenticated) {

    return (
      <>
        <Nav user={user} logout={logout}/>
        {/* <ConnectBar/> */}
        <Routes>
          <Route path="/" element={<ProtectedRoute component={Home} isTokenLaunched={isTokenLaunched}  />} />
          <Route path="/setup" element={<ProtectedRoute component={Setup} isTokenLaunched={isTokenLaunched} setIsTokenLaunched={setIsTokenLaunched} />} />
          <Route path="/wallets" element={<ProtectedRoute component={Wallets} />} />
          <Route path="/credentials" element={<ProtectedRoute component={Credentials} isTokenLaunched={isTokenLaunched} />} />
          <Route path="/tokens" element={<ProtectedRoute component={Tokens} isTokenLaunched={isTokenLaunched}/>} />
        </Routes>
      </>
    )
  } else {
    return <LoginPage/>
  }
}

export default App;
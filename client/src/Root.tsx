import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  Route, Routes, useLocation, useNavigate, useSearchParams,
} from 'react-router-dom';
import fetchAuthorizeUser from './api/userApi';
import AppBar from './components/AppBar';
import Login from './components/login/Login';
import RepositoriesView from './components/repositories/RepositoriesView';
import RepositoryView from './components/repositories/RepositoryView';
import UserContext from './context/UserContext';
import User from './utilities/types/User';

function Root() {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  useEffect(() => {
    const loadUser = async (code: string) => {
      if (code) {
        try {
          navigate('/');
          const userValue = await fetchAuthorizeUser(code) as User;
          sessionStorage.setItem('user', JSON.stringify(userValue));
          setUser(userValue);
        } catch (error) {
          // TODO: Later.
        }
      }
    };

    // Check for user in ource session storage;
    const userStringValue = sessionStorage.getItem('user');
    if (userStringValue) {
      const userValue = JSON.parse(userStringValue) as User;
      setUser(userValue);
    } else if (location.pathname === '/login') {
      const code = params.get('code') as string;
      loadUser(code);
    } else {
      navigate('/login');
    }
  }, []);

  return (
    // Needs to be loaded from sessionStore!
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ user, setUser }}>
      <>
        <AppBar />
        <Box as="main" h="93vh" mt="7vh">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RepositoriesView />} />
            <Route path="/repositories/:owner/:repo" element={<RepositoryView />} />
          </Routes>
        </Box>
      </>
    </UserContext.Provider>
  );
}

export default Root;

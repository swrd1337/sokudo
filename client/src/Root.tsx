import { Box, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  Route, Routes, useLocation, useNavigate, useSearchParams,
} from 'react-router-dom';
import { fetchAuthorizeUser } from './api/userApi';
import AppBar from './components/AppBar';
import PageNotFound from './components/errors/PageNotFound';
import Login from './components/login/Login';
import RepositoriesView from './components/repositories/RepositoriesView';
import RepositoryView from './components/repositories/RepositoryView';
import TaskView from './components/repositories/tasks/TaskView';
import UserContext from './context/UserContext';
import User from './utilities/types/User';

function Root() {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const toast = useToast();

  useEffect(() => {
    const loadUser = async (code: string) => {
      if (code) {
        try {
          navigate('/');
          const userValue = await fetchAuthorizeUser(code) as User;
          localStorage.setItem('user', JSON.stringify(userValue));
          setUser(userValue);
          toast({
            title: `Welcome, ${userValue.name}! 🎉🎉🎉`,
            status: 'success',
            duration: 9000,
            position: 'bottom-right',
            isClosable: true,
          });
        } catch (error) {
          // TODO: Later.
        }
      }
    };

    // Check for user in our session storage;
    const userStringValue = localStorage.getItem('user');
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
            <Route path="/tasks/:taskId" element={<TaskView />} />
            <Route path="/repositories/:owner/:repo" element={<RepositoryView />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Box>
      </>
    </UserContext.Provider>
  );
}

export default Root;

import {
  Flex, Heading, HStack,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';
import UserComponent from './user/UserComponent';

function AppBar() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  return (
    <Flex
      as="header"
      position="fixed"
      bg="gray.900"
      h="7vh"
      zIndex={1337}
      top="0"
      boxShadow="outline"
      width="100%"
    >
      <HStack
        spacing="5px"
        justifyContent="space-between"
        mr="1em"
        ml="1em"
        width="100%"
      >
        <Heading color="whiteAlpha.900" size="lg">
          <Link to={user ? '/' : '/login'}>
            Sokudo 👹
          </Link>
        </Heading>
        {location.pathname !== '/login' && (
          <UserComponent user={user} setUser={setUser} />
        )}
      </HStack>
    </Flex>
  );
}

export default AppBar;

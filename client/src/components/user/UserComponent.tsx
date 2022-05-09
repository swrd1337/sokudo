import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar, Box, Button, Link, Menu, MenuButton, MenuItem, MenuList, Skeleton, useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogout } from '../../api/userApi';
import User from '../../utilities/types/User';

type Props = {
  user: User | undefined,
  // eslint-disable-next-line no-unused-vars
  setUser: (value: User | undefined) => void
}

function UserComponent({ user, setUser }: Props) {
  const navigate = useNavigate();
  const toast = useToast();

  const onLogout = async () => {
    const logoutSuccess = await fetchLogout();
    if (logoutSuccess) {
      toast({
        title: 'Succesfull logout!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
    localStorage.removeItem('user');
    navigate('/login');
    setUser(undefined);
  };

  return (
    <Skeleton isLoaded={Boolean(user)}>
      <Box display="flex" alignItems="center">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={4}>
            {`Hello, ${user?.username}!`}
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link href={user?.pageUrl}>GitHub Profile</Link>
            </MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
        <Avatar src={user?.avatarUrl} size="md" />
      </Box>
      {/* <Button */}
    </Skeleton>
  );
}

export default UserComponent;

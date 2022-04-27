import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar, Box, Button, Link, Menu, MenuButton, MenuItem, MenuList, Skeleton,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../utilities/User';

type Props = {
  user: User | undefined,
  // eslint-disable-next-line no-unused-vars
  setUser: (value: User | undefined) => void
}

function UserComponent({ user, setUser }: Props) {
  const navigate = useNavigate();

  const onLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
    setUser(undefined);
  };

  return (
    <Skeleton isLoaded={Boolean(user)}>
      <Box display="flex" alignItems="center">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr="1em">
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
    </Skeleton>
  );
}

export default UserComponent;

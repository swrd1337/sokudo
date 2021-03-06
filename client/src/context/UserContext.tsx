import React from 'react';
import User from '../utilities/types/User';

interface UserContextInterface {
  user?: User
  setUser(_user: User | undefined): void
}

const contextDefaultValue: UserContextInterface = {
  user: undefined,
  setUser: () => {},
};

const UserContext = React.createContext<UserContextInterface>(contextDefaultValue);

export default UserContext;

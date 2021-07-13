import React, {useState} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface IAuthContext {
  activeUser: FirebaseAuthTypes.User | undefined;
  setActiveUser: (user: FirebaseAuthTypes.User) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  setActiveUser: () => null,
  activeUser: undefined,
});

const AuthProvider: React.FC = ({children}) => {
  const [activeUser, setActiveUser] = useState<FirebaseAuthTypes.User>();

  return (
    <AuthContext.Provider value={{activeUser, setActiveUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React, { createContext, useState, useEffect, useContext } from 'react';

import Storage from 'providers/Storage';
import api from 'services/api';

const AuthConxtex = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await Storage.getItem(Storage.userKey); // .then(setUser);
      const storagedToken = await Storage.getItem(Storage.tokenKey);

      if (storagedUser && storagedToken) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
      setUser(storagedUser);
    }

    loadStoragedData();
  }, []);

  async function setToken(token, refreshToken) {
    await Storage.setItem(Storage.tokenKey, token);
    await Storage.setItem(Storage.refreshTokenKey, refreshToken);
  }

  async function setAuthUser(user) {
    await Storage.setItem(Storage.userKey, user);
    setUser(user);
  }

  return (
    <AuthConxtex.Provider value={{ user, setUser, setToken, setAuthUser }}>
      {children}
    </AuthConxtex.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthConxtex);

  return context;
}

import Router from 'next/router';
import { mutate, trigger } from 'swr';
import storage from '../utils/storage';

const AuthAPI = {
  signOut: async () => {
    const user: any = await storage(authCucur);
    const token = user?.accessToken;
    console.log(']-----] AuthAPI::apply.token [-----[', token);
    try {
      window.localStorage.removeItem(authCucur);
      mutate(authCucur, null);
      Router.push(`/`).then(() => trigger(authCucur));
    } catch (error) {
      return error.response;
    }
  },
};

export default AuthAPI;
export const authCucur = 'authCucur';

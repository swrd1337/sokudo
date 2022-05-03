import User from '../utilities/types/User';

const oatuhProxyUrl = import.meta.env.VITE_OAUTH_PROXY_URL;

async function fetchAuthorizeUser(code: string): Promise<User> {
  const response: Response = await fetch(`${oatuhProxyUrl}/${code}`);
  return response.json();
}

async function fetchLogout(): Promise<boolean> {
  const response: Response = await fetch(`${oatuhProxyUrl}/logout`);
  return response.ok;
}

export { fetchAuthorizeUser, fetchLogout };

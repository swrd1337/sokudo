import User from '../utilities/types/User';

const oatuhProxyUrl = import.meta.env.VITE_OAUTH_PROXY_URL;

async function fetchAuthorizeUser(code: string): Promise<User> {
  const response: Response = await fetch(`${oatuhProxyUrl}/${code}`);
  return response.json();
}

export default fetchAuthorizeUser;

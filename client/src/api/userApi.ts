import User from '../utilities/User';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchAuthorizeUser(code: string): Promise<User> {
  const response: Response = await fetch(`${apiBaseUrl}/proxy/oauth/${code}`);
  return await response.json() as Promise<User>;
}

export default fetchAuthorizeUser;

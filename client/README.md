# 👹 Sokudo Client

## Built With

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Chakra UI](https://chakra-ui.com/)

For more details check `package.json`.

## Prerequisites

* NodeJS 16.6+
* NPM 7.20+

## Installation

1. Go to the `client` folder.
1. Run `npm install`.
1. Create `.env` file.
1. Open the created file with your favorite editor.
1. Define the following variables:
```bash
VITE_GH_AUTHORIZE_URL=https://github.com/login/oauth/authorize
VITE_GH_CLIENT_ID=<github-apps-client-id> # Generated from GitHub Apps.
VITE_API_BASE_URL=http://<server-host>:<server-port>/api
VITE_OAUTH_PROXY_URL=http://<server-host>:<server-port>/proxy/oauth
```
6. Save the file.
1. Run application with `npx vite --port=<port>`.

## License
[GPL3](../LICENSE)


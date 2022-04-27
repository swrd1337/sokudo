import {
  Button, Center, Heading, Image, Link, Stack, Text, Wrap, WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import GitHubLogo from '../../resources/githubIcon.svg';

function Login() {
  const authorizeUrl = import.meta.env.VITE_GH_AUTHORIZE_URL;
  const clientId = import.meta.env.VITE_GH_CLIENT_ID;

  return (
    <Center h="2xl">
      <Stack spacing={3}>
        <Heading color="whiteAlpha.800">Welcome to Sokudo!</Heading>
        <Text color="whiteAlpha.700">
          Agile project management application powered by GitHub API.
        </Text>
        <Link href={`${authorizeUrl}?scope=user&client_id=${clientId}`}>
          <Button size="lg">
            <Wrap>
              <WrapItem>
                <Image src={GitHubLogo} alt="GitHub Logo" h="30" />
              </WrapItem>
              <WrapItem alignItems="center">
                <Text>Login with GitHub</Text>
              </WrapItem>
            </Wrap>
          </Button>
        </Link>
      </Stack>
    </Center>
  );
}

export default Login;

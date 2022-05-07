import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Avatar, Badge, Box, Button, Divider, Heading, HStack, Link, Text, VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Repository from '../../utilities/types/Repository';

type Props = {
  repository: Repository
}

function RepositoryCard({ repository }: Props) {
  const { owner } = repository;
  const navigate = useNavigate();

  const onOpenClick = () => {
    navigate(`/repositories/${owner.login}/${repository.name}/?tab=0`);
  };

  return (
    <Box maxW="lg" borderWidth="1px" borderRadius="lg" bgColor="gray.700" boxShadow="dark-sm">
      <Box p="5" display="flex" flexDirection="column" h="100%">
        <HStack justifyContent="space-between" pb={4}>
          <Heading as="h4" size="md" wordBreak="break-all">
            {repository.name}
          </Heading>
          <HStack>
            <Badge borderRadius="full" px="2" colorScheme={repository.visibility === 'private' ? 'red' : 'teal'}>
              {repository.visibility}
            </Badge>
            {repository.fork && (
              <Badge borderRadius="full" px="2" colorScheme="teal">
                Fork
              </Badge>
            )}
          </HStack>
        </HStack>
        <Divider mt="1" mb="1" />
        <VStack alignItems="flex-start">
          <Box mb="1">
            <Text color="gray.400" fontWeight="semibold">{repository?.description ?? 'No description.'}</Text>
          </Box>
          <Box w="100%" display="flex">
            <Text color="purple.300" fontWeight="semibold" mr="2">Default branch:</Text>
            <Text
              color="gray.400"
              fontWeight="semibold"
              overflow="hidden"
              textOverflow="ellipsis"
              maxW="11rem"
              whiteSpace="nowrap"
            >
              {repository.defaultBranch}
            </Text>
          </Box>
          <Box w="100%" display="flex">
            <Text color="purple.300" fontWeight="semibold" mr="2">Programming language:</Text>
            <Text color="gray.400" fontWeight="semibold">{repository?.language ?? 'Empty'}</Text>
          </Box>
          <Box w="100%" display="flex">
            <Link href={repository.htmlUrl} target="_blank" color="cyan.500" fontWeight="semibold" mr="2">
              GitHub URL
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        </VStack>
        <Box w="100%" display="flex" justifyContent="flex-end" mt="auto" flexDirection="column">
          <Divider mt="1" mb="1" />
          <Box display="flex" justifyContent="space-between" alignItems="center" pt={4}>
            <Button colorScheme="teal" variant="outline" onClick={onOpenClick}>Open</Button>
            <HStack>
              <Link href={owner.htmlUrl} target="_blank" color="cyan.500" fontWeight="semibold">{owner.login}</Link>
              <Avatar src={owner.avatarUrl} size="sm" />
            </HStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RepositoryCard;

import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import dedent from 'endent';
import { getTimeFormattedString } from '../../../utilities/dateTime';
import PullRequest from '../../../utilities/types/PullRequest';

type Props = {
  pullRequest: PullRequest
  onCreate(_t: string, _d: string): void,
}

function PullRequestCard({ pullRequest, onCreate }: Props) {
  const { user } = pullRequest;

  const handleOnCreate = () => {
    const desc = dedent`
    **${pullRequest.title}**

    ---

    State: **${pullRequest.state}**

    By: **${user.login}**

    **[GitHub URL](${pullRequest.htmlUrl})** 

    Since: **${getTimeFormattedString(pullRequest.createdAt)}**

    From: *Pull Requests*
  `;
    onCreate(pullRequest.title, desc);
  };

  return (
    <Box
      w={{ sm: '100%', xl: '60%' }}
      borderWidth="2px"
      borderRadius="lg"
      bgColor="whiteAlpha.50"
      boxShadow="dark-sm"
      display="flex"
      flexDir="column"
    >
      <HStack justifyContent="space-between" p={3}>
        <Heading
          as="h4"
          size="md"
          lineHeight="inherit"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          color="cyan.200"
        >
          {pullRequest.title}
        </Heading>
        <Badge px={3} borderRadius="full" colorScheme="teal" variant="solid">
          {pullRequest.state}
        </Badge>
      </HStack>
      <Divider />
      <Stack py={2} px={3} h="100%" justifyContent="space-between">
        <Box w="100%" display="flex">
          <Text color="teal.300" fontWeight="semibold" mr="2">
            Since:
          </Text>
          <Text color="gray.300" fontStyle="italic">
            {getTimeFormattedString(pullRequest.createdAt)}
          </Text>
        </Box>
        <Box w="100%" display="flex">
          <Text color="teal.300" fontWeight="semibold" mr="2">
            Commit SHA:
          </Text>
          <Text color="gray.300" fontStyle="italic">
            {pullRequest.mergeCommitSha}
          </Text>
        </Box>
        <Divider />
        <Box w="100%" display="flex" flexDir="column">
          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton>
                <Text color="blue.200" fontWeight="semibold" mr="2">
                  Description body
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Box p={5} color="gray.300" maxH="25rem" overflow="auto">
                  {/* eslint-disable-next-line react/no-danger */}
                  <div dangerouslySetInnerHTML={{ __html: pullRequest.body }} />
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <Divider />
        <Box w="100%" display="flex">
          <Link
            href={pullRequest.htmlUrl}
            target="_blank"
            color="cyan.500"
            fontWeight="semibold"
            mr="2"
          >
            GitHub URL
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>
        <Divider />
        <Box w="100%" display="flex" justifyContent="space-between" pb={2}>
          <HStack>
            <Avatar src={user.avatarUrl} size="sm" />
            <Link
              href={user.htmlUrl}
              target="_blank"
              color="cyan.500"
              fontWeight="semibold"
            >
              {user.login}
            </Link>
          </HStack>
          <Button variant="outline" colorScheme="purple" size="sm" onClick={handleOnCreate}>
            Create task
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default PullRequestCard;

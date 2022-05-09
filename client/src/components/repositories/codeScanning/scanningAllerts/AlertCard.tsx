import {
  Badge, Box, Button, Code, Divider, Heading, HStack, Stack, Text,
} from '@chakra-ui/react';
import React from 'react';
import dedent from 'endent';
import CodeScanningAlert from '../../../../utilities/types/security/CodeScanningAlert';
import { getTimeFormattedString } from '../../../../utilities/dateTime';

type Props = {
  item: CodeScanningAlert,
  onCreate(_t: string, _d: string): void,
}

function AlertCard({ item, onCreate }: Props) {
  const {
    rule, state, createdAt, mostRecentInstance,
  } = item;
  const { location, commitSha } = mostRecentInstance;

  const onCreateHandler = () => {
    const desc = dedent`
      **${rule.description}**

      ---

      \`\`\`
      ${location.path}
      \`\`\`
      Start: **${location.startLine}**

      End: **${location.endLine}**

      Commit **SHA: ${commitSha}**

      Since: **${getTimeFormattedString(createdAt)}**

      From: *Code scanning*
    `;
    onCreate(rule.name, desc);
  };

  return (
    <Box
      w="md"
      borderWidth="2px"
      borderRadius="lg"
      bgColor="whiteAlpha.50"
      boxShadow="dark-sm"
      display="flex"
      flexDir="column"
    >
      <HStack justifyContent="space-between" p={3}>
        <Heading as="h4" size="md" lineHeight="inherit">
          {rule.name}
        </Heading>
        <Badge
          px={3}
          borderRadius="full"
          colorScheme="purple"
          variant="solid"
        >
          {state}
        </Badge>
      </HStack>
      <Divider />
      <Stack py={1} px={3} justifyContent="space-between">
        <Box w="100%" display="flex">
          <Text color="teal.300" fontWeight="semibold" mr="2">Since:</Text>
          <Text color="gray.300" fontStyle="italic">
            {getTimeFormattedString(createdAt)}
          </Text>
        </Box>
        <Divider />
        <Box w="100%" display="flex">
          <Text color="purple.300" fontWeight="semibold" mr="2">
            Severity:
          </Text>
          <Text
            color="red.200"
            fontWeight="semibold"
            overflow="hidden"
            textOverflow="ellipsis"
            maxW="11rem"
            whiteSpace="nowrap"
          >
            {rule.severity.toUpperCase()}
          </Text>
        </Box>
        <Box w="100%" display="flex">
          <Text color="purple.300" fontWeight="semibold" mr="2">
            Security level:
          </Text>
          <Text color="red.200" fontWeight="semibold">
            {rule.securitySeverityLevel.toUpperCase()}
          </Text>
        </Box>
        <Box w="100%" display="flex">
          <Text color="purple.300" fontWeight="semibold" mr="2">
            Description:
          </Text>
          <Text color="gray.400" fontWeight="semibold">
            {rule.description}
          </Text>
        </Box>
        <Divider />
        <Box w="100%" display="flex">
          <Text color="green.300" fontWeight="semibold" mr="2">
            Location:
          </Text>
          <Code color="gray.100" fontWeight="semibold">
            {`${location.path}, ${location.startLine}-${location.endLine}`}
          </Code>
        </Box>
        <Box w="100%" display="flex">
          <Text color="green.300" fontWeight="semibold" mr="2">Commit:</Text>
          <Text color="gray.300" fontStyle="italic">
            {commitSha}
          </Text>
        </Box>
        <Divider />
        <Box w="100%" display="flex" justifyContent="end" pb={2}>
          <Button variant="outline" colorScheme="cyan" onClick={onCreateHandler} size="sm">
            Create task
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default AlertCard;

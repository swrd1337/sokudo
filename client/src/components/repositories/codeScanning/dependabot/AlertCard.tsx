import {
  Badge, Box, Button, Divider, Heading, HStack, Stack, Text,
} from '@chakra-ui/react';
import React from 'react';
import dedent from 'endent';
import { getTimeFormattedString } from '../../../../utilities/dateTime';
import DependabotNode from '../../../../utilities/types/security/DependabotNode';

type Props = {
  item: DependabotNode,
  onCreate(_t: string, _d: string): void,
}

function AlertCard({ item, onCreate }: Props) {
  const { createdAt, securityVulnerability } = item;
  const { advisory } = securityVulnerability;

  const onCreateHandler = () => {
    const desc = dedent`
      ### ${advisory.summary}

      ---

      Pacakge: **${securityVulnerability.package.name}**
      CVSS Score: **${advisory.cvss.score}**

      Description:
      
      ${advisory.description}

      From: *Code scanning*
    `;
    onCreate(advisory.summary, desc);
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
        <Heading as="h4" size="md" lineHeight="inherit" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {advisory.summary}
        </Heading>
        { advisory.cvss.score && (
          <Badge
            px={3}
            borderRadius="full"
            colorScheme="purple"
            variant="solid"
          >
            {`CVSS Score: ${advisory.cvss.score}`}
          </Badge>
        )}
      </HStack>
      <Divider />
      <Stack py={2} px={3} h="100%" justifyContent="space-between">
        <Box w="100%" display="flex">
          <Text color="teal.300" fontWeight="semibold" mr="2">Since:</Text>
          <Text color="gray.300" fontStyle="italic">
            {getTimeFormattedString(createdAt)}
          </Text>
        </Box>
        <Box w="100%" display="flex">
          <Text color="teal.300" fontWeight="semibold" mr="2">Summary:</Text>
          <Text color="gray.300">
            {advisory.summary}
          </Text>
        </Box>
        <Divider />
        <Box w="100%" display="flex">
          <Text color="purple.300" fontWeight="semibold" mr="2">Package:</Text>
          <Text color="gray.300">
            {securityVulnerability.package.name}
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

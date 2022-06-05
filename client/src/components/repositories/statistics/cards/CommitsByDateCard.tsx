import {
  Box, Heading,
} from '@chakra-ui/react';
import React from 'react';
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import CommitsBy from '../../../../utilities/types/statistics/CommitsBy';
import CommitsRechartTooltip from '../tooltip/CommitsRechartTooltip';

type Props = {
  commitsByDate: CommitsBy[]
}

function CommitsByDateCard({ commitsByDate }: Props) {
  return (
    <Box
      bgColor="gray.700"
      border="2px solid"
      borderColor="gray.600"
      borderRadius="lg"
      w="100%"
      minH="12em"
    >
      <Heading
        variant="h4"
        size="md"
        p={5}
        borderBottom="1px solid"
        borderColor="gray.600"
        color="blue.200"
      >
        Commits by date:
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={commitsByDate}
          margin={{
            top: 20,
            right: 50,
            left: 20,
            bottom: 10,
          }}
        >
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip content={<CommitsRechartTooltip />} />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default CommitsByDateCard;

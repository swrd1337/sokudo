import {
  Box, Heading,
} from '@chakra-ui/react';
import React from 'react';
import {
  Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import CommitsBy from '../../../../utilities/types/statistics/CommitsBy';
import CommitsRechartTooltip from '../tooltip/CommitsRechartTooltip';

type Props = {
  commitsByUser: CommitsBy[]
}

const COLORS = ['#FC8181', '#68D391', '#63b3ed', '#F687B3'];

function CommitsByUserCard({ commitsByUser }: Props) {
  return (
    <Box
      bgColor="gray.700"
      border="2px solid"
      borderColor="gray.600"
      borderRadius="lg"
      w="100%"
      pb={3}
    >
      <Heading
        variant="h4"
        size="md"
        p={5}
        borderBottom="1px solid"
        borderColor="gray.600"
        color="pink.200"
      >
        Commits by user:
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={commitsByUser}
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
          <Bar dataKey="count">
            {commitsByUser.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default CommitsByUserCard;

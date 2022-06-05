import {
  Box, Heading,
} from '@chakra-ui/react';
import React from 'react';
import {
  Area, Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import BoardStatistics from '../../../../utilities/types/statistics/BoardStatistics';
import TooltipContainer from '../tooltip/TooltipContainer';

type Props = {
  boardStats: BoardStatistics[]
}

function RechartTooltip({ active, payload } : any) {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <p>{`${payload[0].value} task(s)`}</p>
        <p>{`${payload[1].value} comment(s)`}</p>
      </TooltipContainer>
    );
  }
  return null;
}

function BoardsDataCard({ boardStats }: Props) {
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
        color="green.200"
      >
        Tasks and Comments:
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={boardStats}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="boardName" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip content={<RechartTooltip />} />
          <Legend />
          <Bar dataKey="tasksCount" name="Tasks" barSize={20} fill="#9AE6B4" />
          <Area type="monotone" name="Comments" dataKey="commentsCount" stroke="#FBB6CE" />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default BoardsDataCard;

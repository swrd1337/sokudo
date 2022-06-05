import {
  Box, Heading,
} from '@chakra-ui/react';
import React from 'react';
import {
  Legend, Pie, PieChart, ResponsiveContainer, Tooltip,
} from 'recharts';
import MdStatistics from '../../../../utilities/types/statistics/MdStatistics';
import NoItemsMessage from '../../../common/NoItemsMessage';
import TooltipContainer from '../tooltip/TooltipContainer';

type Props = {
  mdsStats: MdStatistics[]
}

function RechartTooltip({ active, payload } : any) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <TooltipContainer>
        <p>{`${data.value} note(s) by ${data.payload.authorName}`}</p>
      </TooltipContainer>
    );
  }
  return null;
}

function MarkdownsDataCard({ mdsStats }: Props) {
  return (
    <Box
      bgColor="gray.700"
      border="2px solid"
      borderColor="gray.600"
      borderRadius="lg"
      w="50%"
      pb={3}
    >
      <Heading
        variant="h4"
        size="md"
        p={5}
        borderBottom="1px solid"
        borderColor="gray.600"
        color="blue.200"
      >
        Markdown notes:
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        {mdsStats.length ? (
          <PieChart>
            <Tooltip content={<RechartTooltip />} />
            <Legend />
            <Pie
              data={mdsStats}
              dataKey="mdsCount"
              cx="50%"
              cy="50%"
              fill="#D6BCFA"
              innerRadius={30}
              outerRadius={100}
              label
              name="Notes per author"
            />
          </PieChart>
        ) : (
          <Box p={6}>
            <NoItemsMessage message="No markdown notes found on this project... 😓" />
          </Box>
        )}
      </ResponsiveContainer>
    </Box>
  );
}

export default MarkdownsDataCard;

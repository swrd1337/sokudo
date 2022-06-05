import React from 'react';
import TooltipContainer from './TooltipContainer';

function CommitsRechartTooltip({ active, payload } : any) {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <p>{`${payload[0].value} commits`}</p>
      </TooltipContainer>
    );
  }
  return null;
}

export default CommitsRechartTooltip;

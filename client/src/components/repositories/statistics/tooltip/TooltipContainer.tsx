import React from 'react';

function TooltipContainer({ children } : any) {
  return (
    <div
      style={{
        backgroundColor: '#4A5568',
        border: '2px solid #718096',
        borderRadius: '18px',
        padding: '2px 10px',
      }}
    >
      {children}
    </div>
  );
}

export default TooltipContainer;

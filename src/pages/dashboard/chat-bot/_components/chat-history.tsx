import { Box, Collapse } from '@mui/material';
import { useChatbotContext } from '..';
import { useEffect } from 'react';
export default function ChatbotHistory() {
  const { openHistory } = useChatbotContext();
  return (
    <Collapse
      in={openHistory}
      orientation={'horizontal'}
      sx={{
        position: 'absolute',
        right: 0,
        top: 0,
        '&,>*': { height: '100%' },
      }}
    >
      <Box
        sx={{
          bgcolor: 'black',
          height: '100%',
          width: '250px',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid #6d6d70',
        }}
      ></Box>
    </Collapse>
  );
}

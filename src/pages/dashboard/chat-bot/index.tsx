/* eslint-disable react-refresh/only-export-components */
import { Box, Typography } from '@mui/material';
import { useAppContext } from '../../../context/app-context/app-contex';
import ChatbotHistory from './_components/chat-history';
import { createContext, useContext, useEffect, useState } from 'react';

interface ChatbotParam {
  openHistory: boolean;
  setOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatbotContext = createContext<ChatbotParam>({
  openHistory: false,
  setOpenHistory: () => {},
});

export const useChatbotContext = () => useContext(ChatbotContext);
export default function ChatbotPage() {
  const { isMobile } = useAppContext();
  const [openHistory, setOpenHistory] = useState<boolean>(!isMobile);

  useEffect(() => {
    console.log(isMobile);

    setOpenHistory(!isMobile);
  }, [isMobile]);
  return (
    <ChatbotContext.Provider value={{ openHistory, setOpenHistory }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: '100%',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            paddingX: '32px',
            '> *': {
              minWidth: '330px',
              maxWidth: '660px',
              width: '100%',
            },
          }}
        >
          <Box sx={{ bgcolor: 'red', flex: 1 }}></Box>
          <Box
            sx={{ bgcolor: '#282a2c', height: '60px', borderRadius: '30px' }}
          ></Box>
        </Box>
        <Box width={isMobile ? '0px' : '250px'} />
        <ChatbotHistory />
      </Box>
    </ChatbotContext.Provider>
  );
}

import { Box, Button, Typography } from '@mui/material';
import CenterBox from '../../../../components/common/center-box';
import HighlightImage from './highlight-img';
import { useAppContext } from '../../../../context/app-context/app-contex';

export default function HightlightTool() {
  const { isMobile } = useAppContext();
  return (
    <Box
      sx={{
        mt: '40px',
        padding: '20px',
        borderRadius: '8px',
        bgcolor: '#414550',
        display: 'flex',
        // minWidth: '376px',
        ...(isMobile
          ? {
              height: 'auto',
              '> *': {
                width: '100%',
                textAlign: 'center',
              },
            }
          : {
              height: '340px',
              //   '> *': {
              //     width: '50%',
              //   },
            }),
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          width: isMobile ? '100%' : '40%',
          display: 'flex',
          flexDirection: 'column',
          '> *': {
            color: 'white',
          },
          gap: '.5rem',
          ...(isMobile ? {} : { mr: '84px' }),
        }}
      >
        <Typography sx={{ fontSize: '32px', fontWeight: 600 }}>
          This is hightlight tool header
        </Typography>
        <Typography sx={{ fontSize: '20px' }}>
          This is hightlight tool subheader
        </Typography>
        <Box sx={{ ...(isMobile ? { padding: '1rem' } : {}), flex: 1 }}>
          {isMobile && <HighlightImage />}
        </Box>
        <CenterBox
          sx={{
            gap: '.5rem',
            justifyContent: isMobile ? 'center' : 'start',
            '> *': {
              height: '44px',
              gap: '.5rem',
              width: '150px',
              fontSize: '16px !important',
              fontWeight: '600 !important',
              borderRadius: '22px !important',
            },
          }}
        >
          <Button
            sx={{
              bgcolor: '#e52c96',
              color: 'white',
              '&:hover': {
                bgcolor: '#a01f69',
              },
            }}
          >
            1
          </Button>
          <Button
            sx={{
              bgcolor: 'white',
              color: 'black',
              '&:hover': {
                bgcolor: 'rgb(200,200,200)',
              },
            }}
          >
            2
          </Button>
        </CenterBox>
      </Box>
      {!isMobile && (
        <CenterBox
          sx={{
            width: '60%',
          }}
        >
          <HighlightImage />
        </CenterBox>
      )}
    </Box>
  );
}

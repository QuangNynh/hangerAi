import { Box, Typography } from '@mui/material';
import { SearchParamObj } from '../../services/apis/get-search-param';
import { useNavigate } from 'react-router';
import { FiLock } from 'react-icons/fi';

export default function DashboardSearchElement({
  data,
}: {
  data: SearchParamObj;
}) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        paddingY: '.5rem',
        paddingX: '1rem',
        position: 'relative',
      }}
    >
      {data.img && (
        <Box
          sx={{
            img: {
              objectFit: 'cover',
              width: '72px',
              height: '48px',
              mr: '1rem',
            },
          }}
        >
          <img src={data.img} />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          textOverflow: 'ellipsis',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {data.title}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...(data.isLock
            ? { bgcolor: 'rgba(0,0,0,.6)' }
            : {
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,.1)',
                },
              }),
          '*': {
            color: 'white !important',
          },
        }}
        onClick={() => {
          if (data.isLock) {
            window.dispatchEvent(new CustomEvent('Test', { detail: {} }));
          } else {
            navigate(data.link);
          }
        }}
      >
        {data.isLock && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              svg: {
                fontSize: '1.5rem',
              },
            }}
          >
            <Typography mr={'.5rem'}>Locked Feature</Typography>
            <FiLock />
          </Box>
        )}
      </Box>
    </Box>
  );
}

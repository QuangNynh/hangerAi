import { Box, Typography } from '@mui/material';
import { useAppContext } from '../../../context/app-context/app-contex';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import GeneralTab from './_components/general';
import SecurityTab from './_components/security';

export default function DashboardAccount() {
  const { isMobile, commonStyle } = useAppContext();
  const tabList = ['General', 'Security', 'My Plan', 'Support'];
  const [parrams] = useSearchParams();
  const navigate = useNavigate();
  const currentTab = useMemo(() => {
    const tmp = parseInt(parrams.get('tab') ?? '');
    return isNaN(tmp) ? 0 : tmp;
  }, [parrams]);
  return (
    <Box sx={{ padding: '1.5rem' }}>
      <Typography sx={{ color: commonStyle.color_pr, fontSize: '1.5rem' }}>
        My Account
      </Typography>
      <Box
        sx={{
          display: 'flex',
          maxWidth: '400px',
          width: '100%',
          // height: '1rem',
        }}
      >
        {tabList.map((tab, index) => (
          <Box
            key={`account_tab_${index}`}
            sx={{
              mr: '2rem',
              maxWidth: '100px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              height: '3rem',
              cursor: 'pointer',
              borderBottom: `1px solid ${
                index === currentTab
                  ? commonStyle.color_pr
                  : commonStyle.color_sec
              }`,
              '> *': {
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color:
                  index === currentTab
                    ? commonStyle.color_pr
                    : commonStyle.color_sec,
              },
            }}
            onClick={() => navigate(`/dashboard/account?tab=${index}`)}
          >
            <Box>{tab}</Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          mt: '1.5rem',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        {currentTab === 0 && <GeneralTab />}
        {currentTab === 1 && <SecurityTab />}
      </Box>
    </Box>
  );
}

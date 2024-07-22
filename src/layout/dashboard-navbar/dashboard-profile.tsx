import { Box, Fade, Typography } from '@mui/material';
import { useAppContext } from '../../context/app-context/app-contex';
import { useDashboardNavbarContext } from './dashboard-navbar-context';
import CustomButton from '../../components/common/custom-button';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router';

export default function DashboardProfile() {
  const { commonStyle } = useAppContext();
  const { openProfile } = useDashboardNavbarContext();
  const navigate = useNavigate();
  return (
    <Fade
      in={openProfile}
      style={{
        position: 'absolute',
        top: '2.5rem',
        right: '0px',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          borderRadius: '4px',
          width: '210px',
          padding: '.5rem',
          bgcolor: commonStyle.bgcolor_sec,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: '50px',
              height: '50px',
              overflow: 'hidden',
              borderRadius: '4px',
              margin: '.5rem',
            }}
          >
            <img
              width={'50px'}
              height={'50px'}
              src="https://placehold.co/600x600/004d40/white?text=V"
            />
          </Box>
          <Typography sx={{ color: commonStyle.color_pr }}>
            Việt phương
          </Typography>
          <Typography sx={{ color: commonStyle.color_sec }}>
            nguyenvu1512@gmail.com
          </Typography>
        </Box>
        <Box>
          <CustomButton
            text="My Account"
            subText="Edit my profile"
            startIcon={<FiSettings />}
            sx={{ marginY: '.5rem' }}
            onClick={() => {
              navigate('/dashboard/account');
            }}
          />
          <CustomButton
            text="My Subscription "
            subText="Manage my plan"
            startIcon={<FiSettings />}
            onClick={() => {
              console.log('T');
            }}
          />
          <Box
            sx={{
              borderTop: `1px solid ${commonStyle.color_third}`,
              marginY: '.5rem',
            }}
          />
          <CustomButton
            text="Logout"
            startIcon={<FiLogOut />}
            onClick={() => {
              console.log('T');
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
}

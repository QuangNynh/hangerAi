import { Box } from '@mui/material';
import { useAppContext } from '../../../../../../context/app-context/app-contex';

export default function NotificationForm() {
  const { commonStyle } = useAppContext();
  return (
    <Box>
      <Box
        sx={{
          paddingBottom: '1rem',
          color: commonStyle.color_pr,
          borderBottom: `1px solid ${commonStyle.color_sec}`,
          mb: '1rem',
        }}
      >
        Notification
      </Box>
    </Box>
  );
}

import { Box, Button } from '@mui/material';
import CenterBox from '../../../../components/common/center-box';
import { useVirtualDR } from '..';

export default function DisplayBox() {
  const { setShowSelection, showSelection } = useVirtualDR();
  return (
    <CenterBox sx={{ flex: 1, height: '100%', flexDirection: 'column' }}>
      <CenterBox
        sx={{
          height: '51px',
          bgcolor: 'black',
          padding: '.75rem',
          paddingX: '1rem',
          borderBottom: '1px solid #6d6d70',
          boxSizing: 'border-box',
          width: '100%',
          '@media only screen and (max-width: 500px)': {},
        }}
      >
        <Box sx={{ flex: 1 }}></Box>
        <Button
          sx={{
            bgcolor: 'rgb(105, 4, 233)',
            height: '100%',
            width: '100px',
            color: 'white',
            textTransform: 'none',
          }}
        >
          Generate
        </Button>
      </CenterBox>
      <CenterBox sx={{ flex: 1 }}></CenterBox>
    </CenterBox>
  );
}

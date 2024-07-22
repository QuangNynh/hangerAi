import { Box, TextField, Typography } from '@mui/material';

export default function PromptTab() {
  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        multiline
        minRows={5}
        sx={{
          width: '100%',
          '> *': {
            border: '1px solid #6d6d70',
            // bgcolor: '#414550',
            borderRadius: '6px',
            color: 'white',
          },
          textarea: { padding: '0rem' },
        }}
      />
      <Typography sx={{ color: 'white' }}></Typography>
    </Box>
  );
}

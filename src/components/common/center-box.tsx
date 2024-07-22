import { Box, BoxProps } from '@mui/material';

export default function CenterBox({ children, sx, ...prop }: BoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx,
      }}
      {...prop}
    >
      {children}
    </Box>
  );
}

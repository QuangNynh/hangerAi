import { Box, SxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useAppContext } from '../../context/app-context/app-contex';

interface CustomButtomProps {
  text: string;
  subText?: string;
  startIcon?: ReactNode | string;
  endIcon?: ReactNode | string;
  onClick: () => void;
  sx?: SxProps;
}

export default function CustomButton({
  text,
  subText,
  startIcon,
  endIcon,
  onClick,
  sx,
}: CustomButtomProps) {
  const { commonStyle } = useAppContext();
  return (
    <Box
      sx={{
        display: 'flex',
        height: '3rem',
        position: 'relative',
        cursor: 'pointer',
        '> *': {
          display: 'flex',
          justifyContent: 'center',
          color: commonStyle.color_third,
        },
        '.CustomIcon': {
          width: '2.5rem',
          alignItems: 'center',
          fontSize: '1.25rem',
        },
        '&:hover': {
          bgcolor: commonStyle.bgcolor_forth,
          borderRadius: '4px',
        },
        ...sx,
      }}
      onClick={onClick}
    >
      <Box className={'CustomIcon'} mr={'.5rem'}>
        {startIcon ?? <></>}
      </Box>
      <Box flex={1} flexDirection={'column'}>
        <Typography sx={{ color: commonStyle.color_pr }}>{text}</Typography>
        {subText && <Typography fontSize={'.75rem'}>{subText}</Typography>}
      </Box>
      <Box className={'CustomIcon'}>{endIcon ?? <></>}</Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
}

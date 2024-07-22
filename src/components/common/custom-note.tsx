import { Box, SxProps } from '@mui/material';
import { FiInfo } from 'react-icons/fi';
interface CustomNodeProps {
  title: string;
  size?: string | number;
  color?: string;
  bgcolor?: string;
  textSx?: SxProps;
}
export default function CustomNote({
  size,
  color,
  title,
  bgcolor,
  textSx,
}: CustomNodeProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        opacity: '.85',
        '&,> svg': {
          width: size ?? '12px',
          height: size ?? '12px',
          color: color ?? '#7c839c',
        },
        '.CustomNote_Mess': {
          display: 'none',
        },
        '&:hover': {
          '.CustomNote_Mess': {
            display: 'block',
          },
        },
      }}
    >
      <Box
        className={'CustomNote_Mess'}
        sx={{
          position: 'absolute',
          bgcolor: bgcolor ?? 'black',
          width: '11rem',
          padding: '.5rem',
          //   height: '1rem',
          bottom: '1.5rem',
          borderRadius: '4px',
          color: 'white',
          zIndex: '9999',
          ...textSx,
        }}
      >
        {title}
      </Box>
      <Box
        className={'CustomNote_Mess'}
        sx={{
          position: 'absolute',
          bgcolor: bgcolor ?? 'black',
          width: '.5rem',
          height: '.5rem',
          top: '-.9rem',
          zIndex: '9999',
          transform: 'rotate(45deg)',
        }}
      />
      <FiInfo />
    </Box>
  );
}

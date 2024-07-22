/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useAppContext } from '../../../../context/app-context/app-contex';

export interface HighlighListProp {
  title: string;
  link: string;
  subTitle?: string;
}
export default function HighlighList({ data }: { data: HighlighListProp[] }) {
  const style = useMemo(
    () => ({
      bgcolor: '#1d1e23',
      bgcolor_active: '#1d1e23',
    }),
    [[useLocalStorage('mode', 'dark')[0]]]
  );
  const { isMobile } = useAppContext();
  return data.map((element, index) => (
    <Box
      key={`highlight_${index}`}
      sx={{
        width: '100%',
        maxWidth: isMobile ? '100%' : '25%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        bgcolor: style.bgcolor,
        height: '78px',
        borderRadius: '8px',
      }}
    >
      <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'white' }}>
        {element.title}
      </Typography>
      <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#a0aec0' }}>
        {element.subTitle ?? ''}
      </Typography>
    </Box>
  ));
}

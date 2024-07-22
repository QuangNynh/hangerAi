/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export interface SubNavbarTool {
  id: number;
  img: string;
}

export interface ToolListProps {
  data: SubNavbarTool[];
  ckey: string;
  name: string;
  title?: string;
}

export default function ToolList({ data, ckey, title, name }: ToolListProps) {
  const [itemCount, setItemCount] = useState<number>(0);
  const { control } = useFormContext();

  useEffect(() => {
    const element = document.getElementById(`${ckey}_dashboard`);
    if (!element) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const width = entry.contentRect.width;

      console.log(Math.ceil(width / 150));
      setItemCount(Math.ceil(width / 150));
    });

    resizeObserver.observe(element);
  }, []);

  return (
    <Box width={'100%'}>
      <Box sx={{ marginY: '1rem', color: 'white' }}>{title}</Box>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Box
            id={`${ckey}_dashboard`}
            sx={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              '> *': {
                width: `calc((100% - ${itemCount - 1}rem) / ${itemCount})`,
              },
            }}
          >
            {data.map((tool, index) => (
              <Box
                key={`${ckey}_${index}`}
                sx={{
                  // bgcolor: 'red',
                  maxWidth: '330px',
                  minWidth: '0px',
                  aspectRatio: '1/1',
                  height: 'auto',
                  borderRadius: '8px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '@media only screen and (max-width: 660px)': {
                    maxWidth: '100%',
                    width: 'calc(50% - 0.5rem) !important',
                    // minWidth: '330px',
                  },
                  img: {
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  },
                  transition: '.1s',
                  ...(tool.id === value
                    ? {
                        border: '3px solid #6904e9',
                      }
                    : {}),
                }}
                onClick={() => {
                  console.log(tool, value);
                  if (tool.id === value) {
                    onChange({ target: { value: -1 } });
                    return;
                  }
                  onChange({ target: { value: tool.id } });
                }}
              >
                <img src={tool.img} alt="" />
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transition: '.5s',
                    // bgcolor: 'red',
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      />
    </Box>
  );
}

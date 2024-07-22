/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Collapse, Grow, Typography, Zoom } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../../../../context/app-context/app-contex';
import CenterBox from '../../../../components/common/center-box';
import { GoStar, GoStarFill } from 'react-icons/go';
import { Tool } from '../../../../enums/tool-list';
import { useNavigate } from 'react-router';

export interface ToolListProps {
  title: string;
  subTitle?: string;
  min?: number;
  data: Tool[];
  ckey: string;
}

function ToolBox(data: Tool) {
  const { isMobile } = useAppContext();
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState<boolean>(false);
  useEffect(() => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  }, []);
  return (
    <Box
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
        '@media only screen and (max-width: 660px)': {
          maxWidth: '100%',
          width: '100% !important',
          minWidth: '330px',
        },
        img: {
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        },
      }}
    >
      <img src={data.img} alt="" />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: '.5s',
          ...(isHover
            ? { background: 'linear-gradient(0deg,#0e0e0e,#0e0e0e33)' }
            : { background: 'linear-gradient(0deg,#0e0e0e,#0e0e0e00 50%)' }),
        }}
        onClick={() => {
          navigate(data.link);
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            '> *': {
              '&:first-of-type': {
                position: 'absolute',
                top: '1rem',
                left: '1rem',
              },
            },
          }}
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Grow in={isHover}>
            <Box
              sx={{
                bgcolor: 'white',
                width: '28px',
                height: '28px',
                borderRadius: '14px',
                fontSize: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {data.isFav ? <GoStarFill /> : <GoStar />}
            </Box>
          </Grow>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: '1rem',
          bottom: '1rem',
          display: 'flex',
          flexDirection: 'column',
          '> *': {
            width: '100%',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'white',
            lineHeight: '24px',
          }}
        >
          {data.title}
        </Typography>
        <Collapse in={isHover}>
          <Typography
            sx={{ fontSize: '14px', fontWeight: 400, color: 'white' }}
          >
            {data.subTitle}
          </Typography>
        </Collapse>
      </Box>
    </Box>
  );
}
export default function ToolList({
  title,
  subTitle,
  min,
  data,
  ckey,
}: ToolListProps) {
  const [itemCount, setItemCount] = useState<number>(0);
  const [isLess, setIsLess] = useState<boolean>(false);
  const { isMobile } = useAppContext();

  useEffect(() => {
    const element = document.getElementById(`${ckey}_dashboard`);
    if (!element) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const width = entry.contentRect.width;
      console.log(width / 330);

      console.log(Math.ceil(width / 330));
      setItemCount(Math.ceil(width / 330));
    });

    resizeObserver.observe(element);
  }, []);

  const visibleTool = useMemo<Tool[]>(() => {
    const tmp = min ?? 5;
    return isLess ? data.slice(0, tmp) : data;
  }, [min, data, isLess]);

  return (
    <Box width={'100%'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          mb: '32px',
        }}
      >
        <Box flex={1}>
          <Typography
            sx={{ color: 'white', fontWeight: 600, fontSize: '24px' }}
          >
            {title}
          </Typography>
          {subTitle && (
            <Typography
              sx={{
                color: 'rgb(160, 174, 192)',
                fontWeight: 400,
                fontSize: '16px',
              }}
            >
              {subTitle}
            </Typography>
          )}
        </Box>
        <CenterBox
          sx={{
            color: '#d6b6ff',
            fontSize: '14px',
            alignItems: 'end',
            cursor: 'pointer',
            ...(isMobile ? { height: '2rem', justifyContent: 'start' } : {}),
          }}
          onClick={() => setIsLess(!isLess)}
        >
          view all tools
        </CenterBox>
      </Box>
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
        {visibleTool.map((tool, index) => (
          <ToolBox key={`${ckey}_${index}`} {...tool} />
        ))}
      </Box>
    </Box>
  );
}

import { Box, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import HightlightTool from './_components/highlight-tool';
import HighlighList, { HighlighListProp } from './_components/highlight-list';
import { useAppContext } from '../../../context/app-context/app-contex';
import ToolList, { ToolListProps } from './_components/tool-list';
import CenterBox from '../../../components/common/center-box';
import imageInpainting from '../../../assets/toolImageIcon/imageInpainting.png';
import { Tool, toolList } from '../../../enums/tool-list';

export default function HomePage() {
  const { isMobile } = useAppContext();
  const commonStyle = useMemo<Record<string, string>>(
    () => ({ color_header: 'white' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [useLocalStorage('mode', 'dark')[0]]
  );
  const highlightList = useMemo<HighlighListProp[]>(
    () => [
      // {
      //   title: 'Try Gen-1',
      //   subTitle: 'Video to video generation',
      //   link: '#',
      // },
      // {
      //   title: 'Try AI training',
      //   subTitle: '1 free training on paid plans',
      //   link: '#',
      // },
      // {
      //   title: 'Tell us about yourself',
      //   subTitle: 'Presonalize your experience',
      //   link: '#',
      // },
    ],
    []
  );

  const [toolLists, setToolList] = useState<ToolListProps>({
    data: Object.values(toolList),
    ckey: 'all-tool',
    title: `Hanger's AI Tools`,
    subTitle: 'Create and explore image, video and audio AI powered tools',
  });

  useEffect(() => {
    const tmp: Tool[] = [];
    for (let i = 0; i < 15; i++) {
      tmp.push({
        title: `title_${i}`,
        subTitle: `subTitle_${i}`,
        img: `https://placehold.co/6000x4000/e52c96/white?text=${i}`,
        link: `/link-${i}`,
      });
    }
    setToolList({
      ...toolLists,
      // data: tmp,
    });
  }, []);
  return (
    <Box sx={{ padding: '32px', boxSizing: 'border-box', width: '100%' }}>
      <Typography
        sx={{
          fontSize: '32px',
          fontWeight: 700,
          color: commonStyle.color_header,
        }}
      >
        Home
      </Typography>
      <HightlightTool />
      <Box
        sx={{
          mt: '2rem',
          display: 'flex',
          gap: '1rem',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <HighlighList data={highlightList} />
      </Box>
      <CenterBox sx={{ mt: '56px' }}>
        <ToolList {...toolLists} />
      </CenterBox>
    </Box>
  );
}

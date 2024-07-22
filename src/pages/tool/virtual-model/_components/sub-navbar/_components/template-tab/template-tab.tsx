import { Box } from '@mui/material';
import { useMemo } from 'react';
import ToolList from './_components/tool-list';
import TagList, { Tag } from './_components/tag-list';

export interface ImgSelect {
  id: number;
  img: string;
}

export default function TemplateTab() {
  const modelList: ImgSelect[] = useMemo<ImgSelect[]>(() => {
    const tmp: ImgSelect[] = [];
    for (let i = 0; i < 20; i++) {
      tmp.push({
        id: i,
        img: `https://placehold.co/6000x4000/white/black?text=${i}`,
      });
    }
    return tmp;
  }, []);

  const locationList: ImgSelect[] = useMemo<ImgSelect[]>(() => {
    const tmp: ImgSelect[] = [];
    for (let i = 0; i < 20; i++) {
      tmp.push({
        id: i,
        img: `https://placehold.co/6000x4000/white/black?text=${i}`,
      });
    }
    return tmp;
  }, []);

  const tagList: Tag[] = useMemo<Tag[]>(() => {
    const tmp: Tag[] = [];
    for (let i = 0; i < 20; i++) {
      tmp.push({
        id: i,
        title: 'tag ' + i,
      });
    }
    return tmp;
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <ToolList
        data={modelList}
        ckey="subnav_model"
        title={
          'Model (represent model’s type and gender, unlimited models/types can be generated)'
        }
        name="selectModel"
      />
      <TagList data={tagList} />
      <ToolList
        name="location"
        data={locationList}
        ckey="subnav_model"
        title={'Location'}
      />
    </Box>
  );
}

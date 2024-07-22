/* eslint-disable react-hooks/exhaustive-deps */
import { Box, BoxProps, Typography } from '@mui/material';
import CenterBox from '../../../../components/common/center-box';
import { useEffect, useMemo, useState } from 'react';
import DragAndDropImg from '../../../../components/common/input/drag-n-drop-img';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  data: (File | string)[];
  key_str: string;
}
export default function DisplaySection({
  key_str,
  data,
  name,
  sx,
  ...prop
}: BoxProps & Props) {
  const [itemCount, setItemCount] = useState<number>(0);
  const [showData, setShowData] = useState<(File | string)[]>([]);
  const [selectIndex, setSelectedIndex] = useState<number>(-1);
  const { setValue, watch } = useFormContext();

  const selectImage = watch(`upload_${name}`);
  useEffect(() => {
    if (!selectImage) {
      return;
    }
    console.log(selectImage);

    const res = showData.map((e) => e);
    // res.push(selectImage);
    setShowData([selectImage, ...res]);
    setValue(name, selectImage);
    setSelectedIndex(0);
  }, [selectImage]);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    const element = document.getElementById(`selection_panel_wrapper`);
    console.log(element?.getBoundingClientRect().width);

    if (!element) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const width = entry.contentRect.width;

      setItemCount(Math.ceil(width / 125));
    });

    resizeObserver.observe(element);
    setShowData(data);
  }, [data]);
  return (
    <CenterBox
      {...prop}
      sx={{
        height: '100%',
        maxHeight: '100%',
        width: '100%',
        boxSizing: 'border-box',
        padding: '1rem',
        paddingTop: '4rem',
        bgcolor: 'black',
        justifyContent: 'start',
        alignItems: 'start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        minHeight: 0,
        overflowY: 'auto',
        gap: '1rem',
        gridAutoRows: 'min-content',
        gridColumnGap: '1rem',
        '::-webkit-scrollbar': {
          display: 'none !important',
        },
        // scrollbarWidth: '.5rem',
        '> *': {
          width: `calc((100% - ${itemCount - 1}rem) / ${itemCount})`,
          aspectRatio: '1.25 / 2',
          height: 'auto',
          borderRadius: '6px',
          overflow: 'hidden',
          boxSizing: 'border-box',
          transition: '.5s',
          img: {
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          },
        },
        ...sx,
      }}
    >
      <DragAndDropImg name={name} hideText={true} />
      {showData.map((e, index) => (
        <Box
          key={`${key_str}_${index}`}
          sx={{
            border: `1px solid ${
              selectIndex === index ? 'rgb(105, 4, 233)' : 'white'
            }`,
            cursor: 'pointer',
          }}
          onClick={() => {
            setValue(name, e);
            setSelectedIndex(index);
            console.log(typeof e);
          }}
        >
          <img src={typeof e === 'string' ? e : URL.createObjectURL(e)} />
        </Box>
      ))}
    </CenterBox>
  );
}

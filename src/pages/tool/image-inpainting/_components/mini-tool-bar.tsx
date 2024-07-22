import { Fragment, ReactNode, useMemo, useState } from 'react';
import { useInpainting } from '..';
import CenterBox from '../../../../components/common/center-box';
import {
  FluentImageAdd20Regular,
  FluentPaintBrush20Regular,
  FluentZoomIn20Regular,
  FluentZoomOut20Regular,
  FluentEraser20Regular,
  FluentInkStrokeArrowUpDown20Regular,
  FluentArrowHookDownLeft20Regular,
  FluentArrowHookDownRight20Regular,
  FluentArrowMove20Regular,
} from '../../../../assets/icon/fluent-ui';
import { Box } from '@mui/material';
interface MiniTabIcon {
  icon: ReactNode;
  id: number;
  onClick?: () => void;
}

export default function InpaintingMiniToolBar() {
  const { setCurrentTool } = useInpainting();
  const [selectedTool, setSelectedTool] = useState<[number, number]>([0, 0]);
  const iconList = useMemo<MiniTabIcon[][]>(
    () => [
      [
        {
          icon: <FluentImageAdd20Regular />,
          id: 0,
        },
      ],
      [
        {
          icon: <FluentPaintBrush20Regular />,
          id: 1,
        },
        {
          icon: <FluentEraser20Regular />,
          id: 2,
        },
        {
          icon: <FluentInkStrokeArrowUpDown20Regular />,
          id: 3,
        },
      ],
      [
        {
          icon: <FluentArrowHookDownLeft20Regular />,
          id: 4,
        },
        {
          icon: <FluentArrowHookDownRight20Regular />,
          id: 5,
        },
      ],
      [
        {
          icon: <FluentArrowMove20Regular />,
          id: 6,
        },
        {
          icon: <FluentZoomIn20Regular />,
          id: 7,
        },
        {
          icon: <FluentZoomOut20Regular />,
          id: 8,
        },
      ],
    ],
    []
  );
  //#region Render
  return (
    <CenterBox
      sx={{
        bgcolor: 'black',
        width: '50px',
        height: '100%',
        padding: '5px',
        boxSizing: 'border-box',
        flexDirection: 'column',
        justifyContent: 'start',
        position: 'relative',

        '@media only screen and (max-width: 500px)': {
          width: '100vw',
          height: '50px',
          flexShrink: 0,
          overflowX: 'auto',
          flexDirection: 'row',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '> *': {
          width: '40px',
          borderRadius: '4px',
          boxSizing: 'border-box',
          height: '40px',
          flexShrink: 0,
          cursor: 'pointer',
          '*': {
            fontSize: '2rem',
            color: 'rgb(160, 174, 192)',
          },
          zIndex: 99,
        },
      }}
    >
      <CenterBox
        sx={{
          transition: '.5s',
          position: 'absolute',
          boxSizing: 'border-box',
          border: '1px solid white',
          top: `${selectedTool[1] * 40 + 5 + selectedTool[0] * 13}px`,
          zIndex: 98,
          // bgcolor: 'white',
          left: '5px',
          '@media only screen and (max-width: 500px)': {
            top: '5px',
            left: `${selectedTool[1] * 40 + 5 + selectedTool[0] * 13}px`,
          },
        }}
      />
      {iconList.map((section, sectionId) => (
        <Fragment key={`section_${sectionId}_-1`}>
          {sectionId !== 0 && (
            <Box
              sx={{
                bgcolor: 'rgb(160, 174, 192)',
                height: '1px !important',
                margin: '6px !important',
                '@media only screen and (max-width: 500px)': {
                  height: '100% !important',
                  width: '1px !important',
                },
              }}
            />
          )}
          {section.map(({ icon, id }, iconId) => (
            <CenterBox
              key={`section_${sectionId}_${iconId}`}
              onClick={() => {
                setCurrentTool(id);
                setSelectedTool([sectionId, id]);
              }}
            >
              {icon}
            </CenterBox>
          ))}
        </Fragment>
      ))}
    </CenterBox>
  );
  //#endregion
}

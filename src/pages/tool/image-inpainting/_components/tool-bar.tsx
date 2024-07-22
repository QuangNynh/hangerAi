import { Box } from '@mui/material';
import { useInpainting } from '..';
import CenterBox from '../../../../components/common/center-box';
import InpaintingMiniToolBar from './mini-tool-bar';
import UploadSection from './upload-section';
import { useAppContext } from '../../../../context/app-context/app-contex';
import ZoomSection from './zoom-section';

export default function InpaintingToolbar() {
  const { openNavbar, setOpenNavbar, currentTool } = useInpainting();
  const { isMobile } = useAppContext();
  return (
    <CenterBox
      sx={{
        width: currentTool === 0 ? '500px' : '50px',
        overflow: 'hidden',
        borderLeft: '1px solid #6d6d70',
        height: '100%',
        bgcolor: 'green',
        boxSizing: 'border-box',
        transition: '.5s',
        justifyContent: 'start',
        alignItems: 'start',
        '@media only screen and (max-width: 500px)': {
          width: '100vw',
          position: 'absolute',
          height:
            currentTool === 0
              ? 'calc(100% - 50px)'
              : currentTool === 3 || currentTool === 7 || currentTool == 8
              ? '100px'
              : '50px',
          bottom: 0,
          border: 'none',
          borderTop: '1px solid #6d6d70',
          '> *': {
            flexDirection: 'column',
          },
        },
      }}
    >
      <CenterBox
        sx={{
          width: '500px',
          height: '100%',
          justifyContent: 'start',
          alignItems: 'start',
          '@media only screen and (max-width: 500px)': {
            width: '100vw',
          },
          flexShrink: 0,
        }}
      >
        <ZoomSection />
        <InpaintingMiniToolBar />
        <CenterBox
          sx={{
            flex: 1,
            height: '100%',
            flexShrink: 0,
            justifyContent: 'start',
            bgcolor: 'yellow',
            '@media only screen and (max-width: 500px)': {
              width: '100%',
            },
            flexDirection: 'column',
          }}
        >
          <UploadSection />
        </CenterBox>
      </CenterBox>
    </CenterBox>
  );
}

import { useEffect } from 'react';
import { useInpainting } from '..';
import CenterBox from '../../../../components/common/center-box';
import { useAppContext } from '../../../../context/app-context/app-contex';
import CustomTextField from '../../../../components/common/custom-textfield';
import { Slider } from '@mui/material';
import { FluentCheckmark20Regular } from '../../../../assets/icon/fluent-ui';

export default function ZoomSection() {
  const { currentTool } = useInpainting();
  const { isMobile } = useAppContext();
  useEffect(() => {
    console.log(currentTool === 3 || currentTool === 7 || currentTool === 8);
  }, [currentTool]);
  return (
    <CenterBox
      sx={{
        width: '100vw',
        flexShrink: 0,
        transition: '.5s',
        ...((currentTool === 3 || currentTool === 7 || currentTool === 8) &&
        isMobile
          ? { height: '50px !important', borderBottom: '1px solid #6d6d70' }
          : { height: '0px' }),
        overflow: 'hidden',
        bgcolor: 'black',
        alignItems: 'start',
        display: isMobile ? 'flex' : 'none',
      }}
    >
      <CenterBox
        sx={{
          width: '100vw',
          flexShrink: 0,
          height: '50px',
          padding: '5px',
          boxSizing: 'border-box',
          gap: '1.5rem',
        }}
      >
        <CustomTextField
          sx={{ width: '91px', flexShrink: 0, height: '40px' }}
          type="number"
        />
        <Slider
          aria-label="Volume"
          sx={{
            flex: 1,
            '.MuiSlider-thumb,.MuiSlider-track': {
              color: 'rgb(160, 174, 192)',
            },
            '.MuiSlider-rail': {
              color: `#6d6d70`,
            },
          }}
        />
        <CenterBox
          sx={{
            width: '40px',
            height: '40px',
            '*': {
              fontSize: '2rem',
              color: 'white',
            },
          }}
        >
          <FluentCheckmark20Regular />
        </CenterBox>
      </CenterBox>
    </CenterBox>
  );
}

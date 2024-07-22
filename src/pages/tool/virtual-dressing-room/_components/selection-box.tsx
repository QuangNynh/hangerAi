import { Box, TextField } from '@mui/material';
import { useVirtualDR } from '..';
import { useAppContext } from '../../../../context/app-context/app-contex';
import CenterBox from '../../../../components/common/center-box';
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiSearch,
} from 'react-icons/fi';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  PhDressThin,
  PhHighHeelThin,
  PhHoodieThin,
  PhPantsThin,
  PhTShirtThin,
  PhUser,
} from '../../../../assets/CustomIcon';
import DisplaySection from './display-section';

export default function SelectionBox() {
  const { setShowSelection, showSelection } = useVirtualDR();
  const { isMobile } = useAppContext();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const test = useMemo(() => {
    const res: string[] = [];
    for (let i = 0; i < 3; i++) {
      res.push(`https://placehold.co/600x600/004d40/white?text=${i}`);
    }
    return res;
  }, []);

  useEffect(() => {
    setShowSelection(true);
    setTimeout(
      () => {
        const element = document.getElementById(`${selectedTab}_tab`);
        if (element) {
          element.scrollTop = 0;
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
      showSelection ? 0 : 500
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);
  const section = useMemo<{ icon: ReactNode; name: string }[]>(
    () => [
      { icon: <PhUser />, name: 'model' },
      { icon: <PhTShirtThin />, name: 'shirt' },
      { icon: <PhHoodieThin />, name: 'jacket' },
      { icon: <PhPantsThin />, name: 'pant' },
      { icon: <PhHighHeelThin />, name: 'shoe' },
      { icon: <PhDressThin />, name: 'dress' },
    ],
    []
  );
  return (
    <Box
      sx={{
        width: showSelection ? '500px' : '50px',
        height: '100%',
        transition: '.5s',
        overflow: 'hidden',
        borderLeft: '1px solid #6d6d70',
        bgcolor: 'black',
        '*': {
          color: 'white',
        },
        '@media only screen and (max-width: 500px)': {
          width: '100vw !important',
          height: showSelection ? '100%' : '50px',
          position: 'absolute',
          boxSizing: 'border-box',
          borderLeft: 'none',
          borderTop: '1px solid #6d6d70',
          bottom: 0,
          right: 0,
          '> *': {
            width: '100vw !important',
          },
        },
      }}
    >
      <CenterBox
        sx={{ width: '500px', height: '100%', flexDirection: 'column' }}
      >
        <CenterBox sx={{ width: '100%', borderBottom: '1px solid #6d6d70' }}>
          <CenterBox
            sx={{
              width: '50px',
              height: '50px',
              flexShrink: 0,
              svg: { fontSize: '1.5rem' },
              cursor: 'pointer',
            }}
            onClick={() => setShowSelection(!showSelection)}
          >
            {isMobile ? (
              showSelection ? (
                <FiChevronDown />
              ) : (
                <FiChevronUp />
              )
            ) : showSelection ? (
              <FiChevronRight />
            ) : (
              <FiChevronLeft />
            )}
          </CenterBox>
          <CenterBox sx={{ flex: 1 }}>Selection Panel</CenterBox>
        </CenterBox>
        <CenterBox
          sx={{
            flex: 1,
            width: '100%',
            boxSizing: 'border-box',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          <CenterBox
            sx={{
              width: '50px',
              justifyContent: 'start',
              height: '100%',
              flexDirection: 'column',
              position: 'relative',
              borderRight: '1px solid #6d6d70',
              svg: {
                fontSize: '1.5rem',
              },
            }}
          >
            <CenterBox
              sx={{
                position: 'absolute',
                border: '1px solid white',
                width: '30px',
                height: '30px',
                margin: '10px',
                overflow: 'hidden',
                top: `${selectedTab * 50}px`,
                left: 0,
                borderRadius: '25px',
                zIndex: 14,
                transition: '.5s',
              }}
            >
              <Box
                sx={{
                  background:
                    'linear-gradient(0deg,rgba(255,255,255,.3),#0e0e0e00 50%)',
                  width: '100%',
                  height: '100%',
                }}
              ></Box>
            </CenterBox>
            {section.map((icon, index) => (
              <CenterBox
                key={`selection_icon_${index}`}
                sx={{
                  width: '50px',
                  height: '50px',
                  zIndex: 15,
                  '*': {
                    color: 'white',
                  },
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedTab(index)}
              >
                {icon.icon}
              </CenterBox>
            ))}
          </CenterBox>

          <CenterBox
            sx={{
              height: '100%',
              flex: 1,
              minHeight: 0,
              flexDirection: 'column',
              overflow: 'hidden',
              justifyContent: 'start',
              position: 'relative',
              '> *': {
                width: '100%',
                flexShrink: 0,
                height: '100%',
              },
            }}
          >
            <CenterBox
              sx={{
                position: 'sticky',
                top: 0,
                left: 0,
                height: '3rem',
                width: '100%',
                borderBottom: '1px solid #6d6d70',
                padding: '.5rem',
                boxSizing: 'border-box',
                gap: '.5rem',
                zIndex: 10,
              }}
              id="selection_panel_wrapper"
            >
              <TextField
                sx={{
                  input: { padding: '.25rem' },
                  flex: '1',
                  fieldset: {
                    border: '1px solid #6d6d70',
                  },
                }}
              />
              <CenterBox
                sx={{ height: '100%', aspectRatio: '1 / 1', width: 'auto' }}
              >
                <FiSearch />
              </CenterBox>
            </CenterBox>
            {section.map((s, index) => (
              <DisplaySection
                id={`${index}_tab`}
                key={`${index}_tab`}
                key_str={`${index}_tab`}
                data={test}
                name={s.name}
              />
            ))}
          </CenterBox>
        </CenterBox>
      </CenterBox>
    </Box>
  );
}

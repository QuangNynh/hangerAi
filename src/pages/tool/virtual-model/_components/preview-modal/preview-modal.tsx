import { Box, Grow, Typography } from '@mui/material';
import CenterBox from '../../../../../components/common/center-box';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { useEffect, useMemo, useState } from 'react';
import { useVirtualModel } from '../..';

export default function PreviewModal() {
  const [currentShow, setCurrentShow] = useState<number>(0);
  const [currentResultList, setResultList] = useState<(string | File)[]>([]);
  const { openPreview, setOpenPreview } = useVirtualModel();
  const size = useMemo<{ width: number; height: number }>(() => {
    const tmp = document.getElementById('resultBox');
    return {
      width: tmp?.offsetWidth ?? 0,
      height: tmp?.offsetHeight ?? 0,
    };
  }, [currentResultList]);
  useEffect(() => {
    const res: (string | File)[] = [];
    for (let i = 0; i < 4; i++) {
      res.push(`https://placehold.co/490x791/white/black?text=Result ${i}`);
    }
    setResultList(res);
  }, []);
  return (
    <Grow in={openPreview}>
      <Box
        sx={{
          position: 'fixed',
          zIndex: 9999,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(0,0,0,.8)',
        }}
      >
        <CenterBox
          sx={{
            widht: '100%',
            height: '100%',
            position: 'relative',
            padding: '1rem',
            boxSizing: 'border-box',
            // bgcolor: 'red',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          {/* <Box
            sx={{
              filter: 'blur(8px)',
              position: 'absolute',
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,.5)',
              top: 0,
              left: 0,
            }}
          /> */}
          <CenterBox
            sx={{
              height: '44px',
              boxSizing: 'border-box',
              position: 'relative',
              width: '100%',
            }}
          >
            <Typography sx={{ fontSize: '20px', lineHeight: '28px' }}>
              4 / 4
            </Typography>
            <CenterBox
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: '44px',
                aspectRatio: '1/1',
                cursor: 'pointer',
                width: 'auto',
                '> *': {
                  fontSize: '3rem',
                },
              }}
              onClick={() => setOpenPreview(false)}
            >
              <FiX />
            </CenterBox>
          </CenterBox>
          <CenterBox
            sx={{
              flex: 1,
              //   gap: '20px',
              maxWidth: '1000px',
              width: '100%',
              height: '100%',
              bgcolor: 'red',
              borderRadius: '1.25rem',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '1rem',
              '> *': {
                width: '50%',
                height: '100%',
              },
              img: {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                flexShrink: 0,
              },
              '.Indicate': {
                position: 'absolute',
                width: '66px',
                height: '30px',
                borderRadius: '.5rem',
                bgcolor: 'rgba(0, 0, 0, .5)',
                fontSize: '14px',
                top: '1rem',
              },
              '@media only screen and (max-width:500px)': {
                flexDirection: 'column',
                width: '100%',
                '> *': {
                  width: '100%',
                  height: '50%',
                },
              },
            }}
          >
            <Box>
              <img src="https://placehold.co/490x791/white/black?text=Origin" />
            </Box>
            <CenterBox
              sx={{
                overflow: 'hidden',
                position: 'relative',
              }}
              id="resultBox"
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',

                  justifyContent: 'start',
                  transform: `translateX(-${currentShow * size.width}px)`,
                  transition: '.5s',
                }}
              >
                {currentResultList.map((result, index) => (
                  <img
                    key={`result${index}`}
                    src={
                      typeof result === 'string'
                        ? result
                        : URL.createObjectURL(result)
                    }
                  />
                ))}
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(90deg,rgba(0,0,0,.2),#0e0e0e00 30%)',
                  top: 0,
                  left: 0,
                  '@media only screen and (max-width:500px)': {
                    background:
                      'linear-gradient(180deg,rgba(0,0,0,.2),#0e0e0e00 30%)',
                  },
                }}
              />
            </CenterBox>
            <CenterBox
              sx={{
                position: 'absolute',
                height: '100%',
                width: '3rem',
                right: 0,
                color: 'black',
                '*': {
                  fontSize: '2rem',
                  fontWeight: 'bold',
                },
                '&:hover': {
                  background:
                    'linear-gradient(-90deg,rgba(0,0,0,.3),#0e0e0e00 70%)',
                },
                '@media only screen and (max-width:500px)': {
                  width: '2rem',
                },
              }}
              onClick={() => {
                console.log((currentShow + 1) % currentResultList.length);

                setCurrentShow((currentShow + 1) % currentResultList.length);
              }}
            >
              <FiChevronRight />
            </CenterBox>
            <CenterBox
              sx={{
                position: 'absolute',
                height: '100%',
                width: '3rem',
                left: 0,
                color: 'black',
                '*': {
                  fontSize: '2rem',
                  fontWeight: 'bold',
                },
                '&:hover': {
                  background:
                    'linear-gradient(90deg,rgba(0,0,0,.3),#0e0e0e00 70%)',
                },
                '@media only screen and (max-width:500px)': {
                  width: '2rem',
                },
              }}
              onClick={() => {
                if (currentShow === 0) {
                  setCurrentShow(currentResultList.length);
                  return;
                }
                setCurrentShow((currentShow - 1) % currentResultList.length);
              }}
            >
              <FiChevronLeft />
            </CenterBox>
            <CenterBox className={'Indicate'} sx={{ left: '1rem' }}>
              Before
            </CenterBox>
            <CenterBox
              className={'Indicate'}
              sx={{ right: '1rem' }}
              right={'1rem'}
            >
              After
            </CenterBox>
          </CenterBox>
        </CenterBox>
      </Box>
    </Grow>
  );
}

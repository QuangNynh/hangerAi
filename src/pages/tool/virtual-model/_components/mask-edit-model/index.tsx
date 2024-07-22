/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grow, Typography } from '@mui/material';
import CenterBox from '../../../../../components/common/center-box';
import { useFormContext } from 'react-hook-form';
import { GrClose } from 'react-icons/gr';
import { useVirtualModel } from '../..';
import { Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import {
  PixelarticonsInvert,
  MaterialSymbolsCheckCircleOutlineRounded,
  MaterialSymbolsArrowTopLeft,
  MaterialSymbolsReplay,
  MaterialSymbolsCancelOutline,
} from '../../../../../assets/CustomIcon';
import { useAppContext } from '../../../../../context/app-context/app-contex';
// import getImageSegments from './_components/getImageSegment';

interface Tool {
  title: string;
  icon: ReactNode;
  onclick: () => void;
}
export default function MaskEditModal() {
  const { watch, setValue } = useFormContext();
  const { isMobile } = useAppContext();
  const { setOpenEditMask, openEditMask, canvasSize, segmentList } =
    useVirtualModel();

  const [resultList, setResultList] = useState<string[]>([]);
  const [resultHistory, setResultHistory] = useState<string[][]>([]);
  const [currentHover, setCurrentHover] = useState<string>('');
  const selectImage = watch('image');

  const toolBar = useMemo<Tool[]>(
    () => [
      {
        title: 'Reset',
        icon: <MaterialSymbolsReplay />,
        onclick: () => {
          setResultList([]);
        },
      },
      {
        title: 'Undo',
        icon: <MaterialSymbolsArrowTopLeft />,
        onclick: () => {
          if (resultHistory.length <= 1) {
            setResultList([]);
            setResultHistory([]);
          } else {
            setResultList(resultHistory[resultHistory.length - 2]);
            setResultHistory((prev) => {
              prev.pop();
              return prev;
            });
          }
        },
      },
      {
        title: 'Invert',
        icon: <PixelarticonsInvert />,
        onclick: () => {
          const tmp = new Set(resultList);
          console.log(Object.keys(segmentList).filter((e) => !tmp.has(e)));

          setResultList(Object.keys(segmentList).filter((e) => !tmp.has(e)));
        },
      },
      {
        title: 'Done',
        icon: <MaterialSymbolsCheckCircleOutlineRounded />,
        onclick: () => {
          const canvas = document.getElementById('editMaskSMK');
          const dataURL = (canvas as HTMLCanvasElement).toDataURL('image/png');

          const img = document.createElement('img');
          img.onload = () => {
            setValue('mask', img);
          };
          img.src = dataURL;
        },
      },
    ],
    [resultList, resultHistory]
  );
  useEffect(() => {
    // setResultList([]);
    setCurrentHover('');
  }, [openEditMask]);

  useEffect(() => {
    if (!selectImage) {
      return;
    }
    const img = new Image();
    img.src = URL.createObjectURL(selectImage);
    img.onload = function () {
      const canvas = document.getElementById('editMaskBg');
      if (!canvas) {
        return;
      }
      const ctx = (canvas as any).getContext('2d');

      ctx.drawImage(img, 0, 0);
      (canvas as HTMLCanvasElement).toDataURL('image/png');
    };
  }, [canvasSize]);

  useEffect(() => {
    const canvas = document.getElementById('editMaskMK');
    if (!canvas) {
      return;
    }
    console.log('TEST');

    const ctx = (canvas as any).getContext('2d');
    Object.values(segmentList).forEach((segment) => {
      const img = new Image();
      img.src = segment.image_base64;
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
        // (canvas as HTMLCanvasElement).toDataURL('image/png');
      };
    });
  }, [segmentList]);

  useEffect(() => {
    const canvas = document.getElementById(
      'editMaskHover'
    ) as HTMLCanvasElement;
    if (!canvas) {
      return;
    }
    const ctx = (canvas as any).getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (currentHover && segmentList[currentHover]) {
      const img = new Image();
      img.src = segmentList[currentHover].image_base64_display;
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
        // (canvas as HTMLCanvasElement).toDataURL('image/png');
      };
    }
  }, [currentHover]);

  useEffect(() => {
    setResultHistory([...resultHistory, resultList]);
    const canvas = document.getElementById('editMaskSMK') as HTMLCanvasElement;
    if (!canvas) {
      return;
    }
    const ctx = (canvas as any).getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (resultList) {
      resultList.forEach((result) => {
        const img = new Image();
        img.src = segmentList[result].image_base64_display;
        img.onload = function () {
          ctx.drawImage(img, 0, 0);
          // (canvas as HTMLCanvasElement).toDataURL('image/png');
        };
      });
    }
  }, [resultList]);
  return (
    <Grow in={openEditMask}>
      <Box
        sx={{
          position: 'fixed',
          zIndex: 9999,
          width: '100vw',
          height: '100vh',
          bgcolor: 'rgba(0,0,0,.95)',
          boxSizing: 'border-box',
          top: 0,
          left: 0,
        }}
      >
        <CenterBox
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            '> *': {
              maxHeight: '100%',
            },
          }}
        >
          <CenterBox sx={{ position: 'relative', width: '100%', mt: '1rem' }}>
            <Typography sx={{ color: 'white', textAlign: 'center' }}>
              Click to select unchanged areas in the original image (purple
              denotes the area, color depth irrelevant)
            </Typography>
            {!isMobile && (
              <Box
                sx={{
                  position: 'absolute',
                  color: 'white',
                  cursor: 'pointer',
                  right: '2rem',
                }}
                onClick={() => setOpenEditMask(false)}
              >
                <GrClose />
              </Box>
            )}
          </CenterBox>
          <CenterBox
            sx={{
              flex: 1,
              width: '100%',
              marginY: '1rem',
              // bgcolor: ' red',
              position: 'relative',
              canvas: {
                ...(isMobile
                  ? {
                      width: '100%',
                      height: 'auto',
                      marginX: '1rem !important',
                    }
                  : { height: '100%', width: 'auto' }),
                position: 'absolute',
                // display: 'none',
              },
              '#editMaskMK': {
                opacity: 0,
              },
              '#editMaskHover, #editMaskSMK': {
                opacity: '1',
              },
            }}
            id={'editMaskWrapper'}
          >
            <canvas
              width={`${canvasSize[0]}px`}
              height={`${canvasSize[1]}px`}
              id="editMaskBg"
            />
            <canvas
              width={`${canvasSize[0]}px`}
              height={`${canvasSize[1]}px`}
              id="editMaskSMK"
            />
            <canvas
              width={`${canvasSize[0]}px`}
              height={`${canvasSize[1]}px`}
              id="editMaskHover"
            />
            <canvas
              width={`${canvasSize[0]}px`}
              height={`${canvasSize[1]}px`}
              id="editMaskMK"
              onMouseMove={(e) => {
                const mouseX = e.nativeEvent.offsetX;
                const mouseY = e.nativeEvent.offsetY;
                // console.log(mouseX, mouseY);

                const canvas = document.getElementById('editMaskMK');

                if (!canvas) {
                  return;
                }
                const xRatio = canvasSize[0] / canvas?.offsetWidth;
                const yRatio = canvasSize[1] / canvas?.offsetHeight;
                const ctx = (canvas as any).getContext('2d');
                const pixelData = ctx.getImageData(
                  Math.floor(xRatio * mouseX),
                  Math.floor(yRatio * mouseY),
                  1,
                  1
                );
                const red = pixelData.data[0];
                const green = pixelData.data[1];
                const blue = pixelData.data[2];
                setCurrentHover(`${red},${green},${blue}`);
              }}
              onMouseLeave={() => {
                setCurrentHover('');
              }}
              onClick={() => {
                if (!resultList.find((e) => e === currentHover)) {
                  setResultList([...resultList, currentHover]);
                } else {
                  setResultList(resultList.filter((e) => e !== currentHover));
                }
              }}
            />
          </CenterBox>
          <CenterBox
            sx={{
              width: isMobile ? '100%' : '600px',
              gap: '.5rem',
              boxSizing: 'border-box',
              bgcolor: '#1d1e23',

              paddingY: '1rem',
              overflow: 'hidden',

              '> *': {
                color: 'white',
                fontSize: '14px',
                width: '100%',
                textAlign: 'center',
                cursor: 'pointer',
              },
              svg: {
                fontSize: '1.5rem',
              },
              ...(isMobile
                ? {
                    height: '5rem',
                    borderRadius: '0',
                  }
                : { mb: '1rem', height: '3rem', borderRadius: '1.5rem' }),
            }}
          >
            {toolBar.map((tool, index) => (
              <Fragment key={`editMask_toolbar_${index}`}>
                {index !== 0 && (
                  <Box
                    sx={{
                      borderRight: '1px solid white',
                      width: '0px !important',
                      height: '100%',
                    }}
                  />
                )}
                <CenterBox
                  onClick={tool.onclick}
                  sx={{
                    gap: '.5rem',
                    position: 'relative',
                    ...(isMobile ? { flexDirection: 'column' } : {}),
                  }}
                >
                  {tool.icon}
                  {tool.title}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </CenterBox>
              </Fragment>
            ))}
            {isMobile && (
              <Fragment>
                <Box
                  sx={{
                    borderRight: '1px solid white',
                    width: '0px !important',
                    height: '100%',
                  }}
                />
                <CenterBox
                  onClick={() => setOpenEditMask(false)}
                  sx={{
                    gap: '.5rem',
                    position: 'relative',
                    ...(isMobile ? { flexDirection: 'column' } : {}),
                  }}
                >
                  <MaterialSymbolsCancelOutline />
                  Cancel
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </CenterBox>
              </Fragment>
            )}
          </CenterBox>
        </CenterBox>
      </Box>
    </Grow>
  );
}

import { Box, Button, Typography } from '@mui/material';
import { useAppContext } from '../../../../../context/app-context/app-contex';
import CenterBox from '../../../../../components/common/center-box';
import DragAndDropImg from './_components/drag-and-drop';
import { FiSettings, FiEdit } from 'react-icons/fi';
import { Fragment, useEffect, useMemo, useState } from 'react';
import TextDescriptionTab from './_components/text-description-tab';
import TemplateTab from './_components/template-tab/template-tab';
import PromptTab from './_components/prompt-tab';
import { useFormContext } from 'react-hook-form';
import { useVirtualModel } from '../..';

export default function VirtualModelSubNavbar() {
  const { isMobile } = useAppContext();
  const { watch } = useFormContext();
  const { setOpenEditMask, isLoadingMask } = useVirtualModel();
  const [currentTab, setCurrentTab] = useState<number>(1);
  const tabTitle = useMemo<string[]>(() => ['Prompt', 'Template'], []);

  const selectImage = watch('image');
  const selectMask = watch('mask');
  useEffect(() => {
    console.log(selectMask);
  }, [selectMask]);
  return (
    <Box
      sx={{
        maxWidth: '100vw',
        ...(isMobile
          ? {
              width: '100vw',
              height: '100%',
              maxHeight: '500px',
              borderTop: '1px solid #6d6d70',
            }
          : {
              height: '100%',
              width: '732px',
              borderRight: '1px solid #6d6d70',
            }),
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        scrollbarColor: '#383838 #21212100',
        paddingBottom: 0,
        bgcolor: 'black',
        position: 'relative',
      }}
    >
      <CenterBox
        sx={{
          width: '100%',
          padding: '2rem',
          boxSizing: 'border-box',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
          flex: 1,
          minHeight: 0,
          overflowY: 'scroll',
          ...(isMobile
            ? {
                '::-webkit-scrollbar': {
                  display: 'none !important',
                },
              }
            : {}),
        }}
      >
        <CenterBox
          sx={{
            width: '100%',
            gap: '2rem',
            '> *': {
              width: 'calc(50% - 1rem)',
              '> *:first-of-type': {
                width: '100%',
                aspectRatio: '1/1',
                height: 'auto',
                bgcolor: '#1d1e23',
                borderRadius: '10px',
              },
              '> *:last-of-type': {
                color: 'rgb(160, 174, 192)',
                textAlign: 'center',
                paddingY: '1rem',
              },
            },
            '@media only screen and (max-width: 500px)': {
              flexWrap: 'wrap',
              '> *': {
                width: '100% !important',
              },
            },
          }}
        >
          <Box>
            <DragAndDropImg />
            <Box>Origin</Box>
          </Box>
          <Box sx={{ width: '50%' }}>
            <CenterBox
              sx={{
                flexDirection: 'column',
                padding: '1rem',
                boxSizing: 'border-box',
                position: 'relative',
              }}
            >
              {selectImage && (
                <Fragment>
                  {/* {selectMask && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        img: {
                          objectFit: 'contain',
                          width: '100%',
                          height: '100%',
                        },
                      }}
                    >
                      <img src={URL.createObjectURL(selectMask)} />
                    </Box>
                  )} */}
                  <Box flex={1} />
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontSize: '14px',
                      color: 'rgb(160, 174, 192)',
                    }}
                  >
                    Click to edit areas in the original image that do not
                    require any changes
                  </Typography>
                  <Box flex={1} />
                  <CenterBox
                    sx={{
                      bgcolor: '#414550',
                      padding: '.5rem 2rem ',
                      borderRadius: '6px',
                      color: 'white',
                      cursor: 'pointer',
                      gap: '.5rem',
                    }}
                    onClick={() => setOpenEditMask(true)}
                  >
                    <FiEdit />
                    <Typography>Edit</Typography>
                  </CenterBox>
                </Fragment>
              )}
              {isLoadingMask && (
                <CenterBox
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    img: {
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    },
                  }}
                >
                  <></>
                </CenterBox>
              )}
            </CenterBox>
            <Box>Edit mask</Box>
          </Box>
        </CenterBox>
        <CenterBox
          sx={{
            width: '100%',
            color: 'rgb(160, 174, 192)',
            borderBottom: '1px solid #6d6d70',
            justifyContent: 'start',
          }}
        >
          {tabTitle.map((e, i) => (
            <Typography
              sx={{
                padding: '1rem',
                cursor: 'pointer',
                boxSizing: 'border-box',
                ...(i === currentTab
                  ? {
                      fontWeight: 700,
                      color: 'white',
                      borderBottom: '2px inset white',
                    }
                  : {}),
              }}
              onClick={() => setCurrentTab(i)}
              key={`subnavbar_${i}`}
            >
              {e}
            </Typography>
          ))}
        </CenterBox>
        <CenterBox
          sx={{
            width: '100%',
            flexDirection: 'column',
            position: 'sticky',
            top: 0,
          }}
        >
          {currentTab === 0 && <TextDescriptionTab />}
          {currentTab === 1 && <TemplateTab />}
          {currentTab === 2 && <PromptTab />}
        </CenterBox>
      </CenterBox>
      <CenterBox
        sx={{
          gap: '.5rem',
          height: '70px',
          borderTop: '1px solid #6d6d70',
          boxSizing: 'border-box',
          paddingX: '30px',
          flexWrap: 'wrap',
          '*': {
            color: 'white',
          },
          '@media only screen and (max-width: 500px)': {
            paddingY: '1rem',
            height: 'auto',
            '> *': {
              width: '100%',
            },
          },
        }}
      >
        <CenterBox sx={{ gap: '.5rem' }}>
          <Typography>This task will consume</Typography>
          <Typography>1 Point</Typography>
        </CenterBox>
        <Box flex={1} />
        <CenterBox
          sx={{
            gap: '.5rem',
            '@media only screen and (max-width: 500px)': {
              '> *': {
                width: '100%',
              },
            },
          }}
        >
          <Button
            sx={{
              bgcolor: '#1d1e23',
              color: 'white',
              width: '200px',
              height: '35px',
              textTransform: 'none',
              fontSize: '14px',
            }}
          >
            Generate
          </Button>
          <CenterBox
            sx={{
              height: '35px',
              width: '35px !important',
              aspectRatio: '1 / 1 !important',
              bgcolor: '#1d1e23',
              borderRadius: '4px',
              '> *': {
                fontSize: '18px',
                color: 'white',
              },
            }}
          >
            <FiSettings />
          </CenterBox>
        </CenterBox>
      </CenterBox>
    </Box>
  );
}

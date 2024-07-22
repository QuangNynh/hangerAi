import { Box, Collapse, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CenterBox from '../../../../../../components/common/center-box';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export default function TextDescriptionTab() {
  const { register, watch, control } = useFormContext();
  const [openTextDescription, setOpenTextDescription] = useState<boolean>(true);
  const [openPromp, setOpenPromp] = useState<boolean>(false);

  const test = watch('text_description');
  useEffect(() => {
    console.log(test);
  }, [test]);
  return (
    <Box
      sx={{
        width: '100%',
        '.SubTitle': {
          color: 'rgb(160, 174, 192)',
          marginY: '.5rem',
        },
        '.CustomTextField': {
          width: '100%',
          '*': {
            color: 'rgb(160, 174, 192)',
          },
          '> *': {
            border: '1px solid #6d6d70',
            // bgcolor: '#414550',
            borderRadius: '6px',
            padding: '.5rem',
            color: 'rgb(160, 174, 192)',
          },
          textarea: { padding: '0rem' },
        },
      }}
    >
      <CenterBox
        sx={{
          paddingY: '1rem',
          paddingRight: '1rem',
          boxSizing: 'border-box',
          '> *': {
            color: 'white',
            fontSize: '1rem',
          },
        }}
      >
        <Typography>Text Description</Typography>
        <Box flex={1} />
        <CenterBox onClick={() => setOpenTextDescription(!openTextDescription)}>
          {openTextDescription ? <FaCaretDown /> : <FaCaretUp />}
        </CenterBox>
      </CenterBox>
      <Collapse in={openTextDescription}>
        <Typography
          sx={{ fontSize: '14px', color: 'rgb(160, 174, 192)', mb: '.5rem' }}
        >
          Describe the image you want to generate
        </Typography>
        <TextField
          multiline
          minRows={5}
          {...register('text_description')}
          className="CustomTextField"
          sx={{}}
        />
      </Collapse>
      <CenterBox
        sx={{
          paddingY: '1rem',
          paddingRight: '1rem',
          boxSizing: 'border-box',
          '> *': {
            color: 'white',
            fontSize: '1rem',
          },
        }}
        onClick={() => setOpenPromp(!openPromp)}
      >
        <Typography>Prompt</Typography>
        <Box flex={1} />
        <CenterBox>{openPromp ? <FaCaretDown /> : <FaCaretUp />}</CenterBox>
      </CenterBox>
      <Collapse in={openPromp} orientation="vertical">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography className="SubTitle">Model Preference</Typography>
          <Controller
            control={control}
            name="isFreeCreation"
            render={({ field: { value, onChange } }) => (
              <CenterBox
                sx={{
                  justifyContent: 'start',
                  gap: '1rem',
                  mb: '.5rem',
                  '@media only screen and (max-width: 600px)': {
                    flexDirection: 'column !important',
                    '> *': {
                      width: '100% !important',
                    },
                  },
                  '> *': {
                    border: '1px solid rgb(160, 174, 192)',
                    color: 'rgb(160, 174, 192)',
                    height: '2.5rem',
                    minWidth: '100px',
                    paddingX: '2rem',
                    borderRadius: '1.25rem',
                    textAlign: 'center',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    transition: '.5s',
                    '&.Current': {
                      color: 'white',
                      borderColor: 'white',
                      fontWeight: 500,
                    },
                  },
                }}
              >
                <CenterBox
                  className={value ? 'Current' : ''}
                  onClick={() => {
                    console.log(value);

                    onChange({ target: { value: true } });
                  }}
                >
                  Free Creation
                </CenterBox>
                <CenterBox
                  className={!value ? 'Current' : ''}
                  onClick={() => onChange({ target: { value: false } })}
                >
                  Refer to the Original Image
                </CenterBox>
              </CenterBox>
            )}
          />
          <CenterBox
            sx={{
              width: '100%',
              gap: '1rem',
              '> *': {
                width: '50% !important',
                '> p': {
                  width: '100%',
                },
              },
              '@media only screen and (max-width: 600px)': {
                flexDirection: 'column !important',
                '> *': {
                  width: '100% !important',
                },
              },
            }}
          >
            <CenterBox
              sx={{
                flexDirection: 'column',
                gap: '.5rem',
              }}
            >
              <Typography
                className="SubTitle"
                sx={{ span: { color: 'white' } }}
              >
                Input a <span>Positive</span> Prompt (required)
              </Typography>
              <TextField
                multiline
                minRows={5}
                {...register('promptPositive')}
                className="CustomTextField"
              />
            </CenterBox>
            <CenterBox
              sx={{
                flexDirection: 'column',
                gap: '.5rem',
              }}
            >
              <Typography
                className="SubTitle"
                sx={{ span: { color: 'white' } }}
              >
                Input a <span>Negative</span> Prompt (optional)
              </Typography>
              <TextField
                multiline
                minRows={5}
                {...register('promptNegative')}
                className="CustomTextField"
              />
            </CenterBox>
          </CenterBox>
        </Box>
      </Collapse>
    </Box>
  );
}

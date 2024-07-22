import { Box, TextField } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';
import CenterBox from '../../../../../components/common/center-box';
import { FiCheck, FiEdit3, FiImage, FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useVirtualModel } from '../..';
import CreateAttemp from './_components/create-attemp';

export default function VirtualModelMainPage() {
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>('');

  const { currentTask, setOpenPreview } = useVirtualModel();

  useEffect(() => {
    setTempName(currentTask?.name ?? '');
  }, [currentTask]);

  function handleChangeTaskname() {
    //TODO Call Api to change
    setEnableEdit(false);
  }

  function handleCancelChangeTaskName() {
    setTempName(currentTask?.name ?? '');
    setEnableEdit(false);
  }
  return (
    <Fragment>
      <Box
        sx={{
          height: '90px',
          borderBottom: '1px solid #6d6d70',
          width: '100%',
          padding: ' 18px 30px',
          boxSizing: 'border-box',
          display: 'flex',
          gap: '1rem',
          img: {
            height: '100%',
            aspectRatio: '1/1',
            width: 'auto',
            bgcolor: 'white',
            borderRadius: '8px',
          },
        }}
      >
        <CenterBox
          sx={{
            borderRadius: '6px',
            height: '100%',
            aspectRatio: '1/1',
            width: 'auto',
            bgcolor: '#1d1e23',
            overflow: 'hidden',
            '*': {
              color: 'white',
              fontSize: '1.5rem',
            },
            img: {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            },
          }}
        >
          {currentTask && currentTask.image ? (
            <img
              src={
                typeof currentTask.image === 'string'
                  ? currentTask.image
                  : URL.createObjectURL(currentTask.image)
              }
            />
          ) : (
            <FiImage />
          )}
        </CenterBox>
        <CenterBox sx={{ '> *': { height: '50%' }, flexDirection: 'column' }}>
          <CenterBox sx={{ gap: '0.5rem' }}>
            <TextField
              autoComplete="off"
              placeholder={currentTask?.name ?? ''}
              value={tempName}
              inputProps={{
                readOnly: !enableEdit,
              }}
              onChange={(e) => {
                setTempName(e.target.value);
              }}
              sx={{
                flex: 1,
                input: { color: 'white', padding: 0, fontSize: '16px' },
                fieldset: {
                  '&,&:hover': {
                    // bgcolor: 'blue',
                    outline: 'none !important',
                    border: 'none !important',
                    cursor: 'not-allowed',
                  },
                },
                '>*': {
                  height: '100%',
                },
              }}
            />
            {enableEdit ? (
              <Fragment>
                <FiCheck onClick={handleChangeTaskname} />
                <FiX onClick={handleCancelChangeTaskName} />
              </Fragment>
            ) : (
              <FiEdit3 onClick={() => setEnableEdit(true)} />
            )}
          </CenterBox>
          <CenterBox
            sx={{
              textAlign: 'start',
              justifyContent: 'start',
              width: '100%',
              fontSize: '12px',
              color: '#8591a0',
            }}
          >
            MIN
          </CenterBox>
        </CenterBox>
      </Box>
      <Box
        sx={{
          width: '100%',
          flex: 1,
          padding: '30px',
          boxSizing: 'border-box',
          minHeight: '0px',
          overflowY: 'auto',
          flexDirection: 'column',
          display: 'flex',
          gap: '2.5rem',
          scrollbarColor: '#383838 #21212100',
          '@media only screen and (max-width:500px)': {
            padding: '1rem',
            maxWidth: '100vw',
          },
        }}
      >
        <CreateAttemp
          data={{
            isFreeCreation: true,
            promptPositive: '',
            tag: [],
            text_description: '',
          }}
        />
        <CreateAttemp
          data={{
            isFreeCreation: true,
            promptPositive: '',
            tag: [],
            text_description: '',
          }}
        />
      </Box>
    </Fragment>
  );
}

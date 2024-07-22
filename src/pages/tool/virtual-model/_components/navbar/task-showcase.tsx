import { Box, Typography } from '@mui/material';
import { TaskShowcase, useVirtualModel } from '../..';
import CenterBox from '../../../../../components/common/center-box';
import { FiImage, FiMoreHorizontal, FiTrash } from 'react-icons/fi';
import { useState } from 'react';

export default function TaskShowcaseBox({ data }: { data: TaskShowcase }) {
  const [openDeleteModal, setOPenDeleteModal] = useState<boolean>(false);
  const { setCurrentTask } = useVirtualModel();

  return (
    <Box
      sx={{
        borderRadius: '8px',
        height: '70px',
        width: '100%',
        boxSizing: 'border-box',
        padding: '10px',
        display: 'flex',
        gap: '1rem',
        bgcolor: '#1d1e23',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => {
        setCurrentTask(data);
      }}
    >
      <CenterBox
        sx={{
          borderRadius: '6px',
          height: '100%',
          aspectRatio: '1/1',
          width: 'auto',
          bgcolor: '#414550',
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
        {data.image ? (
          <img
            src={
              typeof data.image === 'string'
                ? data.image
                : URL.createObjectURL(data.image)
            }
          />
        ) : (
          <FiImage />
        )}
      </CenterBox>
      <CenterBox
        sx={{
          flexDirection: 'column',
          flex: 1,
          '>*': { textAlign: 'start', fontSize: '12px' },
          alignItems: 'start',
        }}
      >
        <Typography sx={{ color: 'white', fontSize: '14px' }}>
          {data.name}
        </Typography>
        {data.state === 0 ? (
          <Typography sx={{ color: '#8591a0', fontSize: '12px' }}>
            Not Started
          </Typography>
        ) : (
          <Typography sx={{ color: '#7530fe', fontSize: '12px' }}>
            Completed
          </Typography>
        )}
      </CenterBox>
      <CenterBox
        sx={{
          '> *': {
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            position: 'relative',
          },
        }}
        onClick={() => {
          setOPenDeleteModal(!openDeleteModal);
        }}
      >
        <FiMoreHorizontal />
        <CenterBox
          sx={{
            bgcolor: '#414550',
            display: openDeleteModal ? 'flex' : 'none',
            position: 'absolute',
            top: '70px',
            right: '1rem',
            gap: '.5rem',
          }}
        >
          <FiTrash />
          <Box>Delete</Box>
        </CenterBox>
      </CenterBox>
    </Box>
  );
}

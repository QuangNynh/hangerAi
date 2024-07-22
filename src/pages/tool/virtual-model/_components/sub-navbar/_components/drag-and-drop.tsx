/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import CenterBox from '../../../../../../components/common/center-box';

function DragAndDropImg() {
  const [isDragOver, setIsDragOver] = useState(false);
  const { setValue, watch } = useFormContext();

  const selectImage = watch('image');
  useEffect(() => {
    if (!selectImage) {
      return;
    }
    console.log(window.URL.createObjectURL(selectImage));

    console.log(watch('image'));
  }, [selectImage]);
  useEffect(() => {
    const dragElement = document.getElementById('file-image-input');
    const hiddenFileInput = document.getElementById('hidden-file-input');

    if (!hiddenFileInput || !dragElement) {
      return;
    }
    const clickFunc = () => {
      hiddenFileInput.click();
    };

    const onChange = (event: any) => {
      const tmpFile = event.target.files[0];
      const validImageTypes = [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/jpg',
      ];
      if (validImageTypes.includes(tmpFile.type.toLowerCase())) {
        setValue('image', tmpFile);
        // setCurrentImage(tmpFile);
        // setAddedImage(tmpFile);
      }
    };

    const dragoverFunc = (event: any) => {
      event.preventDefault();
      setIsDragOver(true);
    };

    const dragleaveFunc = (event: any) => {
      event.preventDefault();
      setIsDragOver(false);
    };

    const dropFunc = (event: any) => {
      event.preventDefault();
      if (event.dataTransfer.files[0]) {
        // setCurrentImage(event.dataTransfer.files[0]);
        // setAddedImage(event.dataTransfer.files[0]);
      }
      setIsDragOver(false);
    };

    dragElement.addEventListener('dragover', dragoverFunc);
    dragElement.addEventListener('dragleave', dragleaveFunc);
    dragElement.addEventListener('drop', dropFunc);
    dragElement.addEventListener('click', clickFunc);
    hiddenFileInput.addEventListener('change', onChange);

    return () => {
      dragElement.removeEventListener('dragover', dragoverFunc);
      dragElement.removeEventListener('dragleave', dragleaveFunc);
      dragElement.removeEventListener('drop', dropFunc);
      dragElement.removeEventListener('click', clickFunc);
      hiddenFileInput.removeEventListener('change', onChange);
    };
  }, []);

  //   const theme = useTheme();
  return (
    <Box
      sx={{
        outline: '2px #737277 dashed',
        borderRadius: '.375rem',
        bgcolor: '',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        svg: {
          fontSize: '6rem',
        },
      }}
    >
      <input
        accept={'image/*'}
        style={{ display: 'none' }}
        type="file"
        id="hidden-file-input"
      />
      <Box
        sx={{
          width: '400px',
          textAlign: 'center',
          display: selectImage ? 'none' : 'block',
        }}
      >
        <Typography
          sx={{
            color: '#737277',
            fontWeight: '800',
          }}
        >
          <FiUpload />
        </Typography>
        <Typography
          sx={{
            color: '#737277',
            fontWeight: '800',
          }}
        >
          Drag and drop (image) here
        </Typography>
        <Typography
          sx={{
            color: '#737277',
            fontWeight: '600',
            span: {
              color: '#d6b6ff',
            },
          }}
        >
          or <span>upload here</span>
        </Typography>
      </Box>
      <CenterBox
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          transition: '.2s',
          width: '100%',
          height: '100%',
          bgcolor: isDragOver ? 'rgba(0,0,0,0.5)' : 'transparent',
          cursor: 'pointer',
          padding: '1rem',
          boxSizing: 'border-box',
          img: {
            borderRadius: '6px',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          },
        }}
        id={'file-image-input'}

        // htmlFor={'hidden-file-input'}
      >
        {selectImage && <img src={window.URL.createObjectURL(selectImage)} />}
      </CenterBox>
    </Box>
  );
}
export default DragAndDropImg;

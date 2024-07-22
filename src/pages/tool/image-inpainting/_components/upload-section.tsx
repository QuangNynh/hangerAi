import { Typography } from '@mui/material';
import CenterBox from '../../../../components/common/center-box';
import DragAndDropImg from '../../../../components/common/input/drag-n-drop-img';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function UploadSection() {
  const schema = z.object({
    img: z
      .union([
        z
          .any()
          .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
          .refine(
            (file) =>
              ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'].includes(
                file?.type
              ),
            'Only .jpg, .jpeg, .png and .webp formats are supported.'
          ),
        z.string(),
      ])
      .optional(),
  });

  const method = useForm<{ img?: string | File }>({
    resolver: zodResolver(schema),
  });
  return (
    <CenterBox
      sx={{
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'start',
        flexShrink: 'none',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      <FormProvider {...method}>
        <Typography>Upload your image</Typography>
        <DragAndDropImg
          name="img"
          sx={{ width: '100%', aspectRatio: '1 / 1', height: 'auto' }}
        />
        <Typography>Choose from asset</Typography>
      </FormProvider>
    </CenterBox>
  );
}

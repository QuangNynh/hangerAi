import { Box, SxProps } from '@mui/material';
import { useMemo } from 'react';
import CustomFormText, {
  CustomFormTextProps,
} from './components/custom-form-text';

export interface BaseField {
  name: string;
  title?: string;
  inputSx?: SxProps;
  headerSx?: SxProps;
}
export type FieldList = BaseField &
  (
    | {
        type: 'number';
      }
    | ({
        type: 'text';
      } & CustomFormTextProps)
  );
export interface FieldLists {
  isHorizontal?: boolean;
  data: FieldList[];
}

function CustomRow({ field: { type, ...rest } }: { field: FieldList }) {
  return (
    <Box display={'flex'}>
      {type === 'text' && <CustomFormText {...rest} />}
    </Box>
  );
}
export default function CustomForm({ data, isHorizontal }: FieldLists) {
  const id = useMemo<number>(() => Math.floor(Math.random() * 1000), []);
  return (
    <Box
      sx={{
        '> *': {
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          mb: '2rem',
          '&:last-of-type': {
            mb: 0,
          },
        },
      }}
    >
      {data.map((field, index) => (
        <CustomRow key={`field_${id}_${index}`} field={field} />
      ))}
    </Box>
  );
}

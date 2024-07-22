import { SxProps, TextField, TextFieldProps } from '@mui/material';

export default function CustomTextField({ sx, ...prop }: TextFieldProps) {
  return (
    <TextField
      autoComplete="off"
      fullWidth
      sx={{
        '&,>*': {
          height:
            (sx as SxProps & { height?: number | string })?.height ?? '100%',
          width: (sx as SxProps & { width?: number | string })?.width ?? '100%',
        },
        input: {
          padding: '0.25rem',
          paddingX: '.5rem',
          color: 'white',
          boxSizing: 'border-box',
        },
        fieldset: {
          borderColor: 'rgb(160, 174, 192) !important',
          outline: 'none',
        },

        ...sx,
      }}
      {...prop}
    />
  );
}

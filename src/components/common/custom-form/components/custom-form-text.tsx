import { Fragment } from 'react/jsx-runtime';
import { BaseField } from '..';
import CenterBox from '../../center-box';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useAppContext } from '../../../../context/app-context/app-contex';

export interface CustomFormTextProps {
  isDisable?: boolean;
  placeholder?: string;
}

export default function CustomFormText({
  name,
  title,
  //   headerSx,
  inputSx,
  isDisable,
  placeholder,
}: CustomFormTextProps & BaseField) {
  const { control } = useFormContext();
  const { commonStyle } = useAppContext();
  return (
    <Fragment>
      <CenterBox
        sx={{
          justifyContent: 'start',
          paddingY: '.5rem',
          color: commonStyle.color_pr,
          //   ...(headerSx ? headerSx : {}),
        }}
      >
        {title}
      </CenterBox>
      <CenterBox sx={{ ...inputSx }}>
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <TextField
              sx={{
                input: {
                  paddingY: '.5rem',
                  paddingLeft: '1rem',
                  borderRadius: '4px',
                  bgcolor: commonStyle.bgcolor_sec,
                  color: `${commonStyle.color_pr} !important`,
                  fontWeight: 'normal !important',
                  '&::-ms-input-placeholder': {
                    color: commonStyle.color_sec,
                  },
                  '&::placeholder': {
                    color: commonStyle.color_sec,
                  },
                  ':disabled': {
                    ['WebkitTextFillColor']: commonStyle.color_third,
                  },
                },
                fieldset: {
                  '&,&:hover': {
                    // bgcolor: 'blue',
                    outline: 'none !important',
                    border: 'none !important',
                    cursor: 'not-allowed',
                  },
                },
              }}
              fullWidth
              value={value}
              onChange={onChange}
              placeholder={placeholder ?? ''}
              disabled={isDisable}
            />
          )}
        />
      </CenterBox>
    </Fragment>
  );
}

import { Box, Collapse } from '@mui/material';
import { useAppContext } from '../../../../../../context/app-context/app-contex';
import { useState } from 'react';
import { z } from 'zod';
import CustomForm, {
  FieldLists,
} from '../../../../../../components/common/custom-form';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface PasswordForm {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default function PasswordForm() {
  const { commonStyle } = useAppContext();
  const [open, setOpen] = useState<boolean>(false);

  const schema = z.object({
    oldPasswd: z.string().min(1).max(50),
    newPasswd: z.string().min(1).max(50),
    newPasswd_cf: z.string().min(1).max(50),
  });

  const fieldList: FieldLists = {
    data: [
      {
        name: 'oldPasswd',
        title: 'Enter Old Password',
        type: 'text',
      },
      {
        name: 'newPasswd',
        title: 'Enter New Password',
        type: 'text',
      },
      {
        name: 'newPasswd_cf',
        title: 'Confirm New Password',
        type: 'text',
      },
    ],
  };

  const methods = useForm<PasswordForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit = (data: PasswordForm) => {
    console.log(data);
  };

  return (
    <Box>
      <Box
        sx={{
          paddingBottom: '1rem',
          color: commonStyle.color_pr,
          borderBottom: `1px solid ${commonStyle.color_sec}`,
          mb: '1rem',
        }}
      >
        Security
      </Box>
      <Collapse in={!open}>
        <Box
          sx={{
            color: 'white',
            bgcolor: 'red',
            mb: '1rem',
            padding: '.75rem 2rem',
            borderRadius: '4px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setOpen(true)}
        >
          Change Password
        </Box>
      </Collapse>
      <Collapse in={open}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CustomForm {...fieldList} />
            <Box
              sx={{
                display: 'flex',
                mt: '2.5rem',
                mb: '2.5rem',
                '> *': {
                  bgcolor: commonStyle.bgcolor_third,
                  color: commonStyle.color_third,
                  borderRadius: '4px',
                  padding: '.75rem 2rem',
                  flex: 1,
                  display: 'flex',
                  cursor: 'pointer',
                  justifyContent: 'center',
                },
              }}
            >
              <Box onClick={() => setOpen(false)}>Cancel</Box>
              <Box ml={'1rem'}>Save</Box>
            </Box>
          </form>
        </FormProvider>
      </Collapse>
    </Box>
  );
}

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomForm, {
  FieldLists,
} from '../../../../../components/common/custom-form';
import { Box } from '@mui/material';
import { useAppContext } from '../../../../../context/app-context/app-contex';

interface GeneralTabForm {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
export default function GeneralTab() {
  const { commonStyle } = useAppContext();
  const schema = z.object({
    username: z.string().min(1).max(50),
    email: z.string().min(1).max(50),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
  });

  const fieldList: FieldLists = {
    data: [
      {
        name: 'username',
        title: 'Username',
        type: 'text',
        isDisable: true,
      },
      {
        name: 'email',
        title: 'Email',
        type: 'text',
        isDisable: true,
      },
      {
        name: 'firstName',
        title: 'First Name',
        type: 'text',
      },
      {
        name: 'lastName',
        title: 'Last Name',
        type: 'text',
      },
    ],
  };
  const methods = useForm<GeneralTabForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit = (data: GeneralTabForm) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CustomForm {...fieldList} />
        <Box
          sx={{
            display: 'flex',
            mt: '2.5rem',
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
          <Box>Cancel</Box>
          <Box ml={'1rem'}>Save</Box>
        </Box>
      </form>
    </FormProvider>
  );
}

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import CenterBox from '../../../components/common/center-box';
import DisplayBox from './_components/display-box';
import SelectionBox from './_components/selection-box';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface VirtualDressingRoomContextProps {
  showSelection: boolean;
  setShowSelection: React.Dispatch<React.SetStateAction<boolean>>;
}

const VirtualDressingRoomContext =
  createContext<VirtualDressingRoomContextProps>({
    showSelection: false,
    setShowSelection: () => {},
  });

export const useVirtualDR = () => useContext(VirtualDressingRoomContext);
export default function VirtualDressingRoom() {
  const [showSelection, setShowSelection] = useState<boolean>(false);

  const zImg = z
    .any()
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine(
      (file) =>
        ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'].includes(
          file?.type
        ),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional();
  const schema = z.object({
    model: zImg,
    shirt: zImg,
    jacket: zImg,
    pant: zImg,
    shoe: zImg,
    dress: zImg,
    upload_model: zImg,
    upload_shirt: zImg,
    upload_jacket: zImg,
    upload_pant: zImg,
    upload_shoe: zImg,
    upload_dress: zImg,
  });

  const methods = useForm({ resolver: zodResolver(schema) });
  return (
    <VirtualDressingRoomContext.Provider
      value={{ showSelection, setShowSelection }}
    >
      <CenterBox sx={{ '&, > *': { width: '100%', height: '100%' } }}>
        <FormProvider {...methods}>
          <form>
            <CenterBox sx={{ height: '100%', position: 'relative' }}>
              <DisplayBox />
              <SelectionBox />
            </CenterBox>
          </form>
        </FormProvider>
      </CenterBox>
    </VirtualDressingRoomContext.Provider>
  );
}

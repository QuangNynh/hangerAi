/* eslint-disable react-refresh/only-export-components */
import { Box } from '@mui/material';
import CenterBox from '../../../components/common/center-box';
import InpaintingToolbar from './_components/tool-bar';
import { createContext, useContext, useState } from 'react';

interface InpaingtingContextProp {
  currentImage: File | string | null;
  setCurrentImage: React.Dispatch<React.SetStateAction<string | File | null>>;
  openNavbar: boolean;
  setOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  currentTool: number;
  setCurrentTool: React.Dispatch<React.SetStateAction<number>>;
}
const InpaingtingContext = createContext<InpaingtingContextProp>({
  currentImage: null,
  setCurrentImage: () => {},
  openNavbar: false,
  setOpenNavbar: () => {},
  currentTool: -1,
  setCurrentTool: () => {},
});

export const useInpainting = () => useContext(InpaingtingContext);

export default function ImageInpainting() {
  const [currentImage, setCurrentImage] = useState<File | string | null>(null);
  const [openNavbar, setOpenNavbar] = useState<boolean>(false);
  const [currentTool, setCurrentTool] = useState<number>(-1);

  return (
    <InpaingtingContext.Provider
      value={{
        currentImage,
        setCurrentImage,
        openNavbar,
        setOpenNavbar,
        currentTool,
        setCurrentTool,
      }}
    >
      <CenterBox sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <Box
          flex={1}
          bgcolor={'red'}
          height={'100px'}
          onClick={() => setOpenNavbar(!openNavbar)}
        />
        <InpaintingToolbar />
      </CenterBox>
    </InpaingtingContext.Provider>
  );
}

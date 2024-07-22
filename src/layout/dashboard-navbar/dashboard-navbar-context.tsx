/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useState } from 'react';

interface DashboardNavbarContextParam {
  openSearchBox: boolean;
  setOpenSearchBox: React.Dispatch<React.SetStateAction<boolean>>;
  openProfile: boolean;
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardNavbarContext = createContext<DashboardNavbarContextParam>({
  openSearchBox: false,
  setOpenSearchBox: () => {},
  openProfile: false,
  setOpenProfile: () => {},
});

export const useDashboardNavbarContext = () =>
  useContext(DashboardNavbarContext);
export default function DashboardNavbarContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [openSearchBox, setOpenSearchBox] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  // const [isMobile, setIsMobile] = useState<boolean>(false);

  return (
    <DashboardNavbarContext.Provider
      value={{ openSearchBox, setOpenSearchBox, openProfile, setOpenProfile }}
    >
      {children}
    </DashboardNavbarContext.Provider>
  );
}

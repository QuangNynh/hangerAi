/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface AppContextParam {
  currentPath: string[];
  mode: string;
  commonStyle: Record<string, string | number>;
  isMobile: boolean;
  colorPalette: Record<string, Record<string, string | number>>;
  openPlanModal: boolean;
  setOpenPlanModal: React.Dispatch<React.SetStateAction<boolean>>;
  changeMode: () => void;
}

const AppContext = createContext<AppContextParam>({
  currentPath: [],
  mode: '',
  commonStyle: {},
  changeMode: () => {},
  isMobile: false,
  colorPalette: {},
  openPlanModal: false,
  setOpenPlanModal: () => {},
});

export const useAppContext = () => useContext(AppContext);
export default function AppContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [curentMode, setCurrentMode] = useLocalStorage('mode', 'dark');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [openPlanModal, setOpenPlanModal] = useState<boolean>(false);

  const changeMode = () => {
    if (curentMode === 'light') {
      setCurrentMode('dark');
      return;
    }
    setCurrentMode('light');
  };
  const currentPath = useMemo<string[]>(
    () =>
      window.location.pathname
        .split('/')
        .reduce<string[]>((prev: string[], curr: string) => {
          if (curr) {
            prev.push('/' + curr);
          }
          return prev;
        }, [] as string[]),
    [window.location.pathname]
  );

  useEffect(() => {
    function onResize() {
      setIsMobile(Boolean(window.innerWidth < 960));
    }
    function eventPlanModal(e: Event & { detail?: { state?: boolean } }) {
      if (!e.detail) {
        return;
      }
      if (e.detail.state === undefined) {
        setOpenPlanModal(!openPlanModal);
        return;
      }
      setOpenPlanModal(e.detail.state);
    }
    onResize();
    window.addEventListener('resize', onResize);
    window.addEventListener('plan-modal', eventPlanModal);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('plan-modal', eventPlanModal);
    };
  }, []);
  const commonStyle = useMemo<Record<string, string | number>>(
    () => ({
      bgcolor_pr: '#000000',
      bgcolor_sec: '#1d1e23',
      bgcolor_third: '#15161a',
      bgcolor_forth: '#414550',
      color_pr: '#ffffff',
      color_sec: '#6d6d70',
      color_third: '#9ba9bb',
      bgcolor_hl_pr: '#6904e9',
      color_hl_pr: 'white',
    }),
    [curentMode]
  );

  const colorPalette = useMemo<Record<string, Record<string, string | number>>>(
    () => ({
      navbar: {
        normal: '#8591a0',
        active: 'white',
      },
    }),
    [curentMode]
  );
  // const colorPalette: Record<string, Record<string, string | number>> = {
  //   navbar: {
  //     normal: '#8591a0',
  //     active: 'white',
  //   },
  // };
  return (
    <AppContext.Provider
      value={{
        currentPath,
        mode: '',
        commonStyle,
        changeMode,
        isMobile,
        colorPalette,
        openPlanModal,
        setOpenPlanModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

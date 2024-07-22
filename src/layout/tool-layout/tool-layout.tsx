import { Box, Fade, Typography } from '@mui/material';
import {
  Fragment,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAppContext } from '../../context/app-context/app-contex';
import CenterBox from '../../components/common/center-box';
import { TbHanger } from 'react-icons/tb';
import {
  FiChevronDown,
  FiHome,
  FiFolder,
  FiUser,
  FiHelpCircle,
  FiMenu,
} from 'react-icons/fi';
import { FaFolder } from 'react-icons/fa6';
import { FiArrowUp, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router';

interface NavOption {
  title: string;
  icon?: ReactNode;
  href: string;
}
interface ToolLayoutContext {
  openNavbar: boolean;
  setNavbar: (state?: boolean) => void;
}
const toolLayoutContext = createContext<ToolLayoutContext>({
  openNavbar: true,
  setNavbar: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useToolLayout = () => useContext(toolLayoutContext);

export default function ToolLayout({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const { isMobile, commonStyle } = useAppContext();
  const navigate = useNavigate();
  const [openNavbar, setOpenNavbar] = useState<boolean>(!isMobile);
  const [navOption, setNavOption] = useState<boolean>(false);
  const navOptionList = useMemo<NavOption[][]>(
    () => [
      [
        {
          title: 'Go to Dashboard',
          href: '/dashboard/home',
          icon: <FiHome />,
        },
        {
          title: 'Open Assets',
          href: '/assets',
          icon: <FiFolder />,
        },
        {
          title: 'My Account',
          href: '/dashboard/account',
          icon: <FiUser />,
        },
      ],
      [
        {
          title: 'How to use',
          href: '#',
          icon: <FiHelpCircle />,
        },
        {
          title: 'Contact Us',
          href: '#',
        },
      ],
    ],
    []
  );

  function setNavbar(state?: boolean) {
    console.log('MIn');

    setOpenNavbar(state === undefined ? !openNavbar : state);
  }

  useEffect(() => {
    if (!isMobile) {
      setOpenNavbar(true);
    }
  }, [isMobile]);
  return (
    <toolLayoutContext.Provider value={{ openNavbar, setNavbar }}>
      <Box
        sx={{
          width: '100vw !important',
          height: '100vh !important',
          bgcolor: 'black',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: '100%',
            // height: '60px',
            borderBottom: '1px solid #6d6d70',
            paddingX: '1rem',
            boxSizing: 'border-box',
            paddingY: '6px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <CenterBox
            sx={{
              height: '47px',
              maxWidth: '500px',
              width: '100%',
              gap: '12px',
              justifyContent: 'start',
            }}
          >
            <CenterBox
              sx={{
                width: 'fit-content',
                position: 'relative',
              }}
            >
              <CenterBox
                sx={{
                  zIndex: 9998,
                  cursor: 'pointer',
                  '> svg': {
                    color: 'white',
                    '&:first-of-type': { width: '1.75rem', height: '1.75rem' },
                  },
                }}
                onClick={() => setNavOption(!navOption)}
              >
                <TbHanger />
                <FiChevronDown />
              </CenterBox>
              <Box
                sx={{
                  position: 'absolute',
                  display: navOption ? 'block' : 'none',
                  top: '2rem',
                  left: 0,
                  zIndex: 9998,
                }}
              >
                <Fade in={navOption}>
                  <Box
                    sx={{
                      width: '200px',
                      bgcolor: 'rgb(40, 43, 47)',
                      borderRadius: '12px',
                      gap: '.5rem',
                      flexDirection: 'column',
                      display: 'flex',
                      paddingY: '.5rem',
                    }}
                  >
                    {navOptionList.map((section, sectionIndex) => (
                      <Fragment key={`nav_option_${sectionIndex}`}>
                        {sectionIndex !== 0 && (
                          <Box borderBottom={'1px solid rgb(65, 69, 80)'} />
                        )}
                        {section.map((item, itemIndex) => (
                          <CenterBox
                            sx={{
                              cursor: 'pointer',
                              height: '32px',
                              paddingX: '12px',
                              gap: '.5rem',
                              transition: '.2s',
                              '*': { color: 'white !important' },
                              '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                              },
                            }}
                            key={`nav_option_${sectionIndex}_${itemIndex}`}
                            onClick={() => navigate(item.href)}
                          >
                            {item.icon ?? (
                              <Box width={'16px'} height={'16px'} />
                            )}
                            <Typography flex={1}>{item.title}</Typography>
                          </CenterBox>
                        ))}
                      </Fragment>
                    ))}
                  </Box>
                </Fade>
              </Box>
            </CenterBox>
            <CenterBox>
              <Typography
                sx={{ fontSize: '14px', color: 'rgb(160, 174, 192)' }}
              >{`Virtual Model`}</Typography>
            </CenterBox>
            <CenterBox
              sx={{
                gap: '8px',
                'svg:first-of-type': {
                  width: '20px',
                  height: '20px',
                },
                '*': {
                  color: 'white',
                },
              }}
            >
              <FaFolder />
              <Typography
                sx={{ fontSize: '14px', color: '' }}
              >{`Virtual Model`}</Typography>
              <FiChevronDown />
            </CenterBox>
          </CenterBox>
          <CenterBox
            sx={{
              gap: '1rem',
              ...(isMobile ? { height: '47px' } : { flex: 1 }),
            }}
          >
            {/* {isMobile && (
              <Box
                sx={{
                  '&,svg': {
                    width: '1.75rem',
                    height: '1.75rem',
                  },
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '2rem',
                  display: 'flex',
                  cursor: 'pointer',
                  '*': {
                    color: 'white',
                  },
                }}
                onClick={() => {
                  setOpenNavbar(!openNavbar);
                }}
              >
                <FiMenu />
              </Box>
            )} */}
            <CenterBox
              sx={{
                flex: 1,
                color: 'white',
                gap: '.5rem',
                svg: { width: '16px', height: '16px' },
                justifyContent: 'end',
              }}
            >
              <Typography>{`99 generations left`}</Typography>
              <FiInfo />
            </CenterBox>
            <CenterBox
              sx={{
                width: '100px',
                bgcolor: 'rgb(105, 4, 233)',
                height: 'calc(100% - 1rem)',
                color: 'white',
                gap: '.5rem',
                fontSize: '14px',
                borderRadius: '4px',
                cursor: 'pointer',
                // mt: '.5rem',
              }}
            >
              <FiArrowUp fontWeight={700} />
              Upgrade
            </CenterBox>
          </CenterBox>
        </Box>
        <Box sx={{ flex: 1, minHeight: 0 }}>{children}</Box>
      </Box>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: navOption ? 'block' : 'none',
          position: 'fixed',
          zIndex: 9997,
          top: 0,
          left: 0,
        }}
        onClick={() => {
          setNavOption(false);
        }}
      />
    </toolLayoutContext.Provider>
  );
}

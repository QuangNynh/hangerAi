/* eslint-disable no-constant-condition */
import { Box, Collapse, Link, Typography } from '@mui/material';
import { Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import CustomNavBar, { NavBar } from './navbar-component';
import { FiHome, FiFolder, FiMessageSquare, FiHeart } from 'react-icons/fi';
import DashboardHeader from './dashboard-header';
import { useAppContext } from '../../context/app-context/app-contex';
import DashboardNavbarContextProvider from './dashboard-navbar-context';
import CenterBox from '../../components/common/center-box';
import CustomNote from '../../components/common/custom-note';
import setPlanModal from '../../utils/event/set-plan-modal';

interface DashboardNavbarProps {
  children: ReactNode;
}

export default function DashboardNavbar({ children }: DashboardNavbarProps) {
  const { isMobile, commonStyle } = useAppContext();
  const [openNav, setOpenNav] = useState<boolean>(!isMobile);
  const [currentProj, setCurrentProj] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [maxProj, _setMaxProj] = useState<number>(2);
  const title =
    'You are limited to 3 projects per workspace on the Free Plan. Upgrade for more projects.';
  const navbars = useMemo<NavBar[][]>(
    () => [
      [
        {
          title: 'Home',
          href: '/home',
          icon: <FiHome />,
        },
        {
          title: 'Chatbot',
          href: '/chat-bot',
          icon: <FiMessageSquare />,
        },
      ],
      [
        {
          title: 'My Assets',
          href: '#',
          icon: <FiFolder />,
        },
        {
          title: 'Favorite Assets',
          href: '#',
          icon: <FiHeart />,
        },
      ],
      [
        {
          title: 'Virtual Model',
          href: '/tool/virtual-model',
          isNoneDashboard: true,
          // children: [
          //   { title: 'Generate Videos', href: '/generate-video' },
          //   { title: 'Edit Videos', href: '/edit-video' },
          //   { title: 'Generate Audio', href: '/generate-audio' },
          // ],
        },
        {
          title: 'Virtual Dressing Room',
          href: '/tool/virtual-dressing-room',
          isNoneDashboard: true,
          // children: [
          //   { title: 'Generate Videos', href: '/generate-video' },
          //   { title: 'Edit Videos', href: '/edit-video' },
          //   { title: 'Generate Audio', href: '/generate-audio' },
          // ],
        },
        // {
        //   title: 'Videos',
        //   href: '/videos',
        //   children: [
        //     { title: 'Generate Videos', href: '/generate-video' },
        //     { title: 'Edit Videos', href: '/edit-video' },
        //     { title: 'Generate Audio', href: '/generate-audio' },
        //   ],
        // },
        // {
        //   title: 'Images',
        //   href: '/images',
        //   children: [
        //     { title: 'Generate Images', href: '#' },
        //     { title: 'Edit Images', href: '#' },
        //   ],
        // },
      ],
    ],
    []
  );

  useEffect(() => {
    if (isMobile) {
      setOpenNav(false);
    } else {
      setOpenNav(true);
    }
  }, [isMobile]);
  return (
    <DashboardNavbarContextProvider>
      <Box
        sx={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          display: 'flex',
        }}
      >
        {isMobile && openNav && (
          <Box
            sx={{
              position: 'fixed',
              right: 0,
              bgcolor: '#afb1b880',
              width: '100vw',
              height: '100vh',
              zIndex: 9998,
            }}
            onClick={() => setOpenNav(false)}
          />
        )}
        <Collapse
          in={openNav}
          orientation="horizontal"
          timeout={500}
          sx={{
            ...(isMobile
              ? { position: 'fixed', height: '100vh', zIndex: 9999 }
              : {}),
          }}
        >
          <Box
            sx={{
              bgcolor: commonStyle.bgcolor_pr,
              width: '250px',
              height: '100vh',
              padding: openNav ? '1rem' : '0',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              borderRight: `1px solid ${commonStyle.color_sec}`,
              overflow: 'auto',
              overflowX: 'hidden',
              scrollbarColor: '#383838 #21212100',
              // '::-webkit-scrollbar': {
              //   width: '10px',
              //   bgcolor: 'transparent',
              // },
              // '::-webkit-scrollbar-track': {
              //   bgcolor: 'transparent',
              // },
              // '::-webkit-scrollbar-thumb': {
              //   borderRadius: '4px',
              //   background: commonStyle.color_sec,
              // },
            }}
          >
            <Box sx={{ width: '100%', flex: 1 }}>
              <Box
                sx={{
                  bgcolor: commonStyle.bgcolor_third,
                  mb: '1rem',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  '> *': {
                    padding: '.5rem',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: `1px solid gray`,
                  }}
                >
                  <Box
                    sx={{
                      width: '30px',
                      height: '30px',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      margin: '.5rem',
                    }}
                  >
                    <img
                      width={'30px'}
                      height={'30px'}
                      src="https://placehold.co/600x600/004d40/white?text=V"
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: commonStyle.color_pr }}>
                      Việt
                    </Typography>
                    {false ? (
                      <Box
                        sx={{
                          color: 'white',
                          fontSize: '.75rem',
                          bgcolor: '#008f1d',
                          width: 'fit-content',
                          padding: '.25rem',
                          borderRadius: '4px',
                        }}
                      >
                        Standard
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          color: 'white',
                          fontSize: '.75rem',
                          backgroundImage:
                            'linear-gradient(140deg, #EADEDB 0%, #BC70A4 50%, #BFD641 75%)',
                          width: 'fit-content',
                          padding: '.25rem',
                          borderRadius: '4px',
                        }}
                      >
                        Premium
                      </Box>
                    )}
                  </Box>
                  <Box />
                </Box>
              </Box>
              {navbars.map((section, index) => (
                <Fragment key={`navbar_section_${index}`}>
                  {index !== 0 && (
                    <Box
                      borderTop={`1px solid gray`}
                      marginY={'0.25rem'}
                      boxSizing={'border-box'}
                    />
                  )}
                  {section.map((parentNav: NavBar, nav_index) => (
                    <CustomNavBar
                      key={`navbar_section_${index}_${nav_index}`}
                      data={parentNav}
                      sectionKey={`navbar_section_${index}_${nav_index}`}
                    />
                  ))}
                </Fragment>
              ))}
            </Box>
            <Box
              sx={{
                bgcolor: commonStyle.bgcolor_sec,
                borderRadius: '5px',
                height: '150px',
                minHeight: '150px',
                display: 'flex',
                flexDirection: 'column',
                gap: '.5rem',
              }}
            >
              <CenterBox
                sx={{
                  color: 'rgb(214, 182, 255)',
                  paddingTop: '16px',
                  paddingBottom: '8px',
                  fontSize: '14px',
                  lineHeight: '20px',
                  gap: '.5rem',
                  borderBottom: '1px solid rgb(65, 69, 80)',
                }}
              >
                <Typography>Free Plan</Typography>
                <CustomNote
                  title={title}
                  color={`rgb(214, 182, 255)`}
                  bgcolor="#575b6b"
                  size={'16px'}
                  textSx={{ fontSize: '11px' }}
                />
              </CenterBox>
              <Box
                sx={{
                  marginX: '.5rem',
                  height: '24px',
                  borderRadius: '12px',
                  position: 'relative',
                  boxSizing: 'border-box',
                  bgcolor: 'rgb(65, 69, 80)',
                  border: '2px solid rgb(87, 91, 107)',
                }}
              >
                <Box
                  sx={{
                    width: `${(207 / maxProj) * currentProj}px`,
                    boxSizing: 'border-box',
                    height: '24px',
                    bgcolor: '#6904e9',
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    border: '2px solid #d7d8f4',
                    minWidth: '24px',
                    borderRadius:
                      currentProj === maxProj || currentProj === 0
                        ? '12px'
                        : '0px',
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                    transition: '.5s',
                  }}
                />
                <CenterBox
                  sx={{
                    width: '24px',
                    height: '24px',
                    bgcolor: '#d7d8f4',
                    position: 'absolute',
                    top: '-2px',
                    left: '-2px',
                    fontSize: '10px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    color: '#6904e9',
                  }}
                  onClick={() =>
                    setCurrentProj(currentProj >= maxProj ? 0 : currentProj + 1)
                  }
                >
                  {currentProj}
                </CenterBox>
              </Box>
              <CenterBox
                sx={{ color: 'white', fontSize: '12px' }}
              >{`${currentProj} of ${maxProj} Projects Created`}</CenterBox>
              <CenterBox
                sx={{
                  bgcolor: '#6904e9',
                  color: 'white',
                  height: '32px',
                  marginX: '.5rem',
                  paddingX: '8px',
                  mb: '1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
                onClick={() => setPlanModal(true)}
              >
                Upgrade your plan
              </CenterBox>
            </Box>
            <CenterBox
              sx={{
                gap: '.25rem',
                mt: '8px',
                fontSize: '10px !important',
                cursor: 'pointer',
                a: {
                  color: 'white',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
                p: { color: 'rgb(124, 131, 156)' },
              }}
            >
              <Link>Terms of Use</Link>
              and
              <Link>Privacy Policy</Link>
            </CenterBox>
          </Box>
        </Collapse>
        <Box sx={{ flex: 1 }}>
          <DashboardHeader openNav={openNav} setOpenNav={setOpenNav} />
          <Box
            sx={{
              width: '100%',
              height: 'calc(100vh - 4rem)',
              bgcolor: commonStyle.bgcolor_pr,
              overflow: 'auto',
              ...(isMobile
                ? {
                    '::-webkit-scrollbar': {
                      display: 'none !important',
                    },
                  }
                : {
                    scrollbarColor: '#383838 #21212100',
                    // '::-webkit-scrollbar': {
                    //   width: '10px',
                    //   height: '10px',
                    //   bgcolor: 'transparent',
                    // },
                    // '::-webkit-scrollbar-track': {
                    //   bgcolor: 'transparent',
                    // },
                    // '::-webkit-scrollbar-thumb': {
                    //   background: '#414550',
                    //   borderRadius: '20px',
                    // },
                    // '::-webkit-scrollbar-corner': {
                    //   background: '#0000',
                    // },
                  }),
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </DashboardNavbarContextProvider>
  );
}

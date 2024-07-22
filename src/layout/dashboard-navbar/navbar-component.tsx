import { Box, Collapse } from '@mui/material';
import { Fragment, ReactNode, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context/app-context/app-contex';

export type NavBar = {
  title: string;
  href: string;
  isNoneDashboard?: boolean;
  icon?: ReactNode;
  children?: {
    title: string;
    href: string;
    isNoneDashboard?: boolean;
  }[];
};

export default function CustomNavBar({
  data,
  sectionKey,
}: {
  data: NavBar;
  sectionKey: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { currentPath, commonStyle, colorPalette } = useAppContext();
  const navigate = useNavigate();
  return (
    <Fragment>
      <Box
        sx={{
          boxSizing: 'border-box',
          paddingY: '12px',
          paddingX: '1rem',
          display: 'flex',
          cursor: 'pointer',
          width: '100%',
          alignItems: 'center',
          fontSize: '14px',
          color: colorPalette?.navbar?.normal,
          // ...(currentPath.includes(data.href)
          //   ? {
          //       color: colorPalette.navbar.active,
          //     }
          //   : {}),
          ...(!currentPath.includes(data.href)
            ? {}
            : data.children
            ? { color: commonStyle.color_pr }
            : {
                color: commonStyle.color_pr,
                // fontWeight: 'bold !important',
                bgcolor: commonStyle.bgcolor_sec,
                borderRadius: '4px',
              }),
          '&:hover': {
            color: commonStyle.color_pr,
            ...(!data.children
              ? { borderRadius: '4px', bgcolor: commonStyle.bgcolor_sec }
              : {}),
          },
        }}
        onClick={() => {
          if (!data.children) {
            navigate(
              data.isNoneDashboard ? `${data.href}` : `/dashboard${data.href}`
            );
          }
          setIsOpen(!isOpen);
        }}
      >
        <Box
          sx={{
            width: '1rem',
            height: '1rem',
            mr: '.5rem',
          }}
        >
          {!data.children ? (
            data.icon ?? <Fragment />
          ) : isOpen ? (
            <FaChevronUp />
          ) : (
            <FaChevronDown />
          )}
        </Box>
        <Box>{data.title}</Box>
      </Box>
      {data.children && (
        <Collapse in={isOpen}>
          {data.children.map((childNav, index) => {
            return (
              <Box
                key={`${sectionKey}_${index}`}
                sx={{
                  width: '100%',
                  padding: '1rem',
                  paddingLeft: '2.5rem',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  fontSize: '14px',
                  ...(currentPath.includes(data.href) &&
                  currentPath.includes(childNav.href)
                    ? {
                        // fontWeight: 'bold !important',
                        bgcolor: commonStyle.bgcolor_sec,
                        borderRadius: '4px',
                        color: commonStyle.color_pr,
                      }
                    : { color: colorPalette.navbar.normal }),
                  '&:hover': {
                    // fontWeight: 'bold !important',
                    bgcolor: commonStyle.bgcolor_sec,
                    borderRadius: '4px',
                    color: commonStyle.color_pr,
                  },
                }}
                onClick={() =>
                  navigate(
                    childNav.isNoneDashboard
                      ? childNav.href
                      : `/dashboard${data.href}${childNav.href}`
                  )
                }
              >
                {childNav.title}
              </Box>
            );
          })}
        </Collapse>
      )}
    </Fragment>
  );
}

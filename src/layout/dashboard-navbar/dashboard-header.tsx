import { Box, TextField } from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import { useAppContext } from '../../context/app-context/app-contex';
import { useState } from 'react';
import DashboardSearch from './dashboard-search';
import { useDashboardNavbarContext } from './dashboard-navbar-context';
import DashboardProfile from './dashboard-profile';
import { MdHelp } from 'react-icons/md';

export default function DashboardHeader({
  setOpenNav,
  openNav,
}: {
  openNav: boolean;
  setOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isMobile, commonStyle } = useAppContext();
  const { setOpenSearchBox, setOpenProfile, openProfile } =
    useDashboardNavbarContext();
  const [searchParam, setSearchParam] = useState<string>('');
  return (
    <Box
      sx={{
        height: '60px',
        width: '100%',
        bgcolor: commonStyle.bgcolor_pr,
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        borderBottom: `1px solid ${commonStyle.color_sec}`,
      }}
    >
      <Box width={'2rem'} />
      {isMobile && (
        <Box
          sx={{
            width: '3rem',
            height: '3rem',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2rem',
            display: 'flex',
            cursor: 'pointer',
            '*': {
              color: commonStyle.color_sec,
            },
          }}
          onClick={() => {
            setOpenNav(!openNav);
          }}
        >
          <FiMenu />
        </Box>
      )}
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <TextField
          autoComplete="off"
          value={searchParam}
          onClick={() => {
            setOpenSearchBox(true);
            setOpenProfile(false);
          }}
          onChange={(e) => {
            setSearchParam(e.target.value ?? '');
          }}
          sx={{
            maxWidth: '400px !important',
            width: '100%',
            input: {
              borderRadius: '4px',
              bgcolor: commonStyle.bgcolor_sec,
              color: `${commonStyle.color_pr} !important`,
              paddingY: 0.5,
              paddingX: '1rem',
              fontWeight: 'normal !important',
              '&::-ms-input-placeholder': {
                color: commonStyle.color_sec,
              },
              '&::placeholder': {
                color: commonStyle.color_sec,
              },
            },
            fieldset: {
              '&,&:hover': {
                // bgcolor: 'blue',
                outline: 'none !important',
                border: 'none !important',
              },
            },
          }}
          placeholder="Search for tools, assets and projects"
          onBlur={() => {
            setOpenSearchBox(false);
          }}
        />
        <DashboardSearch strValue={searchParam} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: '2rem' }}>
        <Box
          sx={{
            borderRadius: '0.75rem',
            ml: '2rem',
            cursor: 'pointer',
            '&, >*': {
              width: '24px',
              height: '24px',
              color: '#A5B4C7',
              // fontSize: '24px !important',
            },
          }}
        >
          <MdHelp />
        </Box>
        <Box
          sx={{
            ml: '1rem',
            width: '30px',
            height: '30px',
            borderRadius: '1rem',
            bgcolor: 'gray',
            position: 'relative',
            cursor: 'pointer',
          }}
          onClick={() => setOpenProfile(!openProfile)}
        >
          <DashboardProfile />
        </Box>
      </Box>
    </Box>
  );
}

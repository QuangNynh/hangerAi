import { Box, Collapse, Typography } from '@mui/material';
import { useDashboardNavbarContext } from './dashboard-navbar-context';
import { useEffect, useState } from 'react';
import getSearchParam, {
  GetSearchParam,
  defaultGetSearchParam,
} from '../../services/apis/get-search-param';
import DashboardSearchElement from './dashboard-search-element';
import { useAppContext } from '../../context/app-context/app-contex';
import { FiMessageSquare } from 'react-icons/fi';

interface DashboardSearchProp {
  strValue: string;
}
export default function DashboardSearch({ strValue }: DashboardSearchProp) {
  const { commonStyle } = useAppContext();
  const { openSearchBox } = useDashboardNavbarContext();
  const [searchResult, setSearchResult] = useState<GetSearchParam>({
    assets: [],
    tools: [],
  });
  useEffect(() => {
    if (strValue && openSearchBox) {
      console.log('test');
      getSearchParam('').then((data) => {
        setSearchResult(data);
      });
    } else {
      setSearchResult(defaultGetSearchParam);
    }
  }, [strValue, openSearchBox]);
  return (
    <Collapse
      in={openSearchBox}
      sx={{
        position: 'absolute',
        top: '2.5rem',
        maxWidth: '400px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          bgcolor: commonStyle.bgcolor_sec,
          '&,*': {
            color: commonStyle.color_sec,
          },
          borderRadius: '4px',
          '.SearchHeader': {
            '&:first-of-type': {
              borderTop: 'none',
            },
            paddingLeft: '.5rem',
            paddingY: '.5rem',
            fontWeight: 'bold',
            borderTop: `1px solid ${commonStyle.color_sec}`,
          },
        }}
      >
        <Box className={'SearchHeader'}>Tools</Box>
        {searchResult.tools.map((record, index) => {
          return (
            <DashboardSearchElement
              data={record}
              key={`Search_tool_${index}`}
            />
          );
        })}
        <Box className={'SearchHeader'}>Assets</Box>
        {searchResult.assets.map((record, index) => {
          return (
            <DashboardSearchElement
              data={record}
              key={`Search_asset_${index}`}
            />
          );
        })}
        <Box
          className={'SearchHeader'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: commonStyle.bgcolor_hl_pr,
            '*': {
              color: commonStyle.color_hl_pr,
            },
          }}
        >
          <Typography flex={1}>Ask our chatbot</Typography>
          <Box
            sx={{
              width: '3rem',
              height: '2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1.25rem',
            }}
          >
            <FiMessageSquare />
          </Box>
        </Box>
      </Box>
    </Collapse>
  );
}

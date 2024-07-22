import { Box, Button, Typography } from '@mui/material';
import { useAppContext } from '../../../../context/app-context/app-contex';
import CustomNote from '../../custom-note';
import { TbPointFilled } from 'react-icons/tb';
import CenterBox from '../../center-box';

export interface PlanBoxProps {
  title: string;
  price: number;
  credit: number;
  index: number;
  priceSubText: string[];
  description: { text: string; subtext?: string }[];
  isPoppular?: boolean;
  isCurrent?: boolean;
  creditText: string;
}
export default function PlanBox({
  title,
  credit,
  price,
  index,
  priceSubText,
  description,
  creditText,
  isCurrent,
  isPoppular,
}: PlanBoxProps) {
  const { isMobile } = useAppContext();
  return (
    <Box
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        maxWidth: isMobile ? '100vw' : '465px',
        ...(isMobile ? { minHeight: '580px' } : {}),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: isPoppular ? `3px solid #6904e9` : `2px solid #d6d6d6`,
        borderRadius: '8px',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          borderBottom: `2px solid #d6d6d6`,
        }}
      >
        <Typography sx={{ fontSize: '12px' }}>{title}</Typography>
        <Box
          sx={{
            display: 'flex',
            mb: '16px',
            height: '40px',
          }}
        >
          <Box
            sx={{
              fontSize: '40px',
              fontWeight: '400',
              lineHeight: '1',
            }}
          >
            ${price}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              ml: '.5rem',
              '> *': { color: '#7c839c' },
            }}
          >
            {priceSubText.map((str, sindex) => (
              <Box key={`plan_${index}_${sindex}`}>{str}</Box>
            ))}
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#6904e9',
              mr: '.5rem',
            }}
          >
            {credit} {creditText}
          </Typography>
          <CustomNote
            title={`your credits will reset to ${credit} after each month`}
          />
        </Box>
      </Box>
      <Box sx={{ flex: 1, padding: '1rem', minWidth: 0 }}>
        {description.map((des, sindex) => (
          <Box
            key={`monthly_plan_${index}_${sindex}`}
            sx={{
              display: 'flex',
              alignItems: 'start',
              textOverflow: 'ellipsis',
              width: '100%',
              ['.list']: {
                flex: 1,
                lineHeight: 2,
              },
              marginBottom: '8px',
            }}
          >
            <CenterBox sx={{ width: '2rem', height: '2rem' }}>
              <TbPointFilled />
            </CenterBox>
            <Box className={'list'} flex={1}>
              {des.text}
            </Box>
            {des.subtext && (
              <CenterBox sx={{ width: '2rem', height: '2rem' }}>
                <CustomNote title={des.subtext} />
              </CenterBox>
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{ padding: '24px', paddingTop: '0px' }}>
        <Button
          disabled={isCurrent}
          sx={{
            width: '100%',
            textTransform: 'none',
            textAlign: 'center',
            height: '48px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 500,
            borderRadius: '6px',
            ...(isPoppular
              ? { color: 'white', bgcolor: '#6904e9' }
              : {
                  bgcolor: 'white',
                  color: '#6904e9',
                  border: '1px solid #6904e9',
                  boxSizing: 'border-box',
                }),
            '&:disabled': {
              bgcolor: '#f7f7f7',
              color: '#a0aec3',
              border: 'none',
            },
          }}
        >
          {isCurrent ? 'Current' : `Upgrade to ${title} member`}
        </Button>
      </Box>
      {isPoppular && (
        <Box
          sx={{
            position: 'absolute',
            top: '-11px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CenterBox
            sx={{
              fontSize: '10px',
              height: '18px',
              width: '90px',
              color: 'white',
              bgcolor: '#6904e9',
              textAlign: 'center',
              borderRadius: '9px',
            }}
          >
            Most popular
          </CenterBox>
        </Box>
      )}
    </Box>
  );
}

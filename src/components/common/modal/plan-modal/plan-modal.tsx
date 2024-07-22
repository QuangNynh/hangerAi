import { Box, Typography } from '@mui/material';
import CenterBox from '../../center-box';
import { FiX } from 'react-icons/fi';
import { useMemo, useState } from 'react';
import PlanBox, { PlanBoxProps } from './plan-box';
import { useAppContext } from '../../../../context/app-context/app-contex';
import setPlanModal from '../../../../utils/event/set-plan-modal';

export default function PlanInfomationModal() {
  const { isMobile, openPlanModal } = useAppContext();
  const [selectedTab, setSelectedTab] = useState<1 | 2>(1);
  const planList = useMemo<Omit<PlanBoxProps, 'index'>[]>(
    () => [
      {
        title: 'Free',
        price: 0,
        credit: 100,
        creditText: 'credits',
        isCurrent: true,
        description: [
          {
            text: "Can't Buy More Credits",
          },
          { text: "Can't upload Model Image in Virtual Dressing Room" },
          {
            text: "Can't upload folder of image in Product Image Descriptions",
          },
          { text: "Can't upload folder of image in Product Catalog" },
          { text: '3 image project 3 content writing project' },
          { text: 'Limited image and content writing options' },
        ],
        priceSubText: ['per editor per month', 'billed monthly'],
      },
      {
        title: 'Standard',
        price: 9.9,
        credit: 600,
        creditText: 'credits/month',
        isPoppular: true,
        description: [
          {
            text: 'Credit reset to 600 every month starting from your subcription date. Buy more as needed',
            subtext: `your credits will reset to 600 after each month. The remaining credits will be deleted`,
          },
          { text: 'Upload Model Image in Virtual Dressing Room' },
          { text: 'Upload folder of image in Product Image Descriptions' },
          { text: 'Upload folder of maximum 50 image in Product Catalog' },
          { text: 'Unlimited edit image and content writing project' },
        ],
        priceSubText: ['per editor per month', 'billed monthly'],
      },
      {
        title: 'Pro',
        price: 24.9,
        credit: 2000,
        creditText: 'credits/month',
        description: [
          {
            text: 'Credit reset to 2000 every month starting from your subcription date. Buy more as needed',
            subtext: `your credits will reset to 2000 after each month. The remaining credits will be deleted`,
          },
          { text: 'Upload folder of maximum 100 image in Product Catalog' },
        ],
        priceSubText: ['per editor per month', 'billed monthly'],
      },
    ],
    []
  );
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10000,
        bgcolor: 'white',
        display: openPlanModal ? 'flex' : 'none',
        flexDirection: 'column',
      }}
    >
      <CenterBox
        sx={{
          position: 'relative',
          height: '36px',
          bgcolor: '#6f4af0',
          '> *': {
            fontSize: '12px',
            color: 'white',
          },
        }}
      >
        <Typography>Test</Typography>
      </CenterBox>
      <CenterBox
        sx={{
          padding: '20px 40px',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Typography
          sx={{ fontWeight: 700, fontSize: '24px', lineHeight: '32px' }}
        >
          Upgrade to higher tier access more feature
        </Typography>
        <Typography sx={{ fontSize: '12px', marginY: '12px' }}>
          You are currently
        </Typography>
        <CenterBox>
          <Box
            sx={{
              display: 'flex',
              bgcolor: '#f1f1f4',
              width: '200px',
              position: 'relative',
              borderRadius: '18px',
              overflow: 'hidden',
              height: '36px',
              '> *': {
                width: '100px',
                textAlign: 'center',
                height: '36px',
                position: 'absolute',
                transition: '.5s',
                [`&:nth-of-type(${selectedTab + 1})`]: {
                  color: 'white !important',
                },
              },
            }}
          >
            <Box
              sx={{
                borderRadius: '18px',
                width: '100px',
                height: '100%',
                bgcolor: 'black',
                transform: `translateX(${selectedTab === 1 ? 0 : 100}px)`,
              }}
            />
            <CenterBox
              onClick={() => setSelectedTab(1)}
              sx={{ top: 0, left: 0, cursor: 'pointer' }}
            >
              <Box fontSize={'12px'}>Monthly</Box>
            </CenterBox>
            <CenterBox
              sx={{ top: 0, right: 0, cursor: 'pointer' }}
              onClick={() => setSelectedTab(2)}
            >
              <Box fontSize={'12px'}>Yearly</Box>
            </CenterBox>
          </Box>
        </CenterBox>
        <CenterBox
          sx={{
            position: 'absolute',
            right: 40,
            top: 20,
            '> *': {
              width: '16px',
              height: '32px',
            },
          }}
          onClick={() => setPlanModal(false)}
        >
          <FiX />
        </CenterBox>
      </CenterBox>
      <CenterBox sx={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            height: '90%',
            width: 'auto',
            flexDirection: isMobile ? 'column' : 'row',
            paddingX: '40px',
            ...(isMobile
              ? {
                  '> *': {
                    marginBottom: '24px',
                  },
                }
              : {
                  minWidth: 0,
                  '> *': {
                    marginRight: '24px',
                    '&:last-of-type': {
                      mr: 0,
                    },
                  },
                }),
          }}
        >
          {planList.map((plan, index) => (
            <PlanBox {...plan} key={`plan_${index}`} index={index} />
          ))}
        </Box>
      </CenterBox>
      <CenterBox
        sx={{
          position: 'relative',
          height: '36px',
          mt: '12px',
          mb: '24px',
          '> *': {
            fontSize: '12px',
            color: '#7c839c',
            ml: '.15rem',
            '&.link': {
              color: '#6f4af0',
              cursor: 'pointer',
            },
          },
        }}
      >
        <Typography>Don't see what you need?</Typography>
        <Typography className="link">View FAQs</Typography>
        <Typography>or</Typography>
        <Typography className="link">Contact us.</Typography>
      </CenterBox>
    </Box>
  );
}

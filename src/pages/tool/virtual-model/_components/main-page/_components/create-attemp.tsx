import { Box, Typography } from '@mui/material';
import { SubnavBarForm, useVirtualModel } from '../../..';
import CenterBox from '../../../../../../components/common/center-box';
import { FiCopy, FiDownload, FiEdit } from 'react-icons/fi';
import { IoMdLock } from 'react-icons/io';
import setPlanModal from '../../../../../../utils/event/set-plan-modal';

export default function CreateAttemp({ data }: { data: SubnavBarForm }) {
  const { setOpenPreview } = useVirtualModel();
  return (
    <CenterBox sx={{ flexDirection: 'column', gap: '1rem' }}>
      <CenterBox
        sx={{
          gap: '.5rem',
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'start',
        }}
      >
        {data.selectModel && <Box>v1.5</Box>}
        <CenterBox
          sx={{
            paddingY: '.5rem',

            position: 'relative',
          }}
        >
          <Typography
            sx={{
              bgcolor: '#1d1e23',
              color: '#8591a0',
              fontSize: '12px',
              paddingRight: '.5rem',
              paddingLeft: '2.5rem',
              height: '1.5rem',
              borderRadius: '4px',
              borderTopLeftRadius: '40%',
              borderBottomLeftRadius: '40%',
            }}
          >
            #020
          </Typography>
          <CenterBox
            sx={{
              position: 'absolute',
              left: '0',
              height: '2.5rem',
              width: 'auto',
              aspectRatio: '1/1',
              bgcolor: '#1d1e23',
              borderRadius: '50%',
            }}
          ></CenterBox>
        </CenterBox>
        <CenterBox
          sx={{
            bgcolor: '#1d1e23',
            height: '1.5rem',
            borderRadius: '4px',
            paddingX: '.5rem',
            color: '#8591a0',
          }}
        >
          v1.5
        </CenterBox>
        <CenterBox
          sx={{
            bgcolor: '#1d1e23',
            height: '1.5rem',
            borderRadius: '4px',
            paddingX: '.5rem',
            color: '#8591a0',
          }}
        >
          Park
        </CenterBox>
        <CenterBox
          sx={{
            maxWidth: '400px',
            width: '100%',
            '@media only screen and (max-width:1000px)': {
              maxWidth: '300px',
              marginY: '.5rem',
            },
            '@media only screen and (max-width:500px)': {
              width: '100%',
              maxWidth: '300vw',
            },
          }}
        >
          <Box
            sx={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              flex: 1,
              width: '100%',
              minWidth: 0,
              overflow: 'hidden',
              //   '> h2': {
              //     white-space: nowrap;
              //     overflow: hidden;
              //     text-overflow: ellipsis;
              //   }
              '@media only screen and (max-width:500px)': {
                width: '100%',
                // bgcolor: 'red',
              },
            }}
          >
            wdawdawdawdawd asdawdasadwadasd dwadsadwadwadsa sadwadawdasda
          </Box>
          <Box
            sx={{
              display: 'none',
              '@media only screen and (max-width:500px)': {
                flex: 1,
                display: 'block',
              },
            }}
          />
          <FiCopy />
        </CenterBox>
        <CenterBox
          sx={{
            gap: '.5rem',
            '> *': {
              bgcolor: '#1d1e23',
              padding: '8px 12px',
              borderRadius: '4px',
            },
            '@media only screen and (max-width:1000px)': {
              gap: '1rem',
              width: '100%',
              '> *': {
                width: 'calc(50% - .5rem)',
              },
            },
            '@media only screen and (max-width:500px)': {
              '> *': {
                width: '100%',
              },
            },
          }}
        >
          <CenterBox>
            <FiDownload />
            <Typography>Download PSD</Typography>
          </CenterBox>
        </CenterBox>
      </CenterBox>
      <CenterBox
        sx={{
          gap: '2rem',
          color: '#8591a0',
          justifyContent: 'start',
          width: '100%',
        }}
      >
        <CenterBox>Execution count 8</CenterBox>
        <CenterBox>2024-05-13 22:26:37</CenterBox>
      </CenterBox>
      <CenterBox
        sx={{
          justifyContent: 'start',
          width: '100%',
          gap: '20px',
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <CenterBox
          sx={{
            width: '250px',
            height: '375px',
            overflow: 'hidden',
            borderRadius: '8px',
            position: 'relative',
            img: {
              objectFit: 'contain',
              width: '100%',
              height: '100%',
            },
            '&:hover': {
              '.overlay': {
                display: 'flex',
              },
            },
          }}
        >
          <img src={`https://placehold.co/250x375/FFF/000000?text=1`} />
          <CenterBox
            className="overlay"
            sx={{
              position: 'absolute',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,.8)',
              transition: '.5s',
              display: 'none',
            }}
            onClick={() => setOpenPreview(true)}
          >
            Preview
          </CenterBox>
        </CenterBox>
        {/* <CenterBox
          sx={{
            width: '250px',
            height: '375px',
            overflow: 'hidden',
            borderRadius: '8px',
            position: 'relative',
            img: {
              objectFit: 'contain',
              width: '100%',
              height: '100%',
            },
            '&:hover': {
              '.overlay': {
                display: 'flex',
              },
            },
          }}
        >
          <img src={`https://placehold.co/250x375/FFF/000000?text=2`} />
          <CenterBox
            className="overlay"
            sx={{
              position: 'absolute',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,.8)',
              transition: '.5s',
              display: 'none',
              fontSize: '1.5rem',
            }}
          >
            Preview
          </CenterBox>
        </CenterBox> */}
        <CenterBox
          sx={{
            width: '250px',
            height: '375px',
            overflow: 'hidden',
            borderRadius: '8px',
            position: 'relative',
            img: {
              objectFit: 'contain',
              width: '100%',
              height: '100%',
            },
            '&:hover': {
              '.overlay': {
                display: 'flex',
              },
            },
          }}
        >
          <img src={`https://placehold.co/250x375/FFF/000000?text=3`} />
          <CenterBox
            className="overlay"
            sx={{
              position: 'absolute',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              gap: '.5rem',
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,.8)',
              transition: '.5s',
              // display: 'none',
              svg: {
                width: '5rem',
                height: '5rem',
              },
            }}
          >
            <IoMdLock />
            <CenterBox
              sx={{
                width: '150px',
                bgcolor: 'rgb(105, 4, 233)',
                height: '3rem',
                color: 'white',
                gap: '.5rem',
                fontSize: '14px',
                borderRadius: '4px',
                cursor: 'pointer',
                // mt: '.5rem',
              }}
              onClick={() => setPlanModal(true)}
            >
              Upgrade
            </CenterBox>
            <CenterBox sx={{ width: '150px' }}>
              <Box sx={{ height: '1px', bgcolor: 'white', flex: 1 }} />
              <CenterBox sx={{ paddingX: '.5rem' }}>OR</CenterBox>
              <Box sx={{ height: '1px', bgcolor: 'white', flex: 1 }} />
            </CenterBox>
            <CenterBox
              sx={{
                width: '150px',
                bgcolor: 'rgb(105, 4, 233)',
                height: '3rem',
                color: 'white',
                gap: '.5rem',
                fontSize: '14px',
                borderRadius: '4px',
                cursor: 'pointer',
                // mt: '.5rem',
              }}
            >
              Spend 40 point
            </CenterBox>
          </CenterBox>
        </CenterBox>
        {/* <CenterBox
          sx={{
            width: '250px',
            height: '375px',
            overflow: 'hidden',
            borderRadius: '8px',
            position: 'relative',
            img: {
              objectFit: 'contain',
              width: '100%',
              height: '100%',
            },
            '&:hover': {
              '.overlay': {
                display: 'flex',
              },
            },
          }}
        >
          <img src={`https://placehold.co/250x375/FFF/000000?text=4`} />
          <CenterBox
            className="overlay"
            sx={{
              position: 'absolute',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              gap: '.5rem',
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,.8)',
              transition: '.5s',
              // display: 'none',
              svg: {
                width: '5rem',
                height: '5rem',
              },
            }}
          >
            <IoMdLock />
            <CenterBox
              sx={{
                width: '150px',
                bgcolor: 'rgb(105, 4, 233)',
                height: '3rem',
                color: 'white',
                gap: '.5rem',
                fontSize: '14px',
                borderRadius: '4px',
                cursor: 'pointer',
                // mt: '.5rem',
              }}
              onClick={() => setPlanModal(true)}
            >
              Upgrade
            </CenterBox>
            <CenterBox sx={{ width: '150px' }}>
              <Box sx={{ height: '1px', bgcolor: 'white', flex: 1 }} />
              <CenterBox sx={{ paddingX: '.5rem' }}>OR</CenterBox>
              <Box sx={{ height: '1px', bgcolor: 'white', flex: 1 }} />
            </CenterBox>
            <CenterBox
              sx={{
                width: '150px',
                bgcolor: 'rgb(105, 4, 233)',
                height: '3rem',
                color: 'white',
                gap: '.5rem',
                fontSize: '14px',
                borderRadius: '4px',
                cursor: 'pointer',
                // mt: '.5rem',
              }}
            >
              Spend 40 point
            </CenterBox>
          </CenterBox>
        </CenterBox> */}
      </CenterBox>
    </CenterBox>
  );
}

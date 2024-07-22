import { useEffect, useMemo, useState } from 'react';
import CenterBox from '../../../../components/common/center-box';

export default function HighlightImage() {
  const id = useMemo(() => Math.floor(Math.random() * 100), []);
  const [subWidth, setSubWidth] = useState<number>(200);
  useEffect(() => {
    if (!id) {
      return;
    }
    const element = document.getElementById(`mainImg_${id}`);
    if (!element) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      setSubWidth((entry.contentRect.width * 2) / 3);
    });

    resizeObserver.observe(element);
  }, [id]);
  return (
    <CenterBox
      id={`highlight_img_${id}`}
      sx={{
        width: '100%',
        img: {
          position: 'relative',
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          aspectRatio: '21/30',
          objectFit: 'cover',
          transition: '.5s',
        },
        '.mainImg': {
          //   maxHeight: '300px',
          zIndex: 999,
          maxWidth: '210px',
          minWidth: '0px',
        },
        '.subHighlight': {
          maxWidth: `${subWidth}px`,
        },
        '.subHighlight:first-of-type': {
          display: 'none',
        },
        '@media only screen and (max-width: 1500px)': {
          '.mainImg': {
            minWidth: '100px',
          },
          '.subHighlight': {
            minWidth: '0px',
            opacity: '.8',
            '&:nth-of-type(2)': {
              transform: 'translateX(20%)',
            },
            '&:nth-of-type(4)': {
              transform: 'translateX(-20%)',
            },
          },
        },
        '@media only screen and (min-width: 1500px)': {
          gap: '1rem',
          '.subHighlight': {
            width: '100%',
          },
        },
        '@media only screen and (min-width: 1900px)': {
          gap: '1rem',
          '.subHighlight': {
            height: '195px',
            width: 'auto',
            '&:first-of-type': {
              transform: 'translateY(50px)',
              display: 'block',
            },
          },
        },
      }}
    >
      <img
        className="subHighlight"
        src={`https://placehold.co/6000x4000/FFF/000000?text=1`}
      />
      <img
        className="subHighlight"
        src={`https://placehold.co/6000x4000/FFF/000000?text=2`}
      />
      <img
        className="mainImg"
        id={`mainImg_${id}`}
        src={`https://placehold.co/6000x4000/FFF/000000?text=Main`}
        onResizeCapture={(e) => {
          console.log(e);
        }}
      />
      <img
        className="subHighlight"
        src={`https://placehold.co/6000x4000/FFF/000000?text=3`}
      />
    </CenterBox>
  );
}

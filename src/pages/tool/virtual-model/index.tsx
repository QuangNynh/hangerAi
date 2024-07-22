/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { Box, Collapse } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import VirtualModelNavbar from './_components/navbar';
import VirtualModelSubNavbar from './_components/sub-navbar';
import { useAppContext } from '../../../context/app-context/app-contex';
import CenterBox from '../../../components/common/center-box';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MaskEditModal from './_components/mask-edit-model';
import kyInstance from '../../../services/ky';
import VirtualModelMainPage from './_components/main-page';
import PreviewModal from './_components/preview-modal/preview-modal';

export interface TaskShowcase {
  id: string;
  name: string;
  state: number;
  image?: string | File;
}
export interface SubnavBarForm {
  image?: File;
  mask?: File;
  text_description: string;
  selectModel?: number;
  location?: number;
  tag: number[];
  isFreeCreation: boolean;
  promptPositive: string;
  promptNegative?: string;
}
interface VirtualModelContext {
  taskList: TaskShowcase[];
  setTaskList: React.Dispatch<React.SetStateAction<TaskShowcase[]>>;
  currentTask: TaskShowcase | null;
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskShowcase | null>>;
  openSubNavbar: boolean;
  setOPenSubNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  openEditMask: boolean;
  setOpenEditMask: React.Dispatch<React.SetStateAction<boolean>>;
  canvasSize: [number, number];
  setCanvasSize: React.Dispatch<React.SetStateAction<[number, number]>>;
  loadingState: number;
  setLoadingState: React.Dispatch<React.SetStateAction<number>>;
  segmentList: Record<string, RecordLayer>;
  setSegmentList: React.Dispatch<
    React.SetStateAction<Record<string, RecordLayer>>
  >;
  isLoadingMask: boolean;
  setIsLoadingMask: React.Dispatch<React.SetStateAction<boolean>>;
  openPreview: boolean;
  setOpenPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const VirtualModelContext = createContext<VirtualModelContext>({
  taskList: [],
  setTaskList: () => {},
  currentTask: null,
  setCurrentTask: () => {},
  openSubNavbar: false,
  setOPenSubNavbar: () => {},
  openEditMask: false,
  setOpenEditMask: () => {},
  canvasSize: [0, 0],
  setCanvasSize: () => {},
  loadingState: 0,
  setLoadingState: () => {},
  segmentList: {},
  setSegmentList: () => {},
  isLoadingMask: false,
  setIsLoadingMask: () => {},
  openPreview: false,
  setOpenPreview: () => {},
});

export interface RecordLayer {
  image_base64: string;
  image_base64_display: string;
}
export const useVirtualModel = () => useContext(VirtualModelContext);
export default function VirtualModelPage() {
  const [taskList, setTaskList] = useState<TaskShowcase[]>([
    {
      name: 'Sample',
      image: 'https://placehold.co/600x600/004d40/white?text=V',
      state: 1,
      id: '1',
    },
  ]);
  const [currentTask, setCurrentTask] = useState<TaskShowcase | null>(null);
  const [openSubNavbar, setOPenSubNavbar] = useState<boolean>(true);
  const [openEditMask, setOpenEditMask] = useState<boolean>(false);
  const [isLoadingMask, setIsLoadingMask] = useState<boolean>(false);
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<[number, number]>([0, 0]);
  const [loadingState, setLoadingState] = useState<number>(0);
  const [segmentList, setSegmentList] = useState<Record<string, RecordLayer>>(
    {}
  );
  const { isMobile } = useAppContext();

  const schema = z.object({
    image: z
      .any()
      .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
      .refine(
        (file) =>
          ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'].includes(
            file?.type
          ),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .optional(),
    mask: z
      .any()
      .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
      .refine(
        (file) =>
          ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'].includes(
            file?.type
          ),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
      .optional(),
    text_description: z.string(),
    selectModel: z.number().optional(),
    location: z.number().optional(),
    tag: z.array(z.number()),
    isFreeCreation: z.boolean(),
    promptPositive: z.string().min(1),
    promptNegative: z.string().min(1).optional(),
  });

  const method = useForm<SubnavBarForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      text_description: '',
      tag: [],
      isFreeCreation: true,
      promptPositive: '',
      selectModel: -1,
      location: -1,
    },
  });

  function onSubmit(data: SubnavBarForm) {
    console.log(data);
  }

  useEffect(() => {
    const selectImage = method.watch('image');
    if (!selectImage) {
      return;
    }
    setIsLoadingMask(true);
    const img = new Image();
    img.src = URL.createObjectURL(selectImage);
    img.onload = function () {
      setCanvasSize([img.width, img.height]);
    };
    const reader = new FileReader();
    reader.onload = function (event) {
      if (!event || !event.target) {
        return;
      }
      const base64Image = event.target.result as string;

      kyInstance
        .post('segment/', {
          json: {
            base_image: base64Image.split(',')[1],
          },
        })
        .json<{ results: ({ color: string } & RecordLayer)[] }>()
        .then((data) => {
          if (!data) {
            return;
          }
          const res: Record<string, RecordLayer> = {};
          data.results.forEach((segment) => {
            if (!segment.image_base64 || !segment.image_base64_display) {
              return;
            }

            res[segment.color] = {
              image_base64: `data:image/png;base64,${segment.image_base64}`,
              image_base64_display: `data:image/png;base64,${segment.image_base64_display}`,
            };
          });
          setIsLoadingMask(false);
          setSegmentList(res);
        });
    };
    reader.readAsDataURL(selectImage);
  }, [method.watch('image')]);
  return (
    <VirtualModelContext.Provider
      value={{
        taskList,
        setTaskList,
        currentTask,
        setCurrentTask,
        openSubNavbar,
        setOPenSubNavbar,
        openEditMask,
        setOpenEditMask,
        canvasSize,
        setCanvasSize,
        loadingState,
        setLoadingState,
        segmentList,
        setSegmentList,
        isLoadingMask,
        setIsLoadingMask,
        openPreview,
        setOpenPreview,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <VirtualModelNavbar />
        <Box
          sx={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            '> *': {
              height: '100%',
            },
          }}
        >
          <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(onSubmit)}>
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 9996,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: isMobile ? 'column-reverse' : 'row',
                  top: 0,
                  left: 0,
                  '@media only screen and (min-width:1714px)': {
                    position: 'relative',
                  },
                }}
              >
                <Collapse
                  in={openSubNavbar}
                  orientation={isMobile ? 'vertical' : 'horizontal'}
                  timeout={500}
                  sx={{
                    ...(isMobile ? { width: '100%' } : { height: '100%' }),
                  }}
                >
                  <VirtualModelSubNavbar />
                </Collapse>
                <CenterBox
                  sx={{
                    zIndex: 9996,
                    color: 'white',
                    width: '20px',
                    height: '80px',
                    cursor: 'pointer',
                    bgcolor: '#1d1e23',
                    borderTopRightRadius: '6px',
                    borderBottomRightRadius: '6px',
                    transform: isMobile
                      ? 'rotate(-90deg) translateX(-30px)'
                      : '',
                    '@media only screen and (min-width: 1714px)': {
                      display: 'none',
                    },
                  }}
                  onClick={() => setOPenSubNavbar(!openSubNavbar)}
                >
                  {openSubNavbar ? <FaCaretLeft /> : <FaCaretRight />}
                </CenterBox>
              </Box>
              <MaskEditModal />
            </form>
          </FormProvider>
          <CenterBox
            sx={{
              color: 'white',
              flex: 1,
              position: 'relative',
              flexDirection: 'column',
              zIndex: 9996,
              bgcolor: 'black',
            }}
          >
            {/* <CenterBox
              sx={{
                position: 'absolute',
                left: 0,
                width: '20px',
                height: '80px',
                cursor: 'pointer',
                bgcolor: '#1d1e23',
                borderTopRightRadius: '6px',
                borderBottomRightRadius: '6px',
                transform: isMobile ? 'rotate(-90deg) translateX(-30px)' : '',
                color: 'white',
                '@media only screen and (max-width: 1714px)': {
                  display: 'none',
                },
              }}
              onClick={() => setOPenSubNavbar(!openSubNavbar)}
            >
              {openSubNavbar ? <FaCaretLeft /> : <FaCaretRight />}
            </CenterBox> */}
            <VirtualModelMainPage />
            <PreviewModal />
          </CenterBox>
        </Box>
      </Box>
    </VirtualModelContext.Provider>
  );
}

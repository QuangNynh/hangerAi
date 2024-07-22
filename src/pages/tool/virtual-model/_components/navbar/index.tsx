import { Box, Button, Collapse, Typography } from '@mui/material';
import { useAppContext } from '../../../../../context/app-context/app-contex';
import { useToolLayout } from '../../../../../layout/tool-layout/tool-layout';
import { FiPlus } from 'react-icons/fi';
import { useVirtualModel } from '../..';
import TaskShowcaseBox from './task-showcase';

export default function VirtualModelNavbar() {
  const { isMobile } = useAppContext();
  const { openNavbar } = useToolLayout();
  const { taskList, setTaskList } = useVirtualModel();

  function handleCreateNewTask() {
    //TODO create API to create task
    setTaskList([
      ...taskList,
      {
        name: `Sample ${taskList.length + 1}`,
        state: 0,
        id: `${taskList.length + 1}`,
      },
    ]);
  }
  return (
    <Collapse
      in={openNavbar}
      orientation="horizontal"
      sx={{
        height: '100%',
        zIndex: 9997,
        ...(isMobile ? { position: 'absolute', top: 0, left: 0 } : {}),
      }}
      timeout={1000}
    >
      <Box
        sx={{
          ...(isMobile ? { width: '100vw' } : { width: '250px' }),
          height: '100%',
          bgcolor: 'black',
          boxSizing: 'border-box',
          borderRight: '1px solid #6d6d70',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            borderBottom: '1px solid #6d6d70',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '700',
              mb: '.5rem',
              color: 'white',
            }}
          >
            Mannequin
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#8591a0' }}>
            Showcase clothing with a variety of models that aligns with your
            brand’s aesthetic
          </Typography>

          <Button
            sx={{
              '&,:focus': {
                bgcolor: '#1d1e23',
              },
              display: 'flex',
              gap: '.5rem',
              color: 'white',
              textTransform: 'none',
              marginY: '1rem',
            }}
            onClick={handleCreateNewTask}
          >
            <FiPlus />
            New Task
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            paddingX: '1rem',
            overflowY: 'auto',
            paddingY: '1rem',
            // bgcolor: 'red',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            display: 'flex',
            flexDirection: 'column',
            gap: '.5rem',
          }}
        >
          {taskList.map((task, index) => (
            <TaskShowcaseBox data={task} key={`taskLish_${index}`} />
          ))}
        </Box>
      </Box>
    </Collapse>
  );
}

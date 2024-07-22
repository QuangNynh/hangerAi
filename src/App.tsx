import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import routes from '~react-pages';
import Wrapper from './layout/wrapper';
import PlanInfomationModal from './components/common/modal/plan-modal/plan-modal';
import AppContextProvider from './context/app-context/app-contex';

function App() {
  return (
    <AppContextProvider>
      <Wrapper>
        <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
        <PlanInfomationModal />
      </Wrapper>
    </AppContextProvider>
  );
}

export default App;

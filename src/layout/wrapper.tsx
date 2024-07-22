import { Fragment, ReactNode, useMemo } from 'react';
import DashboardNavbar from './dashboard-navbar/dashboard-navbar';
import ToolLayout from './tool-layout/tool-layout';

export default function Wrapper({ children }: { children: ReactNode }) {
  const Component = useMemo<ReactNode>(() => {
    console.log(window.location.pathname);

    if (window.location.pathname.includes('/dashboard')) {
      return <DashboardNavbar>{children}</DashboardNavbar>;
    }
    if (window.location.pathname.includes('/tool')) {
      return <ToolLayout>{children}</ToolLayout>;
    }
    return <Fragment>{children}</Fragment>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return <>{Component}</>;
}

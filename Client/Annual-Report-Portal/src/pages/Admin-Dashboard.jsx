import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';

import GlobalFooter from './../components/globalFooter';
import GlobalHeader from '../components/globalHeader';
import { AdminSidebar } from '../components/Admin-Sidebar';
import { useUserDetails } from '../hooks/useUserDetails';
import SmallLoader from '../components/small-loader';

function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 700);
  const userDetails = useUserDetails();
  if (!userDetails) {
    return <SmallLoader />;
  }

  return (
    <div className="bg-[#090040] min-h-screen flex flex-col">
      <GlobalHeader />
      <main className="flex-grow flex text-white">
        <Suspense fallback={<SmallLoader />}>
          <AdminSidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            userDetails={userDetails}
          />
        </Suspense>
        <div className="flex-1 ">
          {collapsed || (!collapsed && window.innerWidth > 700) ? (
            <Outlet />
          ) : (
            <></>
          )}
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
}

export default AdminDashboard;

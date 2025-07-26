import { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import plus from '../assets/plus';
import list from '../assets/list';
import addPerson from '../assets/addPerson';
import GlobalHeader from '../components/globalHeader';
import GlobalFooter from '../components/globalFooter';
import { sidebarClose } from '../assets/sidebarClose';
import { sidebarOpen } from '../assets/sidebarOpen';
import fileDownload from '../assets/fileDownload';

function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(
    window.innerWidth < 700 ? true : false
  );
  const [userDetails, setUserDetails] = useState();
  const downloadReport = async () => {
    // The params object is correct
    const params = {
      institute: userDetails.user.institute,
      status: 'admin-approved',
      year: '2024',
      sort: 'section,type,-createdAt',
    };

    try {
      // Correctly pass params and responseType inside one config object
      const response = await axios.get(
        `http://127.0.0.1:3000/api/report/download`,
        {
          params: params,
          responseType: 'blob',
        }
      );

      // No need to create a new Blob. response.data is already the blob.
      const blob = response.data;

      // Create a link to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Annual_Report_2024.pdf';
      document.body.appendChild(link); // Append to body to ensure it works in all browsers
      link.click();
      document.body.removeChild(link); // Clean up by removing the link

      // Optional: Revoke the object URL to free up memory
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Download failed:', error);
      // You might want to show an error message to the user here
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      const user = await axios.get('http://localhost:3000/api/me', {
        withCredentials: true,
      });
      setUserDetails(user.data);
      console.log(user.data);
    };
    getUserDetails();
  }, []);

  return (
    <div className="bg-[#090040] min-h-screen flex flex-col">
      <GlobalHeader />
      <main className="flex-grow flex text-white">
        <Sidebar collapsed={collapsed} backgroundColor="#090040" width="300px">
          <Menu
            menuItemStyles={{
              button: {
                color: '#FFFFFF',
                fontSize: '25px',
                [`&:hover`]: {
                  backgroundColor: '#471396',
                  color: '#FFCC00',
                },
                [`&:active`]: {
                  backgroundColor: '#471396',
                  color: '#FFCC00',
                },
              },
            }}
          >
            <button
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              className="m-2 flex justify-center"
            >
              {collapsed ? sidebarClose : sidebarOpen}
            </button>
            <MenuItem
              icon={plus}
              component={<Link to="/admin/dashboard/createEntry" />}
            >
              Create Entry
            </MenuItem>
            <MenuItem
              icon={list}
              component={
                <Link
                  to="/admin/dashboard/submissions"
                  state={{ userDetails }}
                />
              }
            >
              View Submissions
            </MenuItem>
            <MenuItem
              icon={addPerson}
              component={<Link to="/admin/dashboard/addFaculty" />}
            >
              Add Faculty
            </MenuItem>
            <MenuItem icon={fileDownload} onClick={downloadReport}>
              Download Report
            </MenuItem>
          </Menu>
        </Sidebar>
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

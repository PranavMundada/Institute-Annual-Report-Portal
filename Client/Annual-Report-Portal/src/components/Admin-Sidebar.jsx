import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

import plus from '../assets/plus';
import list from '../assets/list';
import addPerson from '../assets/addPerson';
import { sidebarClose } from '../assets/sidebarClose';
import { sidebarOpen } from '../assets/sidebarOpen';
import fileDownload from '../assets/fileDownload';
import { downloadReport } from '../utils/Download-Report';

// import { downloadReport } from '../utils/Download-Report';

export const AdminSidebar = ({ collapsed, setCollapsed, userDetails }) => {
  return (
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
            <Link to="/admin/dashboard/submissions" state={{ userDetails }} />
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
        <MenuItem
          icon={fileDownload}
          onClick={() => downloadReport(userDetails)}
        >
          Download Report
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

import { Outlet } from "react-router";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "./../components/ui/resizable";

import Sidebar from "./../components/Sidebar";
import Navbar from "./../components/Navbar";
import TopBar from "./../components/TopBar";
import MobileBar from "./../components/Mobilebar";



const AdminLayout = () => {
    return (
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel className="hidden lg:block" defaultSize={12} maxSize={12} minSize={8}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle  className="hidden lwg:block" />
        <ResizablePanel>
          <div className='w-full h-full relative '>
            <TopBar />
            <Navbar />
            <div className='px-2 lg:px-10 max-h-[80vh] overflow-auto '>
            <Outlet />
            </div>
            <MobileBar/>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  };
  export default AdminLayout;
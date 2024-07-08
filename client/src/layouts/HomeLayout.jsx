import { Outlet } from "react-router";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./../components/ui/resizable";
import MainNavBar from "./../components/MainNavBar";

const HomeLayout = () => {
  return (
    <ResizablePanelGroup direction='horizontal'>
      <ResizablePanel>
        <div className='w-full h-full relative '>
          <MainNavBar />
          <div className='px-2 lg:px-10 '>
            <Outlet />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default HomeLayout;

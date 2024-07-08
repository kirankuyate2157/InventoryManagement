import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <ScrollArea className='w-full pb-20 flex flex-col h-[93vh]'>
      <div className='flex max-w-full max-h-[300px] flex-col sm:flex-row px-4 my-2 gap-3'>
        <div
          className='w-full bg-muted rounded-md animate-pulse'
          style={{ height: "300px" }}
        >
          <Skeleton className='h-3 m-4 w-[40%] rounded-md' />
          <Skeleton className='h-3 m-4 w-[30%] rounded-md' />
        </div>
        <div
          className='w-full bg-muted rounded-md animate-pulse'
          style={{ height: "300px" }}
        >
          <Skeleton className='h-3 m-4 w-[40%] rounded-md' />
          <Skeleton className='h-3 m-4 w-[30%] rounded-md' />
        </div>
      </div>
      <div className='flex max-w-full h-full flex-col lg:flex-row px-4 my-2 gap-3'>
        <div
          className='w-full bg-muted rounded-md animate-pulse'
          style={{ height: "300px" }}
        >
          <Skeleton className='h-3 m-4 w-[40%] rounded-md' />
          <Skeleton className='h-3 m-4 w-[30%] rounded-md' />
        </div>
        <div
          className='w-full bg-muted rounded-md animate-pulse'
          style={{ height: "300px" }}
        >
          <Skeleton className='h-3 m-4 w-[40%] rounded-md' />
          <Skeleton className='h-3 m-4 w-[30%] rounded-md' />
        </div>
        <div
          className='w-full bg-muted rounded-md animate-pulse'
          style={{ height: "300px" }}
        >
          <Skeleton className='h-3 m-4 w-[40%] rounded-md' />
          <Skeleton className='h-3 m-4 w-[30%] rounded-md' />
        </div>
      </div>
      <div className='flex max-w-full flex-col lg:flex-row px-4 py-2 gap-3'>
        <div
          className='w-full lg:w-[60%] bg-muted rounded-md animate-pulse'
          style={{ height: "300px" }}
        >
          <div className='h-full w-full flex flex-col justify-between'>
            <div className='w-full h-[30%]'>
              <Skeleton className='h-3 m-4 w-[40%] rounded-md' />
              <Skeleton className='h-3 m-4 w-[30%] rounded-md' />
            </div>
            <Skeleton className='h-[70%] m-4 w-[95%] rounded-md' />
          </div>
        </div>
        <div
          className='w-full lg:w-[40%] bg-muted rounded-md animate-pulse'
          style={{ height: "300px" }}
        >
          <div className='h-full w-full flex flex-col justify-between'>
            <div className='w-full h-[30%]'>
              <Skeleton className='h-3 m-4 w-[40%] rounded-md' />
              <Skeleton className='h-3 m-4 w-[30%] rounded-md' />
            </div>
            <Skeleton className='h-[70%] m-4 w-[95%]  rounded-md' />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default DashboardSkeleton;

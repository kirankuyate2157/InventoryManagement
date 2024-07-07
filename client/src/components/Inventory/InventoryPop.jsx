import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { BsUpload } from "react-icons/bs";
import CategorySelector from "./CategorySelector";
import { Selector } from "../Selector";

export function InventoryPop({ open, setOpen, inventory }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[525px] rounded-md hide-scroll'>
        <DialogHeader>
          <DialogTitle>Create Inventory</DialogTitle>
          {/* <DialogDescription>
            Make Inventory here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className='grid gap-4 overflow-auto max-h-[70vh] py-4'>
          <div className='flex flex-col justify-start  items-start gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              type='area'
              value='Pedro Duarte'
              className='col-span-3'
            />
          </div>
          <div className='flex flex-col items-start gap-4'>
            <Label htmlFor='username' className='text-right'>
              Description
            </Label>
            <Textarea placeholder='Type your message here.' />
          </div>
          <div className='w-full'>
            <div className='flex flex-wrap overflow-auto h-[150px] w-full p-2 gap-2 items-center justify-start rounded-md border border-dashed  text-sm'>
              <div className='w-full max-w-28 h-32 flex flex-col gap-2 justify-center items-center rounded bg-muted'>
                <BsUpload className='text-lg' />
                <h3 className='text-xs'>upload image</h3>
              </div>
              <div className='w-full overflow-hidden max-w-28 h-32 flex flex-col gap-2 justify-center items-center rounded bg-muted'>
                <img
                  src='https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZlZ2V0YWJsZXxlbnwwfHwwfHx8MA%3D%3D'
                  alt=''
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='w-full overflow-hidden max-w-28 h-32 flex flex-col gap-2 justify-center items-center rounded bg-muted'>
                <img
                  src='https://images.unsplash.com/photo-1566842600175-97dca489844f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVnZXRhYmxlfGVufDB8fDB8fHww'
                  alt=''
                  className='object-cover w-full h-full'
                />
              </div>
            </div>
          </div>
          <div className='flex w-full gap-4'>
            <div className='w-full flex flex-col justify-start  items-start gap-2'>
              <Label htmlFor='name' className='text-right'>
                Listing Price
              </Label>
              <Input id='name' type='area' value='120' className='col-span-3' />
            </div>
            <div className='w-full flex flex-col justify-start  items-start gap-2'>
              <Label htmlFor='name' className='text-right'>
                Retail Price
              </Label>
              <Input id='name' type='area' value='220' className='col-span-3' />
            </div>
          </div>
          <div className='flex w-full gap-4'>
            <div className='w-full flex flex-col justify-start  items-start gap-2'>
              <Label htmlFor='name' className='text-right'>
                Unit
              </Label>
              <Input id='name' type='area' value='120' className='col-span-3' />
            </div>
            <div className='w-full flex flex-col justify-end  items-start gap-2'>
              <Selector className={"min-w-32"} />
            </div>
          </div>
          <CategorySelector />
        </div>
        <DialogFooter>
          <Button type='submit'>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

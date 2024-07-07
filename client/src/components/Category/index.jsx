import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDone, MdOutlineCancel } from "react-icons/md";
import { GoChevronRight } from "react-icons/go";

const Category = () => {
  return (
    <div className='py-5'>
      <div className='md:mb-5 w-full flex text-lg justify-start items-center  '>
        <Button variant='link'>
          Category
          <GoChevronRight className='h-4 w-4' />
        </Button>
      </div>
      <div className='flex  md:px-10 justify-center items-center w-full py-1 gap-2 md:gap-5 border-slate-200 bg-background dark:border-slate-700 h-12'>
        <Input
          type='text'
          placeholder='category e.g "Fresh Vegetable" '
          className='rounded max-w-md bg-gray-50 text-gray-500 dark:text-gray-500 dark:bg-transparent'
        />
        <Button>Create</Button>
      </div>
      <div className='w-full mt-4  flex flex-col items-center gap-3 grow '>
        <div className=' w-full px-4 gap-4 max-w-[540px] p-2 rounded-lg flex justify-between items-center bg-muted'>
          {true ? (
            <p>Fresh Vegetable</p>
          ) : (
            <Input
              type='text'
              className='rounded max-w-sm bg-gray-50 text-gray-500 dark:text-gray-500 dark:bg-transparent'
            />
          )}
          {true ? (
            <FiEdit3 className='text-lg w-full max-w-6 cursor-pointer' />
          ) : (
            <div className='flex text-xl mx-2 gap-2'>
              <MdOutlineDone className='cursor-pointer' />{" "}
              <MdOutlineCancel className='cursor-pointer' />
            </div>
          )}
        </div>
        <div className=' w-full  max-w-[540px] p-2 rounded-lg flex justify-between items-center bg-muted'>
          {false ? (
            <p>Fresh Vegetable</p>
          ) : (
            <Input
              type='text'
              value={"Seasonal Fruit"}
              className='rounded max-w-sm bg-gray-50 text-gray-500 dark:text-gray-500 dark:bg-transparent'
            />
          )}
          {false ? (
            <FiEdit3 className='text-lg mx-2 cursor-pointer' />
          ) : (
            <div className='flex text-xl mx-2 gap-2'>
              <MdOutlineDone className='cursor-pointer' />{" "}
              <MdOutlineCancel className='cursor-pointer' />
            </div>
          )}
        </div>
        <div className=' w-full  max-w-[540px] p-2 rounded-lg flex justify-between items-center bg-muted'>
          {true ? (
            <p>Fresh Vegetable</p>
          ) : (
            <Input
              type='text'
              className='rounded max-w-sm bg-gray-50 text-gray-500 dark:text-gray-500 dark:bg-transparent'
            />
          )}
          {true ? (
            <FiEdit3 className='text-lg mx-2 cursor-pointer' />
          ) : (
            <div className='flex text-xl mx-2 gap-2'>
              <MdOutlineDone className='cursor-pointer' />{" "}
              <MdOutlineCancel className='cursor-pointer' />
            </div>
          )}
        </div>
        <div className=' w-full  max-w-[540px] p-2 rounded-lg flex justify-between items-center bg-muted'>
          {true ? (
            <p>Fresh Vegetable</p>
          ) : (
            <Input
              type='text'
              className='rounded max-w-sm bg-gray-50 text-gray-500 dark:text-gray-500 dark:bg-transparent'
            />
          )}
          {true ? (
            <FiEdit3 className='text-lg mx-2 cursor-pointer' />
          ) : (
            <div className='flex text-xl mx-2 gap-2'>
              <MdOutlineDone className='cursor-pointer' />{" "}
              <MdOutlineCancel className='cursor-pointer' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;

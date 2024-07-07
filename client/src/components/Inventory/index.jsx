import React, { useState } from "react";
import { Button } from "../ui/button";
import { GoChevronRight } from "react-icons/go";
import { RiSearch2Line } from "react-icons/ri";
import { TbLoader2 } from "react-icons/tb";
import Dropdown from "../Dropdown";
import InvTable from "./InvTable";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageDoc, setPageDoc] = useState(null);
  const perPage = 10;

  const [applicant, setApplicant] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  return (
    <div className='py-5'>
      <div className='md:mb-5 w-full flex text-lg justify-start items-center  '>
        <Button variant='link' className='text-lg'>
          Inventory
          <GoChevronRight className='h-4 w-4' />
        </Button>
      </div>
      <div className='flex w-full  items-center justify-between space-x-4 mt-2 mb-4'>
        <div className=' md:w-80 px-5  bg-white shadow-md p-1 md:px-2 flex items-center gap-3  border border-gray-200 rounded-lg'>
          <div className='flex w-full text-black items-center gap-2'>
            <RiSearch2Line classNam='text-lg' />
            <input
              type='search'
              placeholder='Search..'
              className='w-full bg-transparent focus:outline-none'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className='flex  gap-3'>
          <Dropdown
            name='Filter'
            options={filterOptions}
            selectedOption={filterOption}
            setSelectedOption={setFilterOption}
          />
          <Dropdown
            name='Sort'
            options={["Asc", "Desc"]}
            selectedOption={sortOrder}
            setSelectedOption={setSortOrder}
          />
        </div>
      </div>
      <InvTable />
    </div>
  );
};

export default Inventory;

import React, { useState } from "react";
import { Button } from "../ui/button";
import { GoChevronRight } from "react-icons/go";
import { RiSearch2Line } from "react-icons/ri";
import { TbLoader2 } from "react-icons/tb";
import { FaLayerGroup } from "react-icons/fa6";

import Dropdown from "../Dropdown";
import OrderAccordion from "./OrderAccordion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageDoc, setPageDoc] = useState(null);
  const perPage = 10;
  const totalPages = 5;

  const [applicant, setApplicant] = useState([]);
  const [loader, setLoader] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Fetch new data based on the page
  };
  return (
    <div className='py-5'>
      <div className='md:mb-5 w-full flex text-lg justify-start items-center  '>
        <Button variant='link' className='text-lg'>
          Orders
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
      <OrderAccordion />
      <div className='w-full  flex justify- items-center p-2'>
        <Pagination className=' justify-center px-2'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href='#'
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Orders;

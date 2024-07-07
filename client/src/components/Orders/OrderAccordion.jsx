import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import OrderTable from "./OrderTable";

const OrderAccordion = () => {
  return (
    <Accordion type='single' collapsible className='w-full p-2 gap-2'>
      <AccordionItem
        value='item-1'
        className='bg-muted border hover:none rounded  my-2'
      >
        <AccordionTrigger className='w-full text-start flex px-4 '>
          <h1 className='w-[20%] '>Order ID UR562348</h1>
          <h1 className='w-[30%]'>Date: 10 April 2024</h1>
          <p className='w-[30%]'>
            Customer: {"firstName"} {"lastName"} i
          </p>
          <h1 className=' text-center w-[30%]'>Total: $ 22,302</h1>
        </AccordionTrigger>
        <AccordionContent>
          <OrderTable />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value='item-2'
        className='bg-muted border hover:none rounded  my-2'
      >
        <AccordionTrigger className='w-full text-start flex px-4 '>
          <h1 className='w-[20%] '>Order ID UR562348</h1>
          <h1 className='w-[30%]'>Date: 10 April 2024</h1>
          <p className='w-[30%]'>
            Customer: {"firstName"} {"lastName"} i
          </p>
          <h1 className=' text-center w-[30%]'>Total: $ 22,302</h1>
        </AccordionTrigger>
        <AccordionContent>
          <OrderTable />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderAccordion;

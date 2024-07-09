import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ComboTable from "./ComboTable";

const ComboAccordion = ({ combos }) => {
  return (
    <Accordion type='single' collapsible className='w-full p-2 gap-2'>
      {combos.map((combo, i) => (
        <AccordionItem
          value='combo-1'
          key={i}
          className='bg-muted border hover:none rounded  my-2'
        >
          <AccordionTrigger className='w-full text-start flex px-4 '>
            <h1 className='w-[20%] '>{combo.comboId}</h1>
            <h1 className='w-[30%]'>{combo.name}</h1>
            <p className='w-[30%]'>Items: {combo?.items?.length || 0}</p>
            <h1 className=' text-center w-[20%]'>Total: {combo.totalPrice}</h1>
          </AccordionTrigger>
          <AccordionContent>
            <ComboTable items={combo.items} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ComboAccordion;

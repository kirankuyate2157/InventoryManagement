import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ComboTable from "./ComboTable";
import { getCombo } from "./apis/comboAPI";

const ComboAccordion = ({ combos }) => {
  const [comboData, setComboData] = useState([]);
  const fetchCombo = async () => {
    const res = await getCombo();
    if (res) {
      console.log("combo fetch : ", res);
      setComboData(res.combos);
    }
  };

  useState(() => {
    fetchCombo();
  }, []);

  
  return (
    <Accordion type='single' collapsible className='w-full p-2 gap-2'>
      {comboData.length > 0 &&
        comboData.map((combo, i) => (
          <AccordionItem
            value={`${i}-{combo.id}`}
            key={`${i}-{combo.id}`}
            className='bg-muted border hover:none rounded  my-2'
          >
            <AccordionTrigger className='w-full text-start flex px-4 '>
              <div className='font-medium px-4 w-1/6 '>
                <div className='flex justify-start items-center gap-2 w-full '>
                  <img
                    src={
                      combo.images[1] ||
                      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt=''
                    className='w-10 h-11 bg-muted rounded'
                  />
                  {/* <h1>{combo.id}</h1> */}
                </div>
              </div>
              <h1 className='w-[30%]'>{combo.name}</h1>
              <p className='w-[30%]'>Items: {combo?.items?.length || 0}</p>
              <h1 className=' text-center w-[20%]'>
                Total: {combo.total_price}
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              <ComboTable
                comboId={combo.id}
                items={combo.items}
                fetchCombo={fetchCombo}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
};

export default ComboAccordion;

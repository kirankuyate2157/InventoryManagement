import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { RiEdit2Line } from "react-icons/ri";
import { updateComboItem } from "./apis/comboAPI";

const ComboTable = ({ comboId, items,fetchCombo }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedItems, setEditedItems] = useState(items);

  const handleEdit = (index) => {
    setEditMode(index);
  };

  const handleSave = async (index) => {
    console.log(comboId, items[index].id, items[index]);
    const res = await updateComboItem(comboId, items[index].id, items[index]);
    setEditMode(null);
    fetchCombo();
  };

  const handleChange = (index, field, value) => {
    const updatedItems = editedItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setEditedItems(updatedItems);
  };

  return (
    <div>
      <Table className=''>
        <TableHeader>
          <TableRow className='bg-foreground/20 hover:bg-foreground/20'>
            <TableHead className='w-[100px] p-3 font-semibold'>
              Product ID
            </TableHead>
            <TableHead className='font-semibold'>Name</TableHead>
            <TableHead className='font-semibold'>Type</TableHead>
            <TableHead className='font-semibold'>Quantity</TableHead>
            <TableHead className='font-semibold'>Unit</TableHead>
            <TableHead className='font-semibold'>Price</TableHead>
            <TableHead className='font-semibold'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='bg-white'>
          {editedItems.map((item, index) => (
            <TableRow key={item.id} className='gap-2'>
              <TableCell className='font-medium p-4 w-1/6 '>
                <div className='flex justify-start items-center gap-2 w-full '>
                  <img
                    src={
                      item.inventory.images[1] ||
                      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt=''
                    className='w-10 h-11 bg-muted rounded'
                  />
                  <h1>{item.inventory.id}</h1>
                </div>
              </TableCell>
              <TableCell>{item.inventory.name}</TableCell>
              <TableCell>{item.inventory.type}</TableCell>
              <TableCell>
                {editMode === index ? (
                  <input
                    type='number'
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    className='w-full p-2 border rounded'
                  />
                ) : (
                  item.quantity
                )}
              </TableCell>
              <TableCell>
                {editMode === index ? (
                  <input
                    type='text'
                    value={item.comboUnit}
                    onChange={(e) =>
                      handleChange(index, "comboUnit", e.target.value)
                    }
                    className='w-full p-2 border rounded'
                  />
                ) : (
                  item.comboUnit
                )}
              </TableCell>
              <TableCell>
                {editMode === index ? (
                  <input
                    type='text'
                    value={item.comboPrice}
                    onChange={(e) =>
                      handleChange(index, "comboPrice", e.target.value)
                    }
                    className='w-full p-2 border rounded'
                  />
                ) : (
                  item.comboPrice
                )}
              </TableCell>
              <TableCell className='text-center p-4'>
                {editMode === index ? (
                  <Button onClick={() => handleSave(index)} variant='outline'>
                    save
                  </Button>
                ) : (
                  <Button onClick={() => handleEdit(index)} variant='outline'>
                    <RiEdit2Line className='w-5 h-5' />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComboTable;

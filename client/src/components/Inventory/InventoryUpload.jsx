import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./../../components/ui/table";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FiEdit3 } from "react-icons/fi";
import { MdDone } from "react-icons/md";

const InventoryUpload = ({
  open,
  closeModal,
  existingData,
  parsedData,
  updateInventory,
  fetchInventory,
}) => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    // Merge parsedData with existingData when both are available
    if (parsedData.length > 0 && existingData.length > 0) {
      const mergedData = mergeDataWithExisting(parsedData, existingData);
      setInventoryData(mergedData);
    }
  }, [parsedData, existingData]);

  const mergeDataWithExisting = (newData, existingData) => {
    return newData.map((newItem) => {
      const existingItem = existingData.find((item) => item.id === newItem.id);

      const existingPrice = existingItem ? parseFloat(existingItem.price) : 0;
      const existingStock = existingItem ? parseInt(existingItem.stocks) : 0;
      const updatedPrice = parseFloat(newItem.price) || 0;
      const updatedStock = parseInt(newItem.stocks) || 0;

      return {
        ...newItem,
        existingPrice,
        existingStock,
        updatedPrice: existingPrice + updatedPrice,
        updatedStock: existingStock + updatedStock,
        isChecked: false,
        isEditing: false,
      };
    });
  };

  const handleCheckRow = (invId) => {
    const updatedData = inventoryData.map((item) =>
      item.id === invId ? { ...item, isChecked: !item.isChecked } : item
    );
    setInventoryData(updatedData);
  };

  const handleCheckAllRows = () => {
    const allChecked = inventoryData.every((item) => item.isChecked);
    const updatedData = inventoryData.map((item) => ({
      ...item,
      isChecked: !allChecked,
    }));
    setInventoryData(updatedData);
  };

  const handleSave = () => {
    const updatedItems = inventoryData.filter((item) => item.isChecked);
    updateInventory(updatedItems);
    fetchInventory();
    closeModal();
  };

  const handleToggleEdit = (index) => {
    const updatedData = [...inventoryData];
    updatedData[index].isEditing = !updatedData[index].isEditing;
    setInventoryData(updatedData);
  };

  return (
    <Dialog onOpenChange={closeModal} open={open}>
      <DialogContent className='max-w-[80vw]  max-h-[90vh] rounded-md hide-scroll'>
        <DialogHeader>
          <DialogTitle>{"Verify Preview"}</DialogTitle>
        </DialogHeader>
        {inventoryData.length > 0 && (
          <div className='overflow-auto max-w-[90vw]  max-h-[90vh]'>
            <Table className=''>
              <TableHeader>
                <TableRow className='bg-muted'>
                  <TableHead onClick={handleCheckAllRows}>
                    <Checkbox
                      checked={inventoryData.every((item) => item.isChecked)}
                    />
                  </TableHead>
                  <TableHead className='w-[100px]'>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Updated Price</TableHead>
                  <TableHead>Stocks</TableHead>
                  <TableHead>Updated Stocks</TableHead>
                  <TableHead className='text-right p-3'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.map((invoice, index) => (
                  <TableRow key={invoice.id} className='gap-2'>
                    <TableCell>
                      <Checkbox
                        checked={invoice.isChecked}
                        onCheckedChange={() => handleCheckRow(invoice.id)}
                      />
                    </TableCell>
                    <TableCell className='font-medium py-4'>
                      {invoice.id}
                    </TableCell>
                    <TableCell>{invoice.name}</TableCell>
                    <TableCell>{invoice.type}</TableCell>
                    <TableCell>{invoice.unit}</TableCell>
                    <TableCell>{invoice.price}</TableCell>
                    <TableCell>
                      {invoice.isEditing ? (
                        <input
                          className='w-20'
                          type='number'
                          value={invoice.updatedPrice}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            setInventoryData((prevData) =>
                              prevData.map((data, idx) =>
                                idx === index
                                  ? { ...data, updatedPrice: value }
                                  : data
                              )
                            );
                          }}
                        />
                      ) : (
                        invoice.updatedPrice
                      )}
                    </TableCell>
                    <TableCell>{invoice.stocks}</TableCell>
                    <TableCell>
                      {invoice.isEditing ? (
                        <input
                          type='number'
                          className='w-20'
                          value={invoice.updatedStock}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            setInventoryData((prevData) =>
                              prevData.map((data, idx) =>
                                idx === index
                                  ? { ...data, updatedStock: value }
                                  : data
                              )
                            );
                          }}
                        />
                      ) : (
                        invoice.updatedStock
                      )}
                    </TableCell>
                    <TableCell className='text-right py-4'>
                      <Button
                        variant='outline'
                        onClick={() => handleToggleEdit(index)}
                      >
                        {invoice.isEditing ? <MdDone /> : <FiEdit3 />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <DialogFooter className='flex gap-2 pt-2 justify-end'>
              <Button onClick={closeModal}>Cancel</Button>
              <Button
                onClick={handleSave}
                disabled={!inventoryData.some((item) => item.isChecked)}
              >
                Save
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InventoryUpload;

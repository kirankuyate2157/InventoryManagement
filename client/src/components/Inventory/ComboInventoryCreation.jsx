import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { BsUpload } from "react-icons/bs";
import { RiSearch2Line } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { handleS3Upload } from "../../utils/DocUpload.js";

const ComboInventoryCreation = ({
  open,
  closeModal,
  inventoryItems,
  createCombo,
}) => {
  const [comboDetails, setComboDetails] = useState({
    name: "",
    description: "",
    images: [],
    items: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setComboDetails((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComboDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleItemChange = (invId, field, value) => {
    const updatedItems = comboDetails.items.map((item) =>
      item.id === invId ? { ...item, [field]: value } : item
    );
    setComboDetails((prevDetails) => ({
      ...prevDetails,
      items: updatedItems,
    }));
  };

  const handleAddItem = (item) => {
    setComboDetails((prevDetails) => ({
      ...prevDetails,
      items: [
        ...prevDetails.items,
        { ...item, comboPrice: item.price, comboUnit: item.unit, quantity: 1 },
      ],
    }));
  };

  const handleRemoveItem = (invId) => {
    const updatedItems = comboDetails.items.filter((item) => item.id !== invId);
    setComboDetails((prevDetails) => ({
      ...prevDetails,
      items: updatedItems,
    }));
  };

  const handleCheckboxChange = (item) => {
    const isSelected = comboDetails.items.some(
      (comboItem) => comboItem.id === item.id
    );
    if (isSelected) {
      handleRemoveItem(item.id);
    } else {
      handleAddItem(item);
    }
  };

  const handleSaveCombo = async () => {
    // Validate combo details
    if (
      comboDetails.name &&
      comboDetails.description &&
      comboDetails.images.length > 0 &&
      comboDetails.items.length >= 2
    ) {
      const uploadedImageUrls = await handleS3Upload(comboDetails.images);
      createCombo({ ...comboDetails, images: uploadedImageUrls });
      closeModal();
    } else {
      alert(
        "Please provide a name, description, at least one image, and select at least two items for the combo."
      );
    }
  };

  return (
    <Dialog onOpenChange={closeModal} open={open}>
      <DialogContent className='max-w-[80vw] rounded-md'>
        <DialogHeader>
          <DialogTitle>Create Combo Inventory</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 overflow-auto sm:max-h-[70vh] py-4'>
          <div className='flex flex-col justify-start items-start gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              label='Combo Name'
              name='name'
              value={comboDetails.name}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-col items-start gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Textarea
              label='Combo description'
              name='description'
              value={comboDetails.description}
              onChange={handleInputChange}
              placeholder='Enter Combo description'
            />
          </div>

          {/* Images */}
          <div className='w-full'>
            <div className='flex flex-wrap overflow-auto h-[150px] w-full p-2 gap-2 items-center justify-start rounded-md border border-dashed text-sm'>
              <label className='w-full max-w-28 h-32 flex flex-col gap-2 justify-center items-center rounded bg-muted cursor-pointer'>
                <input
                  id='images'
                  type='file'
                  accept='image/*'
                  multiple
                  onChange={handleImageUpload}
                  className='hidden'
                />
                <BsUpload className='text-lg' />
                <h3 className='text-xs'>Upload Images</h3>
              </label>
              {comboDetails.images.map((image, index) => (
                <div
                  key={index}
                  className='w-full max-w-28 h-32 flex flex-col gap-2 justify-center items-center rounded-md overflow-hidden bg-muted'
                >
                  <img
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt={`Uploaded ${index}`}
                    className='w-full h-full object-cover'
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='my-2'>
            <div className='flex mb-1 justify-between items-center'>
              <label>Select Items</label>
              <div className='md:w-80 mb-1 mx-1 px-5 bg-white shadow-md p-1 md:px-2 flex items-center gap-3 border border-gray-200 rounded-lg'>
                <div className='flex w-full text-black items-center gap-2'>
                  <RiSearch2Line className='text-lg' />
                  <input
                    type='search'
                    placeholder='Search..'
                    className='w-full bg-transparent focus:outline-none'
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Table className='items-center max-h-[70vh] overflow-auto space-x-4'>
              <TableHeader>
                <TableRow className='bg-muted'>
                  <TableHead>
                    {/* <Checkbox
                      checked={inventoryItems.every((item) =>
                        comboDetails.items.some(
                          (comboItem) => comboItem.id === item.id
                        )
                      )}
                      onClick={() =>
                        inventoryItems.forEach((item) =>
                          handleCheckboxChange(item)
                        )
                      }
                    /> */}
                  </TableHead>
                  <TableHead className='w-[100px]'>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stocks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                    <TableRow key={item.id} className='gap-2'>
                      <TableCell onClick={() => handleCheckboxChange(item)}>
                        <Checkbox
                          checked={comboDetails.items.some(
                            (comboItem) => comboItem.id === item.id
                          )}
                        />
                      </TableCell>
                      <TableCell className='font-medium py-4'>
                        {item.id}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.stocks}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter className='flex pt-2 justify-end'>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSaveCombo}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComboInventoryCreation;

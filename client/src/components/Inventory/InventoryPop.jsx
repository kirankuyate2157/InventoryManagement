import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { BsUpload } from "react-icons/bs";
import CategorySelector from "./CategorySelector";
import { Selector } from "../Selector";
import { units } from "./constant";
import { ScrollArea } from "../ui/scroll-area";

export function InventoryPop({
  open,
  setOpen,
  formData,
  setFormData,
  isEditMode,
}) {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: [
        ...prevData.images,
        ...files.map((file) => URL.createObjectURL(file)),
      ],
    }));
  };

  const handleCategoryChange = (categories) => {
    setFormData((prevData) => ({ ...prevData, categories }));
  };

  useEffect(() => {
    if (!isEditMode) {
      setFormData({
        name: "",
        description: "",
        images: [],
        price: "",
        type: "",
        unit: "",
        stocks: 0,
        categories: [],
      });
    }
  }, [isEditMode, setFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Handle update logic
      console.log("Updating inventory item:", formData);
    } else {
      // Handle create logic
      console.log("Creating new inventory item:", formData);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[525px] rounded-md hide-scroll'>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Update Inventory" : "Create Inventory"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className='flex flex-col gap-4 overflow-auto sm:max-h-[80vh] py-4'>
            <div className='flex flex-col justify-start items-start gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                type='text'
                value={formData.name}
                onChange={handleInputChange}
                className='col-span-3'
                placeholder='Enter product name'
              />
            </div>

            {/* Product Description */}
            <div className='flex flex-col items-start gap-4'>
              <Label htmlFor='description' className='text-right'>
                Description
              </Label>
              <Textarea
                id='description'
                value={formData.description}
                onChange={handleInputChange}
                placeholder='Enter product description'
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
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className='w-full max-w-28 h-32 flex flex-col gap-2 justify-center items-center rounded-md overflow-hidden bg-muted'
                  >
                    <img
                      src={image}
                      alt={`Uploaded ${index}`}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className='flex w-full gap-4'>
              <div className='w-full flex flex-col justify-start items-start gap-2'>
                <Label htmlFor='price' className='text-right'>
                  Price
                </Label>
                <Input
                  id='price'
                  type='number'
                  value={formData.price}
                  onChange={handleInputChange}
                  className='col-span-3'
                  placeholder='Enter price'
                />
              </div>

              <div className='w-full flex flex-col justify-start items-start gap-2'>
                <Label htmlFor='stocks' className='text-right'>
                  Stocks
                </Label>
                <Input
                  id='stocks'
                  type='number'
                  value={formData.stocks}
                  onChange={handleInputChange}
                  className='col-span-3'
                  placeholder='Enter stocks'
                />
              </div>
            </div>

            {/* Unit and Type */}
            <div className='flex w-full gap-4'>
              <div className='w-full flex flex-col justify-start items-start gap-2'>
                <Label htmlFor='type' className='text-right'>
                  Type
                </Label>
                <Input
                  id='type'
                  type='text'
                  value={formData.type}
                  onChange={handleInputChange}
                  className='col-span-3'
                  placeholder='Enter product type'
                />
              </div>
              <div className='w-full flex flex-col justify-end items-start gap-2'>
              <Selector
                  id='unit'
                  name={"Select Unit"}
                  options={units}
                  setSelectedOption={(value) =>
                    setFormData((prevData) => ({ ...prevData, unit: value }))
                  }
                  selectedOption={formData?.unit}
                />
              </div>
            </div>

            {/* Category Selector */}
            <CategorySelector
              selectedCategories={formData.categories}
              setSelectedCategories={(categories) =>
                setFormData((prevData) => ({
                  ...prevData,
                  categories,
                }))
              }
            />
          </div>
          <DialogFooter>
            <Button type='submit'>{isEditMode ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { RxCross2 } from "react-icons/rx";

const CategorySelector = ({ selectedCategories, setSelectedCategories }) => {
  const availableCategories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
    "Category 9",
    "Category 10",
  ];

  const handleAddCategory = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setSelectedCategories(
      selectedCategories.filter((category) => category !== categoryToRemove)
    );
  };

  return (
    <div className='w-full px-0.5 py-2 mx-auto'>
      <div className='mb-4'>
        <Select onValueChange={handleAddCategory}>
          <SelectTrigger className='w-full'>
            <span>Select a category</span>
          </SelectTrigger>
          <SelectContent className='flex'>
            {availableCategories.map((category, index) => (
              <SelectItem
                key={index}
                value={category}
                className={`${
                  selectedCategories.includes(category) ? "bg-muted" : ""
                }`}
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-wrap gap-2'>
        {selectedCategories.map((category, index) => (
          <div
            key={index}
            className='flex items-center px-2 py-1 text-sm text-white bg-foreground/35 rounded'
          >
            <span>{category}</span>
            <button
              className='ml-2 text-white'
              onClick={() => handleRemoveCategory(category)}
            >
              <RxCross2 className='w-4 h-4' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;

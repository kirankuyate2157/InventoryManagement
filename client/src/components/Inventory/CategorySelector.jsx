import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { RxCross2 } from "react-icons/rx";
const CategorySelector = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const availableCategories = [
    "Technology",
    "Science",
    "Health",
    "Education",
    "Business",
    "Entertainment",
    "Sports",
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
        {/* <label className='block mb-2 text-sm '>
          Select Categories
        </label> */}
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

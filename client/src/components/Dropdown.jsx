import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const Dropdown = ({ name, options, setSelectedOption, selectedOption,className,variant="" }) => {
  const handleOptionClick = (option) => {
    console.log("pt s", option);
    setSelectedOption(option);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Button className={`${className}`} variant={variant}>{selectedOption ? selectedOption : name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options?.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`${selectedOption === option ? " bg-muted" : ""}`}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;

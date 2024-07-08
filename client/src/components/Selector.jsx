import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function Selector({
  name,
  options,
  setSelectedOption,
  selectedOption,
  className = "",
}) {
  return (
    <Select value={selectedOption} onValueChange={setSelectedOption}>
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder={name ?? "Select"}>
          {(selectedOption || name )?? "Select"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{name ?? "Select value"}</SelectLabel>
          {options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

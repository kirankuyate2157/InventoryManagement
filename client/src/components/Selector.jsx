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
    <Select>
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder={name ?? "Select"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{name ?? "Select value"}</SelectLabel>
          {options?.map((option, index) => (
            <SelectItem
              key={index}
              onClick={() => setSelectedOption(option)}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./../../components/ui/table";
import { InventoryPop } from "./InventoryPop";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { RiEdit2Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { updateInventory } from "./apis/inventoryAPI";

const dummy = [
  {
    Inv_Id: "INV001",
    name: "Product 1",
    description: "Description for Product 1",
    images: ["image1.jpg", "image2.jpg"],
    price: "250.00",
    type: "Type 1",
    unit: "Kilogram (kg)",
    stocks: 100,
    categories: ["Category 1", "Category 2"],
  },
  {
    Inv_Id: "INV002",
    name: "Product 2",
    description: "Description for Product 2",
    images: ["image3.jpg", "image4.jpg"],
    price: "150.00",
    type: "Type 2",
    unit: "Centimeter (cm)",
    stocks: 200,
    categories: ["Category 3", "Category 4"],
  },
  {
    Inv_Id: "INV003",
    name: "Product 3",
    description: "Description for Product 3",
    images: ["image5.jpg", "image6.jpg"],
    price: "350.00",
    type: "Type 3",
    unit: "Liter (L)",
    stocks: 300,
    categories: ["Category 5", "Category 6"],
  },
  {
    Inv_Id: "INV004",
    name: "Product 4",
    description: "Description for Product 4",
    images: ["image7.jpg", "image8.jpg"],
    price: "450.00",
    type: "Type 4",
    unit: "Kilogram (kg)",
    stocks: 400,
    categories: ["Category 7", "Category 8"],
  },
  {
    Inv_Id: "INV005",
    name: "Product 5",
    description: "Description for Product 5",
    images: ["image9.jpg", "image10.jpg"],
    price: "550.00",
    type: "Type 5",
    unit: "Centimeter (cm)",
    stocks: 500,
    categories: ["Category 9", "Category 10"],
  },
];

export default function InvTable({ data }) {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    price: "",
    type: "",
    unit: "",
    stocks: 0,
    categories: [],
    Inv_Id: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [mode, setMode] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Fetch new data based on the page
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(data[index]);
  };

  const handleModify = (index) => {
    setFormData(data[index]);
    setMode(true);
    setOpen(true);
  };

  const handleSaveEdit = async (id) => {
    const res = await updateInventory(id, {
      stocks: formData.stocks,
      price: formData.price,
    });

    data[editIndex] = { ...formData };
    setEditIndex(null);
  };

  const handleSwitch = async (index, id) => {
    console.log("ssss :", {
      is_active: !data[index].is_active,
    });
    const updatedInventory = await updateInventory(id, {
      is_active: !data[index].is_active,
    });

    data[index] = {
      ...data[index],
      is_active: updatedInventory.is_active,
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      is_active: updatedInventory.is_active,
    }));
  };
  return (
    <div className='rounded border overflow-hidden'>
      <InventoryPop
        open={open}
        setOpen={setOpen}
        formData={formData}
        setFormData={setFormData}
        isEditMode={mode}
      />
      <Table className=''>
        <TableHeader>
          <TableRow className='bg-muted'>
            <TableHead className='w-[100px] p-3'>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stocks</TableHead>
            <TableHead className='text-center p-3'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((invoice, index) => (
            <TableRow key={invoice.Inv_Id} className='gap-2'>
              <TableCell className='font-medium p-4'>{invoice.id}</TableCell>
              <TableCell>{invoice.name}</TableCell>
              <TableCell>{invoice.type}</TableCell>
              <TableCell>
                {invoice.categories
                  .map((category, index) => category)
                  .join(", ")}
              </TableCell>
              <TableCell>{invoice.unit}</TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    id='price'
                    type='number'
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        price: e.target.value,
                      }))
                    }
                  />
                ) : (
                  invoice.price
                )}
              </TableCell>
              <TableCell>
                {editIndex === index ? (
                  <Input
                    id='stocks'
                    type='number'
                    value={formData.stocks}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        stocks: e.target.value,
                      }))
                    }
                  />
                ) : (
                  invoice.stocks
                )}
              </TableCell>
              <TableCell className='text-right p-4'>
                <div className='flex gap-2 justify-end  items-center'>
                  {editIndex === index ? (
                    <Button
                      variant='outline'
                      onClick={() => handleSaveEdit(invoice.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <div className='flex gap-2 justify-end'>
                      <Button
                        variant='outline'
                        onClick={() => handleEdit(index)}
                      >
                        <RiEdit2Line />
                      </Button>
                      <Button
                        variant='outline'
                        onClick={() => handleModify(index)}
                      >
                        Modify
                      </Button>
                    </div>
                  )}
                  <Switch
                    checked={invoice.is_active}
                    onCheckedChange={() => handleSwitch(index, invoice.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='w-full bg-muted flex justify-end items-center p-2'>
        <Pagination className='justify-end px-2'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href='#'
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

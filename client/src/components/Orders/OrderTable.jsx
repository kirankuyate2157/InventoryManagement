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
import Dropdown from "../Dropdown";

const initialOrder = {
  id: "ORD001",
  items: [
    {
      product: {
        id: "PROD001",
        name: "Product 1",
        type: "Electronics",
        unit: "Piece",
        price: "$100.00",
        image:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D",
      },
      status: "Ordered",
      quantity: 2,
    },
    {
      product: {
        id: "PROD002",
        name: "Product 2",
        type: "Books",
        unit: "Piece",
        price: "$50.00",
        image:
          "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D",
      },
      status: "Ordered",
      quantity: 2,
    },
  ],
  customer: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  paymentStatus: "Paid",
  totalAmount: "$250.00",
  orderDate: "2023-01-01",
};

const OrderTable = () => {
  const [order, setOrder] = useState(initialOrder);
  const [filterOption, setFilterOption] = useState(null);
  const filterOptions = ["Ordered", "Dispatched", "Delivered"];

  const handleStatusChange = (index, newStatus) => {
    const updatedItems = order.items.map((item, i) =>
      i === index ? { ...item, status: newStatus } : item
    );
    setOrder({ ...order, items: updatedItems });
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
            <TableHead className='font-semibold'>Unit</TableHead>
            <TableHead className='font-semibold'>Quantity</TableHead>
            <TableHead className='font-semibold'>Price</TableHead>
            <TableHead className='font-semibold'>Status</TableHead>
            <TableHead className='text-center p-3 font-semibold'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='bg-white'>
          {order.items.map((item, index) => (
            <TableRow key={item.product.id} className='gap-2'>
              <TableCell className='font-medium p-4 w-1/6 '>
                <div className='flex justify-start items-center gap-2 w-full '>
                  <img
                    src={
                      item?.product?.image ||
                      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={""}
                    className='w-10 h-11 bg-muted rounded'
                  />
                  <h1>{item.product.id}</h1>
                </div>
              </TableCell>
              <TableCell>{item.product.name}</TableCell>
              <TableCell>{item.product.type}</TableCell>
              <TableCell>{item.product.unit}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell className='p-4'>{item.product.price}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className='text-center p-4'>
                <Dropdown
                  name='Change status'
                  variant='outline'
                  options={filterOptions}
                  selectedOption={item.status}
                  setSelectedOption={(newStatus) =>
                    handleStatusChange(index, newStatus)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;

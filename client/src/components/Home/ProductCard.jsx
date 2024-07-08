import React from "react";

import { FaShoppingCart, FaDollarSign } from "react-icons/fa";
import {
  Card as ShadcnCard,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Button } from "../ui/button";
import LinesEllipsis from "react-lines-ellipsis";

const ProductCard = ({ image, name, brand, price, marketPrice }) => {
  return (
    <ShadcnCard className='product-card border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
      <CardHeader className='p-0 overflow-hidden'>
        <img
          src={image}
          alt={name}
          className='w-full h-28 sm:h-48 object-cover hover:scale-105'
        />
      </CardHeader>
      <CardContent className='p-2 sm:p-4'>
        <h1 as='h2' className='sm:text-lg font-semibold'>
          <LinesEllipsis
            text={name || "title"}
            maxLine={1}
            ellipsis='...'
            trimRight
            basedOn='words'
          />
        </h1>
        <h1
          as='p'
          className='text-xs sm:text-sm flex justify-end text-end text-gray-500'
        >
          -
          <LinesEllipsis
            text={brand || "brand"}
            maxLine={1}
            ellipsis='...'
            trimRight
            basedOn='words'
          />
        </h1>
        <div className='flex items-center mt-2'>
          <h1
            as='span'
            className='text-md sm:text-xl font-bold text-green-600 flex items-center'
          >
            <FaDollarSign />
            {price}
          </h1>
          <h1
            as='span'
            className='text-xs sm:text-sm text-gray-400 line-through ml-2'
          >
            {marketPrice}
          </h1>
        </div>
      </CardContent>
      <CardFooter className='p-2 gap-2 flex m-0  justify-around sm:justify-between items-center'>
        <Button className='w-full text-xs sm:text-sm'>
          <FaShoppingCart className='mr-1 sm:mr-2 h-4 sm:w-4' />
          Add to Cart
        </Button>
        <Button className='w-full text-xs sm:text-sm'>Buy</Button>
      </CardFooter>
    </ShadcnCard>
  );
};

export default ProductCard;

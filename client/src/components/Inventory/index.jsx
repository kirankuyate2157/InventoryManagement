import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import { GoChevronRight } from "react-icons/go";
import { RiSearch2Line } from "react-icons/ri";
import Dropdown from "../Dropdown";
import InvTable from "./InvTable";
import { InventoryPop } from "./InventoryPop";
import InventoryUpload from "./InventoryUpload";
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import ComboInventoryCreation from "./ComboInventoryCreation";
import { FaLayerGroup } from "react-icons/fa6";
import { MdOutlineAcUnit } from "react-icons/md";
import ComboAccordion from "./ComboAccordion";
import { initialCombo } from "./constant";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tab, setTab] = useState("inv");
  const [sortOrder, setSortOrder] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageDoc, setPageDoc] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    price: "",
    type: "",
    unit: "",
    stocks: 0,
    categories: [],
  });
  const perPage = 10;

  const [applicant, setApplicant] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [uploadedData, setUploadedData] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [isComboCreationOpen, setComboCreationOpen] = useState(false);
  const [combos, setCombos] = useState([]);

  const handleCreateCombo = (comboDetails) => {
    console.log("c gp : ", comboDetails);
    setCombos([...combos, comboDetails]);
  };

  const existingData = [
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

  const updateInventory = (updatedData) => {
    // Logic to update inventory with the new data
    console.log("Updated Inventory Data:", updatedData);
  };

  const handleCreateClick = () => {
    setIsEditMode(false);
    setIsPopOpen(true);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const parseCSVStrings = (data) => {
    return data.map((item) => {
      // Extract the CSV string
      const csvString =
        item[
          "Inv_Id,name,description,images,price,type,unit,stocks,categories"
        ];

      // Split the CSV string by commas, considering quoted fields
      const parts = csvString.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

      // Extract values into an object with proper keys
      return {
        Inv_Id: parts[0],
        name: parts[1],
        description: parts[2],
        images: parts[3].slice(1, -1).split(","), // Remove surrounding quotes and split into array
        price: parseFloat(parts[4]),
        type: parts[5],
        unit: parts[6],
        stocks: parseInt(parts[7]),
        categories: parts.slice(8).map((category) => category.slice(1, -1)), // Remove surrounding quotes from categories
      };
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        // const json = XLSX.utils.sheet_to_json(worksheet);
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        setUploadedData(json);
        // Parse the raw data
        const parsedData = parseCSVStrings(json);
        setUploadedData(parsedData);
        console.log("kkk : ", json);
        setIsUploadOpen(true);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const closeModal = () => {
    setIsUploadOpen(false);
  };

  return (
    <div className='py-5'>
      <div className='md:mb-5 w-full flex text-lg justify-between  items-center'>
        <div className='flex  justify-start'>
          <Button
            variant='link'
            onClick={() => setTab("inv")}
            className='text-lg pr-1'
          >
            Inventory
            <GoChevronRight className='h-4 w-4' />
          </Button>
          {tab === "combo" && (
            <Button
              variant='link'
              onClick={() => setTab("combo")}
              className='text-lg  pl-0 pr-1'
            >
              Combo
              <GoChevronRight className='h-4 w-4' />
            </Button>
          )}
        </div>
        <span className='flex gap-2'>
          <Button
            variant='outline'
            onClick={() => setTab("combo")}
            className='text-md'
          >
            <FaLayerGroup className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            onClick={() => setTab("deActive")}
            className='text-md'
          >
            <MdOutlineAcUnit className='h-4 w-4' />
          </Button>
        </span>
      </div>
      {tab === "inv" && (
        <>
          <div className='flex w-full items-center justify-between space-x-4 mt-2 mb-4'>
            <div className='md:w-80 px-5 bg-white shadow-md p-1 md:px-2 flex items-center gap-3 border border-gray-200 rounded-lg'>
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
            <div className='flex gap-3'>
              <Button onClick={() => setComboCreationOpen(true)}>
                Create Combo
              </Button>
              <input
                type='file'
                accept='.xlsx, .xls'
                ref={fileInputRef}
                onChange={handleFileUpload}
                className='hidden'
              />
              <Button onClick={handleUploadClick}>Upload</Button>
              <Button onClick={handleCreateClick}>Create</Button>
            </div>
          </div>
          <InvTable />
          <InventoryPop
            open={isPopOpen}
            setOpen={setIsPopOpen}
            formData={formData}
            setFormData={setFormData}
            isEditMode={isEditMode}
            uploadedData={uploadedData}
          />

          <InventoryUpload
            closeModal={closeModal}
            open={isUploadOpen}
            existingData={existingData}
            updateInventory={updateInventory}
            parsedData={uploadedData}
          />
          <ComboInventoryCreation
            open={isComboCreationOpen}
            closeModal={() => setComboCreationOpen(false)}
            inventoryItems={existingData}
            createCombo={handleCreateCombo}
          />
        </>
      )}
      {tab === "combo" && <ComboAccordion combos={initialCombo} />}
    </div>
  );
};

export default Inventory;

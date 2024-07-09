import { prisma } from "./../lib/db.js";

const createInventory = async (req, res) => {
  const { name, description, images, price, type, unit, categories } = req.body;

  try {
    if (!name || !price || !unit || !type) {
      return res
        .status(400)
        .json({ message: "Name, price, and unit are required fields 🫠" });
    }

    // check types
    if (
      typeof name !== "string" ||
      typeof price !== "number" ||
      typeof unit !== "string" ||
      typeof type !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Invalid data types for fields 🫠" });
    }

    const newInventory = await prisma.inventory.create({
      data: {
        name,
        description,
        images,
        price,
        type,
        unit,
        categories,
      },
    });

    res
      .status(201)
      .json({
        message: "Inventory created successfully ✅",
        inventory: newInventory,
      });
  } catch (error) {
    console.error("Error creating inventory:", error);
    res
      .status(500)
      .json({ message: "Failed to create inventory 🫠", error: error.message });
  }
};

const updateInventory = async (req, res) => {
  const { id } = parseInt(req.params);
  const { name, description, images, price, type, unit, is_active } = req.body;

  try {
    const existingInventory = await prisma.inventory.findUnique({
      where: { id: Number(id) },
    });

    if (!existingInventory) {
      return res.status(404).json({ message: "Inventory not found 🫠" });
    }

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (images !== undefined) updateData.images = images; // directly updating all images
    if (price !== undefined) updateData.price = price;
    if (type !== undefined) updateData.type = type;
    if (unit !== undefined) updateData.unit = unit;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (categories !== undefined) updateData.categories = categories;

    const updatedInventory = await prisma.inventory.update({
      where: { id: Number(id) },
      data: updateData,
    });

    res.json({
      message: "Inventory updated successfully",
      inventory: updatedInventory,
    });
  } catch (error) {
    console.error("Error updating inventory:", error);
    res
      .status(500)
      .json({ message: "Failed to update inventory 🫠", error: error.message });
  }
};

const deleteInventory = async (req, res) => {
  const { id } = Number(req.params);

  try {
    const existingInventory = await prisma.inventory.findUnique({
      where: { id: id },
    });

    if (!existingInventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    const inventory = await prisma.inventory.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: "Inventory deleted successfully", inventory });
  } catch (error) {
    console.error("Error deleting inventory:", error);
    res
      .status(500)
      .json({ message: "Failed to delete inventory", error: error.message });
  }
};

const updateInventoryBatch = async (req, res) => {
  const inventoryUpdates = req.body.inventoryUpdates; //inv array

  try {
    if (!Array.isArray(inventoryUpdates)) {
      throw new Error(
        "Invalid data type for inventoryUpdates. Expected an array. 🫠"
      );
    }

    const updatedInventories = await Promise.all(
      inventoryUpdates?.map(async (update) => {
        const { id, stocks, price } = update;

        const existingInventory = await prisma.inventory.findUnique({
          where: { id },
        });

        if (!existingInventory) {
          throw new Error(`Inventory item with id ${id} not found. 🫠`);
        }

        const updatedInventory = await prisma.inventory.update({
          where: { id },
          data: {
            stocks: stocks !== undefined ? stocks : existingInventory.stocks,
            price: price !== undefined ? price : existingInventory.price,
          },
        });

        return updatedInventory;
      })
    );

    res
      .status(200)
      .json({
        message: "Inventory items updated successfully",
        updatedInventories,
      });
  } catch (error) {
    console.error("Error updating inventory items:", error);
    res
      .status(500)
      .json({
        message: "Failed to update inventory items 🫠",
        error: error.message,
      });
  }
};

const getInventoryById = async (req, res) => {
  const { id } = Number(req.params);

  try {
    const inventory = await prisma.inventory.findUnique({
      where: {
        id: id,
      },
    });

    if (!inventory) {
      return res
        .status(404)
        .json({ message: `Inventory with ID ${id} not found 🫠` });
    }

    res.status(200).json({ inventory });
  } catch (error) {
    console.error("Error fetching inventory by ID:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch inventory 🫠", error: error.message });
  }
};

const getAllInventory = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    filter = "",
    sortBy = "created_at",
    sortOrder = "asc",
  } = req.query;

  const offset = (page - 1) * limit;

  try {
    const query = {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { type: { contains: search, mode: "insensitive" } },
      ],
      categories: { contains: filter },
    };

    const inventory = await prisma.inventory.findMany({
      where: query,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: offset,
      take: limit,
    });

    const totalItems = await prisma.inventory.count({
      where: query,
    });

    res.status(200).json({
      inventory,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch inventory", error: error.message });
  }
};

export {
  createInventory,
  updateInventory,
  deleteInventory,
  updateInventoryBatch,
  getAllInventory,
  getInventoryById,
};

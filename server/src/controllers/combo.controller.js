import { prisma } from "./../lib/db.js";

const createCombo = async (req, res) => {
  const { name, description, images, items } = req.body;

  if (!name || !items || items.length === 0 || !areItemsValid(items)) {
    return res
      .status(400)
      .json({ message: "Name and valid items are required 🫠" });
  }

  try {
    const total_price = calculateTotalPrice(items);

    const newCombo = await prisma.combo.create({
      data: {
        name,
        description,
        images,
        total_price,
        items: {
          createMany: {
            data: items.map((item) => ({
              inventory_id: item?.inventory_id,
              quantity: item?.quantity || 1,
              comboPrice: item?.comboPrice || 0,
              comboUnit: item?.comboUnit || "",
            })),
          },
        },
      },
      include: {
        items: true,
      },
    });

    res
      .status(201)
      .json({ message: "Combo created successfully", combo: newCombo });
  } catch (error) {
    // Handle database or other errors
    console.error("Error creating combo:", error);
    res
      .status(500)
      .json({ message: "Failed to create combo 🫠", error: error.message });
  }
};

const updateComboItem = async (req, res) => {
  const { comboId, itemId } = req.params;
  const { quantity, comboPrice, comboUnit } = req.body;

  if (!quantity && !comboPrice && !comboUnit) {
    return res
      .status(400)
      .json({ message: "at least one field value are required 🫠" });
  }

  try {
    const combo = await prisma.combo.findUnique({
      where: { id: Number(comboId) },
      include: { items: true },
    });

    if (!combo) {
      return res.status(404).json({ message: "Combo not found" });
    }

    const existingItem = combo.items.find(
      (ci) => ci.id === parseInt(itemId, 10)
    );
    if (!existingItem) {
      return res.status(404).json({ message: "Combo item not found" });
    }

    const itemData = {};
    if (quantity !== undefined) itemData.quantity = quantity;
    if (comboPrice !== undefined) itemData.comboPrice = comboPrice;
    if (comboUnit !== undefined) itemData.comboUnit = comboUnit;

    const updatedItem = await prisma.comboItem.update({
      where: { id: existingItem.id },
      data: itemData,
    });

    // Recalculate
    const updatedItems = combo.items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    const total_price = calculateTotalPrice(updatedItems);

    // Updating new total price
    const updatedCombo = await prisma.combo.update({
      where: { id: parseInt(comboId, 10) },
      data: {
        total_price,
      },
      include: { items: true },
    });

    res
      .status(200)
      .json({
        message: "Combo item updated successfully",
        combo: updatedCombo,
      });
  } catch (error) {
    console.error("Error updating combo item:", error);
    res
      .status(500)
      .json({ message: "Failed to update combo item 🫠", error: error.message });
  }
};

const deleteCombo = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.comboItem.deleteMany({
      where: { combo_id: parseInt(id, 10) },
    });

    await prisma.combo.delete({
      where: { id: parseInt(id, 10) },
    });

    res
      .status(200)
      .json({ message: "Combo and associated items deleted successfully" });
  } catch (error) {
    console.error("Error deleting combo:", error);
    res
      .status(500)
      .json({ message: "Failed to delete combo 🫠", error: error.message });
  }
};

const addItemToCombo = async (req, res) => {
  const { id } = req.params;
  const { inventory_id, quantity, comboPrice, comboUnit } = req.body;

  try {
    // Validate input
    if (!inventory_id || !quantity || !comboPrice || !comboUnit) {
      return res.status(400).json({ message: "All fields are required 🫠" });
    }

    const newComboItem = await prisma.comboItem.create({
      data: {
        inventory_id,
        quantity,
        comboPrice,
        comboUnit,
        combo_id: parseInt(id, 10),
      },
    });

    const comboItems = await prisma.comboItem.findMany({
      where: { combo_id: parseInt(id, 10) },
    });

    const totalPrice = calculateTotalPrice(comboItems);

    await prisma.combo.update({
      where: { id: parseInt(id, 10) },
      data: { total_price: totalPrice },
    });

    res
      .status(201)
      .json({
        message: "Item added to combo successfully",
        comboItem: newComboItem,
      });
  } catch (error) {
    console.error("Error adding item to combo:", error);
    res
      .status(500)
      .json({ message: "Failed to add item to combo 🫠", error: error.message });
  }
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    return total + (item.quantity || 1) * item.comboPrice;
  }, 0);
};

const areItemsValid = (items) => {
  return items.every(
    (item) => item.inventory_id && item.comboPrice && item.comboUnit
  );
};

const getAllCombos = async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  try {
    const offset = (page - 1) * limit;
    const query = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { total_price: { contains: search, mode: "insensitive" } },
    ];

    const combos = await prisma.combo.findMany({
      where: {
        OR: query,
      },
      skip: parseInt(offset, 10),
      take: parseInt(limit, 10),
      include: {
        items: {
          include: {
            inventory: true,
          },
        },
      },
    });

    const totalCombos = await prisma.combo.count({
      where: {
        OR: query,
      },
    });

    res.status(200).json({
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages: Math.ceil(totalCombos / limit),
      totalCombos,
      combos,
    });
  } catch (error) {
    console.error("Error fetching combos:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch combos 🫠", error: error.message });
  }
};

const getComboById = async (req, res) => {
  const { id } = req.params;

  try {
    const combo = await prisma.combo.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        items: {
          include: {
            inventory: true,
          },
        },
      },
    });

    if (!combo) {
      return res.status(404).json({ message: "Combo not found 🫠" });
    }

    res.status(200).json(combo);
  } catch (error) {
    console.error("Error fetching combo:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch combo 🫠", error: error.message });
  }
};

export {
  createCombo,
  deleteCombo,
  updateComboItem,
  addItemToCombo,
  getAllCombos,
  getComboById,
};

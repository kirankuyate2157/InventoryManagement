export const units = [
    // Weight Units
    "Gram (g)",
    "Kilogram (kg)",
    "Tonne (t)",
    "Pound (lb)",
    "Ounce (oz)",

    // Volume Units
    "Milliliter (ml)",
    "Liter (L)",
    "Cubic meter (m³)",
    "Cubic centimeter (cm³)",
    "Gallon (gal)",
    "Quart (qt)",
    "Pint (pt)",
    "Fluid ounce (fl oz)",

    // Length Units
    "Millimeter (mm)",
    "Centimeter (cm)",
    "Meter (m)",
    "Kilometer (km)",
    "Inch (in)",
    "Foot (ft)",
    "Yard (yd)",
    "Mile (mi)",

    // Area Units
    "Square millimeter (mm²)",
    "Square centimeter (cm²)",
    "Square meter (m²)",
    "Square kilometer (km²)",
    "Acre (ac)",
    "Hectare (ha)",
    "Square inch (in²)",
    "Square foot (ft²)",
    "Square yard (yd²)",
    "Square mile (mi²)",

    // Count Units
    "Piece (pcs)",
    "Dozen (doz)",
    "Gross (gr)",
    "Score (sc)",
    "Unit (unit)",

    // Time Units
    "Second (s)",
    "Minute (min)",
    "Hour (h)",
    "Day (d)",
    "Week (wk)",
    "Month (mo)",
    "Year (yr)",

    // Other Units
    "Pack (pk)",
    "Box (box)",
    "Set (set)",
    "Bundle (bdl)",
    "Roll (rl)",
    "Tube (tb)",
    "Carton (ctn)",
    "Pallet (plt)"
];
export const initialCombo = [{
    comboId: "COMBO001",
    name: "Combo 1",
    description: "This is a description of Combo 1",
    images: [
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D"
    ],
    items: [
        {
            id: "PROD001",
            name: "Product 1",
            type: "Electronics",
            unit: "Piece",
            comboPrice: "$100.00",
            quantity: 2,
        },
        {
            id: "PROD002",
            name: "Product 2",
            type: "Books",
            unit: "Piece",
            comboPrice: "$50.00",
            quantity: 2,
        },
    ],
    totalPrice: "$250.00",
}, {
    comboId: "COMBO002",
    name: "Combo 1",
    description: "This is a description of Combo 1",
    images: [
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D"
    ],
    items: [
        {
            id: "PROD001",
            name: "Product 1",
            type: "Electronics",
            unit: "Piece",
            comboPrice: "$100.00",
            quantity: 2,
        },
        {
            id: "PROD002",
            name: "Product 2",
            type: "Books",
            unit: "Piece",
            comboPrice: "$50.00",
            quantity: 2,
        },
    ],
    totalPrice: "$330.00",
}]

import  { useState, useEffect, useRef } from "react";
import { productData } from "./components/ProductData";
import ProductList from "./components/ProductList";
import Chart from "./components/Chart";


const App = () => {
  // const inputRef = useRef<any>(null)
  const [filteredProducts, setFilteredProducts] = useState<any>(
    [...productData].sort((a, b) => parseInt(b.id) - parseInt(a.id)) // Sort by numeric id
  );
  
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedCapacity, setSelectedCapacity] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", data: "" });


  useEffect(() => {
    let filtered = productData.filter((p) => {
      const colorMatch = selectedColor ? p.data?.color === selectedColor : true;
      const capacityMatch = selectedCapacity ? p.data?.capacity === selectedCapacity : true;
      return colorMatch && capacityMatch;
    });
    setFilteredProducts(filtered);
  }, [selectedColor, selectedCapacity]);

  const colorData = Object.entries(
    filteredProducts.reduce((acc: { [x: string]: any }, product: { data: { color: any; }; }) => {
      const color = product.data?.color;
      if (color) {
        acc[color] = (acc[color] || 0) + 1;
      }
      return acc;
    }, {})

  ).map(([name, value]) => ({ name, value }));

  const capacityData = Object.entries(
    filteredProducts.reduce((acc: { [x: string]: any }, product: { data: { capacity: any; }; }) => {
      const capacity = product.data?.capacity;
      if (capacity) {
        acc[capacity] = (acc[capacity] || 0) + 1;
      }
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const handleProduct = (e: { target: { name: any; value: any; }; }) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value

    }))



  }
  const handleJsonData = (e: { target: { name: any; value: any; }; }) => {
    // try {
    //  const jsonData = JSON.parse(e.target.value);
      setFormData((prev) => ({
        ...prev,
        [e.target.name]:e.target.value,
      }));
    // } catch (error) {
      
    //   console.error("Invalid JSON format");
    // }

  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    try {
      const id = (filteredProducts.length + 1).toString();
      if( !formData.data){
        alert("Inavlid Json Foramt or Please Enter JsonData")
      }
      const newProduct = { id, name: formData.name, data: JSON.parse(formData.data) || null };
  
      // Append new product without modifying the original array
      const updatedProducts = [...filteredProducts, newProduct];
      setFilteredProducts(updatedProducts);
  
      // Store in localStorage as a JSON string
      localStorage.setItem("product", JSON.stringify(updatedProducts));
  
      console.log("Updated Product List:", updatedProducts);
  
      // Clear form
      setFormData({ name: '', data: '' });
  
    } catch (error) {
      alert("Invalid JSON Format! Please enter valid JSON data.");
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Product Listing with Charts</h1>
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-4 mt-4 ">
        <input type="text" onChange={handleProduct} value={formData.name} name="name" className="border px-4 py-2 focus:outline-blue-500"  placeholder="Product Name" required />
        <input type="text" onChange={handleJsonData} value={formData.data}  name="data" className="border px-4 py-2 focus:outline-blue-500" placeholder="Product Data (JSON)" />
        <button type="submit" className="border px-2 bg-gray-200 border-gray-400 rounded-sm  ">Add Product</button>
      </form>
      <div className="flex gap-4 my-4">
        <select
          className="border p-2 focus:outline-blue-500"
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="">Filter by Color</option>
          {[...new Set(productData.map((p) => p.data?.color).filter(Boolean))].map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <select
          className="border p-2 focus:outline-blue-500"
          onChange={(e) => setSelectedCapacity(e.target.value)}
        >
          <option value="">Filter by Capacity</option>
          {[...new Set(productData.map((p) => p.data?.capacity).filter(Boolean))].map((cap) => (
            <option key={cap} value={cap}>
              {cap}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        <ProductList filteredProducts={filteredProducts} />
      </div>
      
        <Chart capacityData={capacityData} colorData={colorData}/>
        
      
    </div>
  );
};

export default App;
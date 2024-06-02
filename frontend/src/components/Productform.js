import React, { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

const ProductForm = () => {
  const { dispatch } = useProductsContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { title, description };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/products`,
        {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      } else {
        setTitle("");
        setDescription("");
        setError(null);
        setEmptyFields([]);
        console.log("new product added", json);
        dispatch({ type: "CREATE_PRODUCT", payload: json });
      }
    } catch (error) {
      setError("An error occurred while adding the product.");
      setEmptyFields([]);
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new product</h3>
      <label>Product Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Product Description</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <button>Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProductForm;

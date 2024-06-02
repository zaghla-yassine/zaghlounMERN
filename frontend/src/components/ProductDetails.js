import { useState, useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductsContext();

  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(product.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    product.description
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteClick = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/` + product._id,
      {
        method: "DELETE",
        headers: {},
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (!isSubmitting) return;

    const updateProduct = async () => {
      const optimisticUpdatedProduct = {
        ...product,
        title: updatedTitle,
        description: updatedDescription,
      };
      dispatch({ type: "UPDATE_PRODUCT", payload: optimisticUpdatedProduct });
      setIsUpdateFormVisible(false);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/` + product._id,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: updatedTitle,
              description: updatedDescription,
            }),
          }
        );

        if (!response.ok) {
          dispatch({ type: "UPDATE_PRODUCT", payload: product });
          throw new Error("Network response was not ok");
        }

        const json = await response.json();
        dispatch({ type: "UPDATE_PRODUCT", payload: json });
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    updateProduct();
  }, [isSubmitting, dispatch, product, updatedTitle, updatedDescription]);

  return (
    <div className="product-details">
      <h4>{product.title}</h4>
      <p>
        <strong>Description : </strong>
        {product.description}
      </p>
      <p>
        {formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}
      </p>
      <button className="delete-button" onClick={handleDeleteClick}>
        Delete
      </button>
      <button
        className="update-button"
        onClick={() => setIsUpdateFormVisible(!isUpdateFormVisible)}
      >
        Update
      </button>

      {isUpdateFormVisible && (
        <form onSubmit={handleUpdateSubmit}>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            placeholder="Description"
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ProductDetails;

//fucntion that returns a template

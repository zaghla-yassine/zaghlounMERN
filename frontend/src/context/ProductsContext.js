import { useReducer } from "react";
import { createContext } from "react";

export const ProductsContext = createContext();

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "CREATE_PRODUCT":
      return {
        products: [action.payload, ...state.products],
      };
    case "DELETE_PRODUCT":
      return {
        products: state.products.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_PRODUCT":
      return {
        products: state.products.map((prod) =>
          prod._id === action.payload._id ? action.payload : prod
        ),
      };
    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, { products: null });

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
//children represents the app component that we wrapped into the index file
//... : spread the properties inside the object

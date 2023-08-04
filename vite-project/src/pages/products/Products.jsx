import { Types } from "mongoose";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ProductForm from "@components/Product/ProductForm/ProductForm";
import ProductList from "@components/Product/ProductList/ProductList";
import { homeLink } from "@utils/linkConfig";
import { DefaultButton } from "@components/buttons.styled";
import { addProduct, deleteProduct, fetchProducts } from "@redux/products/operations";
import { selectAllProducts } from "@redux/products/selectors";

/**
Component for managing products.
@returns {JSX.Element} - Returns a JSX element containing product form and list components.
*/
const Products = () => {
  let { id } = useParams();
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const [newProduct, setNewProduct] = useState({
    _id: new Types.ObjectId(),
    productsName: "",
    qty: 1,
    productsPrice: "",
    amount: 0,
    productsTax: "",
  });

  useEffect(() => {
    if(products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products]);

  /**
  Updates the state of newProduct object when input values change.
  @param {Object} event - The event object.
  */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  /**
   * Handles form submission and sends new product data to server.
   * @param {Object} e - The event object.
   */
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addProduct(newProduct))
      .then((res) => {
        setNewProduct({
          _id: new Types.ObjectId(),
          productsName: "",
          qty: 1,
          productsPrice: "",
          amount: 0,
          productsTax: "",
        });
      })
      .catch((err) => console.error(err));
  };

  /**
   * Deletes a product from the server and updates product list state.
   * @param {String} productId - The ID of the product to be deleted.
   */
  const deleteProductHandleClick = (productId) => {
    dispatch(deleteProduct(productId))
  };

  return (
    <div className="container">
      <div className="invoice__home-logo">
        <h1>Products</h1>
        {products && <p>There are total {products.length} products</p>}
      </div>
      <Link to={homeLink}>
        <DefaultButton className="back">Go Back</DefaultButton>
      </Link>

      <ProductForm
        newProduct={newProduct}
        handleClick={handleClick}
        handleChange={handleChange}
      />
      <ProductList id={id} products={products} onDelete={deleteProductHandleClick} />
    </div>
  );
};

export default Products;

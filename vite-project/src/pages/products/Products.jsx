import { Types } from "mongoose";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";
import ProductForm from "../../components/Product/ProductForm/ProductForm";
import ProductList from "../../components/Product/ProductList/ProductList";
import { homeLink } from "../../utils/linkConfig";
import { DefaultButton } from "../../components/buttons.styled";
import { fetchProducts } from "../../redux/products/operations";
import { selectAllProducts } from "../../redux/products/selectors";
import { selectToken } from "../../redux/auth/selectors";

/**
Component for managing products.
@returns {JSX.Element} - Returns a JSX element containing product form and list components.
*/
const Products = () => {
  let { id } = useParams();
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const authToken = useSelector(selectToken)
  const [newProduct, setNewProduct] = useState({
    _id: new Types.ObjectId(), // wygeneruj nowe ID
    productsName: "",
    qty: 1,
    productsPrice: "",
    amount: 0,
    productsTax: "",
  });

  useEffect(() => {
    if(products.length === 0 && authToken) {
      dispatch(fetchProducts(authToken))
    }
  }, [dispatch, products, authToken]);

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
    axios
      .post(`/addProduct`, newProduct, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res.data, newProduct);
        setAllProducts([...allProducts, newProduct]); // aktualizujemy stan listy produktów
        setNewProduct({
          _id: new Types.ObjectId(), // wygeneruj nowe ID
          productsName: "",
          qty: 1,
          productsPrice: "",
          amount: 0,
          productsTax: "",
        }); // resetujemy dane dotyczące produktu
      })
      .catch((err) => console.error(err));
  };

  /**
   * Deletes a product from the server and updates product list state.
   * @param {String} productId - The ID of the product to be deleted.
   */
  const deleteProduct = (productId) => {
    axios
      .delete(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllProducts(
          allProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((err) => console.error(err));
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
      <ProductList id={id} products={products} onDelete={deleteProduct} />
    </div>
  );
};

export default Products;

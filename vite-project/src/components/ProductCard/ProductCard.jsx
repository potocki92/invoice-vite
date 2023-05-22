import React, { useEffect, useState } from "react";
import "./ProductCard.css";

/**********************************************************************************************

  The code defines a component named "ProductCard" that takes in props such 
  as invoice, setNewInvoice, product, products, index, and handleRemoveCard.

  It also defines functions such as updatedProduct, handleProductChange, and handleChange. 
  The updatedProduct function is used to update the products array of the invoice object 
  whenever a user makes changes to a product's quantity or price. 
  The handleProductChange function is called when the user selects a product from a list. 
  The handleChange function updates the productQty or productPrice state
  when the corresponding input is changed and updates the corresponding 
  product in the invoice by calling the updatedProduct function.

  The code returns a component that renders a view containing a select element, 
  two input elements, and a remove button. 
  The select element allows the user to select a product from a list. 
  The input elements allow the user to update the quantity and price of the selected product. 
  The remove button allows the user to remove the selected product from the invoice.

**********************************************************************************************/
////////// KOMPONENT KLASOWY TEST

// class ProductCard extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedProduct: {},
//     };
//   }

//   handleProductChange = (event) => {
//     const selectedProductId = event.target.value;
//     const selectedProduct = this.props.products.find(
//       (product) => product._id === selectedProductId
//     );
//     this.setState({ selectedProduct });
//     console.log(selectedProduct);
//   };

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   calculateAmount = () => {
//     const { productQty, productPrice, productTaxRate, productTax } = this.state;
//     const amount =
//       productQty *
//       (parseFloat(productPrice || 0) +
//         (parseFloat(productPrice || 0) * parseFloat(productTaxRate || 0)) /
//           100 +
//         parseFloat(productTax || 0));
//     this.setState({ amount });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.productQty !== this.state.productQty ||
//       prevState.productPrice !== this.state.productPrice ||
//       prevState.productTaxRate !== this.state.productTaxRate ||
//       prevState.productTax !== this.state.productTax
//     ) {
//       this.calculateAmount();
//     }
//   }
//   render() {
//     const {
//       selectedProduct,
//       productQty,
//       productPrice,
//       productTax,
//       productTaxRate,
//       amount,
//     } = this.state;
//     const { products } = this.props;
//     return (
//       <div className="view row flex b-b p-10 flex-align relative">
//         <div className="view w-25 p-4-8 flex-align flex">
//           {products.length ? (
//             <div className="flex">
//               <select
//                 className="custom-select"
//                 value={selectedProduct.productsName || ""}
//                 onChange={(event) => this.handleProductChange(event)}
//               >
//                 <option value={""}>
//                   {selectedProduct.productsName
//                     ? selectedProduct.productsName
//                     : "Select the product"}
//                 </option>
//                 {products.map((product) => (
//                   <option key={product._id} value={product._id}>
//                     {product.productsName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           ) : (
//             <div></div>
//           )}
//         </div>
//         <div className="view w-22 p-4-8 flex">
//           <div className="view w-50 p-4-8 pb-10">
//             <input
//               className="input dark right p-0"
//               name="productsQty"
//               placeholder="1"
//               value={productQty}
//               onChange={this.handleChange}
//             />
//           </div>
//           <div className="view w-50 p-4-8 pb-10 ">
//             <input
//               className="input dark right p-0"
//               name="productsTax"
//               placeholder="0.00"
//               value={productTax}
//               onChange={this.handleChange}
//             />
//           </div>
//         </div>
//         <div className="view w-35 p-4-8 flex">
//           <div className="view w-50 p-4-8 pb-10 ">
//             <input
//               className="input dark right p-0"
//               name="productsPrice"
//               placeholder="0000.00"
//               value={productPrice}
//               onChange={this.handleChange}
//             />
//           </div>
//           <div className="view w-50 p-4-8 pb-10">
//             <input
//               className="input dark right p-0"
//               name="productsRateTax"
//               placeholder="0000.00"
//               value={productTaxRate}
//               onChange={this.handleChange}
//             />
//           </div>
//         </div>
//         <div className="view w-18 p-4-8 pb-10 right">
//           <span className="span dark">{amount}</span>
//         </div>
//         <button className="circle-button delete">-</button>
//       </div>
//     );
//   }
// }

// export default ProductCard;

const ProductCard = (props) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productQty, setProductQty] = useState(props.product.productsQty || 1);
  const [productPrice, setProductPrice] = useState(
    props.product.productsPrice || 1
  );
  const [productTax, setProductTax] = useState(props.product.productsTax || 0);
  const [productTaxRate, setProductTaxRate] = useState(
    props.product.productsRateTax || 0
  );
  const [amount, setAmount] = useState(1);

  /*
  This function takes in two arguments, key and value, and updates the invoice object with the new value.
  The function first creates a new array of updatedProducts by iterating over the invoice.products.items array using the map method.
  For the current product, identified by the index, the function creates a new object with the updated key and value.
  For all other products, the function returns the original product object.
  Finally, the function calls setNewInvoice with a new invoice object that merges the updated products array with the existing invoice object.
  This function is used in the component to update the products array of the invoice object whenever a user makes changes to a product's quantity or price.
*/
  const updatedProduct = (key, value) => {
    const updatedProducts = props.invoice.products.items.map((product, i) => {
      if (i === props.index) {
        return {
          ...product,
          [key]: value,
        };
      }
      return product;
    });
    console.log(updatedProducts);
    props.setNewInvoice({
      ...props.invoice,
      products: { ...props.invoice.products, items: updatedProducts },
    });
  };
  /*
  handleRemoveProduct:
  This is a function used to remove a product items from the invoice.
  It takes an index as an argument, removes the corresponding item from the "updateItems" array, and updates the state.
*/
  const handleRemoveProduct = () => {
    const updateItems = [...props.invoice.products.items];
    updateItems.splice(props.index, 1);

    props.setNewInvoice({
      ...props.invoice,
      products: {
        ...props.invoice.products,
        items: updateItems,
      },
    });
  };

  // Update amount for every change of productQty, productPrice, product.productsQty, product.productsPrice, productTaxRate or amount
  useEffect(() => {
    setProductPrice(props.product.productsPrice);
    setProductQty(props.product.productsQty);

    const updateTaxRate =
      productTax !== 1 ? productQty * productPrice * productTax.value : 0;
    setProductTaxRate(updateTaxRate);
    const updateAmount = productQty * productPrice + productTaxRate;
    setAmount(updateAmount);
    updatedProduct("productsRateTax", updateTaxRate);
    updatedProduct("amount", updateAmount);
  }, [
    productQty,
    productPrice,
    props.product.productsQty,
    props.product.productsPrice,
    productTaxRate,
    amount,
  ]);

  /*
  This code defines a function handleProductChange that is called when the user selects a product from a list.
  First, the function extracts the ID of the selected product from the event object and finds the corresponding product object in the products array.
  Then, it updates the state of the selectedProduct object with the name, quantity, and price of the selected product, and sets the amount to 0.
  The function also updates the state of the productPrice and productQty variables with the selected product's price and quantity.
  Next, the function creates a copy of the invoice object's products.items array using the spread operator.
  Then, the function updates the product at the specified index in the copied array with the selected product's name, quantity, price, and a zero amount.
  Finally, the function sets the state of the newInvoice object with the updated items array and the previous invoice object's products object using the spread operator.
  */
  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = props.products.find(
      (product) => product._id === selectedProductId
    );
    setSelectedProduct({
      productsName: selectedProduct.productsName,
      productsQty: selectedProduct.qty,
      productsPrice: selectedProduct.productsPrice,
      productsTax: selectedProduct.productsTax,
    });
    setProductPrice(selectedProduct.productsPrice);
    setProductQty(selectedProduct.qty);
    setProductTax(selectedProduct.productsTax);

    const updateProduct = [...props.invoice.products.items]; // copy all products from invoice.products

    // updates a specific product in an array of products
    updateProduct[props.index] = {
      productsName: selectedProduct.productsName,
      productsQty: selectedProduct.qty,
      productsPrice: selectedProduct.productsPrice,
      productsTax: selectedProduct.productsTax,
    };

    // updates the products object of the invoice object
    props.setNewInvoice({
      ...props.invoice,
      products: { ...props.invoice.products, items: updateProduct },
    });
  };

  /*
  This code defines a function called handleChange which takes an event object as an argument.
  Inside the function, the name and value properties of the event target are destructured and assigned to constants.

  The function then checks if the name property is equal to "productsQty" or "productsPrice".
  If the name is "productsQty", the value is set to the productQty state using the setProductQty function,
  and then the updatedProduct function is called with the "productsQty" key and the new value as arguments.

  Similarly, if the name is "productsPrice", the value is set to the productPrice state using the setProductPrice function,
  and then the updatedProduct function is called with the "productsPrice" key and the new value as arguments.

  Overall, this function updates the productQty or productPrice state when the corresponding input is changed,
  and then updates the corresponding product in the invoice by calling the updatedProduct function.
*/
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "productsQty") {
      setProductQty(value);
      updatedProduct("productsQty", value);
    }
    if (name === "productsPrice") {
      setProductPrice(value);
      updatedProduct("productsPrice", value);
    }
  };
  return (
    <div>
      {props.products.length ? (
        <div className="flex">
          <select
            value={selectedProduct.productsName || ""}
            onChange={(event) => handleProductChange(event)}
          >
            <option value={""}>
              {props.product.productsName
                ? props.product.productsName
                : "Select the product"}
            </option>
            {props.products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.productsName}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div></div>
      )}
      <input
        name="productsQty"
        placeholder="1"
        value={productQty}
        onChange={handleChange}
      />
      <input
        name="productsTax"
        placeholder="0"
        value={productTax.name || "0%"}
        onChange={handleChange}
      />
      <input
        name="productsPrice"
        placeholder="0000.00"
        value={productPrice}
        onChange={handleChange}
      />
      <input
        name="productsRateTax"
        placeholder="0000.00"
        value={productTaxRate || 0}
        onChange={handleChange}
      />
      <div className="view w-18 p-4-8 pb-10 right">
        <span className="span dark">{amount}</span>
      </div>
      <button className="circle-button delete" onClick={handleRemoveProduct}>
        -
      </button>
    </div>
  );
};

export default ProductCard;


import { RemoveButton } from "../../buttons.styled";
import { Container, CardWrapper, ProductName } from "./ProductList.styled";
import { RiDeleteBin2Fill } from "react-icons/ri";

/**
 * Renders a list of products.
 *
 * @component
 * @param {Object[]} products - The array of products to be rendered.
 * @param {Function} onDelete - The function to be called when a product is deleted.
 * @returns {JSX.Element} The rendered ProductList component.
 */
const ProductList = ({ products, onDelete }) => {
  return (
    <Container>
      {products?.map((product, index) => (
        <CardWrapper key={index}>
          <ProductName>
            <div>
              <p>product:</p>
              {product.productsName}
            </div>
            <div>
              <p>Tax:</p>
              {`${product.productsTax}%` || "0%"}
            </div>
            <div>
              <p>price:</p>
              {product.productsPrice}
            </div>
          </ProductName>
          <RemoveButton onClick={() => onDelete(product._id)}>
            <RiDeleteBin2Fill size={25}/>
          </RemoveButton>
        </CardWrapper>
      ))}
    </Container>
  );
};

export default ProductList;

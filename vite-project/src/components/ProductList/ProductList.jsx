import { RemoveButton } from "../buttons.styled";
import { Container, CardWrapper, ProductName } from "./ProductList.styled";
import { RiDeleteBin2Fill } from "react-icons/ri";

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
              {product.productsTax.name || "0%"}
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

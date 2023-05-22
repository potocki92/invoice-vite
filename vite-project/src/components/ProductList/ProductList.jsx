import { Container, CardWrapper, ProductName } from "./ProductList.styled";

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
          <button className="button" onClick={() => onDelete(product._id)}>
            Delete
          </button>
        </CardWrapper>
      ))}
    </Container>
  );
};

export default ProductList;

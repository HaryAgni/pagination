const ProductCard = ({ title, image }) => {
  return (
    <div className="card-container">
      <img src={image} alt={title} className="product-image" />
      <div>{title}</div>
    </div>
  );
};

export default ProductCard;

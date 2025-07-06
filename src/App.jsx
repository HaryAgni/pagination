import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const ITEMS_PER_PAGE = 10;
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=1000");
    const products = await data.json();
    setProductData(products.products);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const onLeftClick = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const onRightClick = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const totalPages = Math.ceil(productData.length / ITEMS_PER_PAGE);
  const start = currentPage * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return (
    <>
      <div className="root">
        <div>PAGINATION</div>
        <div className="products-container">
          {productData.slice(start, end).map((p) => (
            <ProductCard key={p.id} title={p.title} image={p.thumbnail} />
          ))}
        </div>
        <div className="pagination-container">
          <button disabled={currentPage == 0} onClick={onLeftClick}>
            ◀
          </button>
          {[...Array(totalPages).keys()].map((n) => (
            <span
              key={n}
              className="pagination-item"
              onClick={() => {
                handlePageChange(n);
              }}
            >
              {n + 1}
            </span>
          ))}
          <button
            disabled={currentPage == totalPages - 1}
            onClick={onRightClick}
          >
            ▶
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

import { StarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import card from "./ProductCard.module.css";

const ProductCard = ({ ele }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState("");
  const { image, title, Rating, RatingCount, price, off, _id } = ele;

  const navigate = useNavigate();

  const sendIDtoParam = (id) => {
    navigate(`/singlePage/${id}`);
  };
  // useEffect(()=>{

  // },[sendIDtoParam])

  let prevousPrice = Math.floor((price / 100) * off + price);
  return (
    <div
      className={card.productCard_main}
      key={_id}
      onClick={() => sendIDtoParam(_id)}
    >
      <div className={card.productCard_image_container}>
        <img src={image} alt="" />
      </div>
      <div className={card.product_description_box}>
        <h3 className={card.product_title}>{title}</h3>

        <div className={card.rating_box}>
          {Rating >= 1 ? <StarIcon border="black" color="#FFA500" /> : <p></p>}
          {Rating >= 2 ? <StarIcon border="black" color="#FFA500" /> : <p></p>}
          {Rating >= 3 ? <StarIcon border="black" color="#FFA500"/> : <p></p>}
          {Rating >= 4 ? <StarIcon border="black" color="#FFA500" /> : <p></p>}
          {Rating >= 5 ? <StarIcon border="black" color="#FFA500" /> : <p></p>}
          {RatingCount >= 1 ? (
            <p className={card.ratingCount}> | {RatingCount}</p>
          ) : (
            <p></p>
          )}
        </div>
        <div className={card.priceBox}>
          <p >Rs.</p>
          <h1>{price}</h1>
          <h2>{prevousPrice}</h2>
          <p>({off}% Off)</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

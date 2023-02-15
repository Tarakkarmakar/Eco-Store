import { StarIcon } from "@chakra-ui/icons"
import card from "./ProductCard.module.css"

const ProductCard = ({ele}) => {


 const {image,title,Rating,RatingCount,price,off,_id}=ele


let prevousPrice=400/100*off+price
  return (




    <div className={card.productCard_main} key={_id}>
     
     <div className={card.productCard_image_container}>
        <img src={image} alt="" />

     </div>
     <div className={card.product_description_box}>
      <h3 className={card.product_title}>{title}</h3>
    
    <div className={card.rating_box}>{Rating>=1?<StarIcon border="black"color="green"/>:<p></p>}
    {Rating>=2?<StarIcon border="black"color="green"/>:<p></p>}
    {Rating>=3?<StarIcon border="black"color="green"/>:<p></p>}
    {Rating>=4?<StarIcon border="black"color="green"/>:<p></p>}
    {Rating>=5?<StarIcon border="black"color="green"/>:<p></p>}
 {RatingCount>=1? <p className={card.ratingCount}> | {RatingCount}</p> :<p></p>}
   
</div>
<div className={card.priceBox}>
<p>Rs.</p>
<h1>{price}</h1>
<h2>{prevousPrice}</h2>
<p>({off}% Off)</p>
</div>
     </div>


      
    </div>
  )
}

export default ProductCard

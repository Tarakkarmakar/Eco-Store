import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { StarIcon } from "@chakra-ui/icons";
import singlePage from "./singlepage.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Products/action";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const SinglePage = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    console.log(id)
    let [product,setProduct]=useState([])
 const getData=()=>{
  
    axios
    .get(`${process.env.REACT_APP_API}/customerproducts/${id}`)
    .then((r) => {
     
    setProduct(r.data)
    })

    .catch((e) => {
     console.log("error product")


    })
 }
console.log(product)
      useEffect(() => {
       getData()
    
      }, [])
    const addToBag=()=>{

    }
    let prevousPrice=Math.floor(product.price/100*product.off+product.price)
  return (
    <>
  
    <div key={1} className={singlePage.main_div} >
    <div className={singlePage.img_container}>
      <div>
        <img src={product.image} />
      </div>
  
    </div>
    <div className={singlePage.detailsDiv_right}>
      <div style={{ width: "95%", margin: "auto" }}>
        <div style={{ textAlign: "left" }}>
          <div>
            <b>
              {" "}
              <p
                style={{
                  fontSize: "24px",
                  margin: "25px 0px -15px 0px ",
                  color: "darkslategray",
                }}
              >
                {}
               {product.title}
              </p>
            </b>
            <p style={{ fontSize: "20px", color: "#8b8d97" ,marginTop:"10px"}}>
              {}
           {product.brand}
            </p>
          </div>
          <div className={singlePage.ratingDiv} style={{marginTop:"15px",padding:"5px"}}>
            <div
              style={{
                display: "flex",
                gap: "2px",
                alignItems: "center",
                width: "40px",
              }}
            >
              <b>
                {" "}
                <p>{product.Rating} </p>
              </b>
              <p style={{ color: "#48958f" }}>
                <StarIcon color="green.300" style={{marginTop:"0px"}} fontSize="small" />
              </p>
            </div>
            <div
              style={{
                color: "#8b8d97",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              {" "}
              <p> | {product.RatingCount} Ratings  </p>
            </div>
          </div>
        </div>
        <hr style={{marginTop:"15px",marginBottom:"15px"}}></hr>
        <div style={{ textAlign: "left", marginTop: "-5px",marginBottom:"10px" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              width: "80%",
              marginBottom:"17px"
            }}
          >
            <p>
            Rs.
              {" "}
              <b
                style={{ color: "darkslategray", fontSize: "22px" }}
              >{product.price} </b>
            </p>
            <p
              style={{
                color: "#8b8d97",
                fontSize: "18px",
                marginTop: "-5px",
              }}
            >
              {" "}
         
              <span style={{ textDecoration: "line-through" }}>
                {" "}
                { prevousPrice}  
              </span>
            </p>
            <p style={{ color: "#ee9d20" }}>
              <b style={{ fontSize: "22px" }}>
                {" "}
                {product.off}%{" "} OFF
              </b>
            </p>
          </div>
          <div
            style={{
              marginTop: "-18px",
              color: "#79a987",
              fontSize: "14px",
            }}
          >
            <b>inclusive of all taxes</b>
          </div>
        </div>
        
      
 
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            gap: "20px",
          }}
        >
          <div className={singlePage.addTobag_div}
          onClick={()=>addToBag()}
          >
            <ShoppingBagIcon />
            <p>
              <b>ADD TO BAG</b>
            </p>
          </div>
        
        </div>
        <div
          style={{
            display: "flex",
            width: "200px",
            marginTop: "15px",
            gap: "14px",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "15px", fontWeight: "500" }}>
            DELIVERY OPTIONS
          </p>
          <div style={{ color: "gray" }}>
            <LocalShippingOutlinedIcon />
          </div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              height: "35px",
              alignItems: "center",
              textAlign: "left",
              border: "0.2px solid lightgray",
              display: "flex",
              gap: "15px",
              borderRadius: "4px",
              fontSize: "15px",
              justifyContent: "space-between",
              width: "240px",
              padding: "5px",
            }}
          >
            <input
              placeholder="Enter pincode"
              style={{
                height: "100%",
                border: "none",
                width: "120px",
                fontWeight: "200",
                fontSize: "18px",
              }}
            ></input>
            <p style={{ color: "#e7396a", fontWeight: "600" }}>
              CHECK
            </p>
          </div>
          <p style={{ marginTop: "2px", color: "#696969" }}>
            Please enter PIN code to check delivery time & Pay on
            Delivery Availability
          </p>
        </div>
        <div
          style={{
            textAlign: "left",
            marginTop: "30px",
            fontSize: "18px",
            fontWeight: "460",
          }}
        >
          <p>100% Original Products</p>
          <p>Pay on delivery might be available</p>
          <p>Easy 30 days returns and exchanges</p>
          <p>Try & Buy might be available</p>
        </div>
       <div>
       
        
    
       
        </div>
      </div>
    </div>
  </div>
 
  </>
  )

}

export default SinglePage

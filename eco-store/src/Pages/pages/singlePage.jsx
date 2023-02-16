import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { StarIcon } from "@chakra-ui/icons";
import singlePage from "./singlepage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Products/action";
import {useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SinglePage = () => {
  const dispatch = useDispatch();
  
const navigate=useNavigate()
const toaster = useToast()
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [count,setCount]=useState(1)
  console.log(id);
  const [userToken,setUserToken]=useState(localStorage.getItem("email"))
  let [product, setProduct] = useState([]);
  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/customerproducts/${id}`)
      .then((r) => {
        setProduct(r.data);
      }).catch((e) => {
        console.log("error product");
      });
  };


  console.log(product);
  useEffect(() => {
    getData();
    setUserToken(localStorage.getItem("email"))
  }, []);


  const productAdded=()=>{

    toaster({
        title: `Product is added `,
        duration: 2000,
        position: "top",
        status: "success",
        isClosable: true,
        bg:"#9039e7",
        variant:"top-accent",
       
      })
      setTimeout(() => {
        navigate("/bag");
      }, 2000);
}
 const productAddedError=()=>{
    toaster({
        title: `Please  Login to add products `,
        duration: 2000,
        position: "top",
        status: "success",
        isClosable: true,
      })
      setTimeout(() => {
        navigate("/login");
      }, 2000);
}
const productAlreadyAdded=()=>{
  toaster({
      title: `This product is already added`,
      duration: 2000,
      position: "top",
      status: "success",
      isClosable: true,
    })
    setTimeout(() => {
      navigate("/bag");
    }, 2000);
}
const addTocart=()=>{
  if(userToken){
  console.log(userToken)
const payload={
  _id:product._id,
  title:product.title,
  image:product.image,
  brand:product.brand,
  category:product.category,
  RatingCount:product.RatingCount,
  Rating:product.Rating,
  price:product.price*count,
  off:product.off,
  madein:product.madein,
 email:userToken,
 count:count

}



axios
.post(`${process.env.REACT_APP_API}/cart/create`,payload)
.then((r) => {
  if(r.data.msg==="invalid"){
    productAlreadyAdded()
  }else{
  console.log(r.data)
productAdded()
  }
}).catch((e) => {
 
  console.log("error product");
});
  }
  else{
 productAddedError()
  }
}



  let prevousPrice = Math.floor(
    (product.price / 100) * product.off + product.price
  );
  return (
    <>
      <div key={1} className={singlePage.main_div}>
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
                <p
                  style={{
                    fontSize: "20px",
                    color: "#8b8d97",
                    marginTop: "10px",
                  }}
                >
                  {}
                  {product.brand}
                </p>
              </div>
              <div
                className={singlePage.ratingDiv}
                style={{ marginTop: "15px", padding: "5px" }}
              >
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
                    <StarIcon
                      color="green.300"
                      style={{ marginTop: "0px" }}
                      fontSize="small"
                    />
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
                  <p> | {product.RatingCount} Ratings </p>
                </div>
              </div>
            </div>
            <hr style={{ marginTop: "15px", marginBottom: "15px" }}></hr>
            <div
              style={{
                textAlign: "left",
                marginTop: "-5px",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "80%",
                  marginBottom: "17px",
                }}
              >
                <p>
                  Rs.{" "}
                  <b style={{ color: "darkslategray", fontSize: "22px" }}>
                    {product.price}{" "}
                  </b>
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
                    {prevousPrice}
                  </span>
                </p>
                <p style={{ color: "#9039e7" }}>
                  <b style={{ fontSize: "22px" }}> {product.off}% OFF</b>
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
              <div
                className={singlePage.addTobag_div}
                onClick={() =>  addTocart()}
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
                <p style={{ color: "#e7396a", fontWeight: "600" }}>CHECK</p>
              </div>
              <p style={{ marginTop: "2px", color: "#696969" }}>
                Please enter PIN code to check delivery time & Pay on Delivery
                Availability
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
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;

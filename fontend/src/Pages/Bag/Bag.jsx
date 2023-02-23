import {
  Button,
  CardHeader,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  others,
  useDisclosure,
  useToast,
 
} from "@chakra-ui/react";
import axios from "axios";
import validator from 'validator' 
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getUserBagProduct } from "../../Redux/Products/action";
import bag from "./bag.module.css";

const Bag = () => {
  const location = useLocation();
  const [userToken, setUserToken] = useState(localStorage.getItem("email"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [placedOrder, setPlacedOrder] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast=useToast()
  const btnRef = useRef();
  const [openModal,setOpenModal] = useState();
  ////Address state///
const [locality,setLocality]=useState("")

const [district,setDistrict]=useState("")

const [state,setState]=useState("")

const [landmark,setLandmark]=useState("")

const [pincode,setPincode]=useState("")

const [mobile,setMobile]=useState("")
//---------//

 

const Addres=`Locality `

  
  const { isLoading, product } = useSelector((state) => {
    return {
      isLoading: state.Allproducts.isLoading,
      product: state.Allproducts.products,
    };
  });
  const { isAuth, isError } = useSelector((state) => {
    return {
      isAuth: state.signUpReducer.isAuth,
      isError: state.signUpReducer.isError,
      isLoading: state.signUpReducer.isLoading,
    };
  });
//get specific user cart products//
  useEffect(() => {
    setUserToken(localStorage.getItem("email"));
    dispatch(getUserBagProduct(userToken));
  }, [isAuth]);

////total product calculation//
  let total_temp = 0;
  if (product.length > 0) {
    total_temp = product.reduce((total, item) => total + item.price, 0);

    if (total_temp < 400) {
      setDeliveryPrice(40);
      total_temp += 40;
    }
  }




 //order post to database(API)

const handleProced=()=>{


  if(locality==="" || district=="" || state==="" || landmark==="" || pincode=="" || mobile==""){

    toast({
      title: `Please Enter all the feilds!`,
      status: "error",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
  
  }else if(pincode<100000 || pincode>999999){
    toast({
      title: `Please Enter a valid pincode(india) !`,
      status: "error",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
  
  }else if(mobile<1000000000 || mobile>9999999999){
    toast({
      title: `Please Enter a valid Mobile number !`,
      status: "error",
      duration: 2000,
      position: "top",
      isClosable: true,
    });
  }
  else{
   
    setOpenModal(true)


  }
  
  console.log(locality,district,state,landmark,pincode,mobile)

}

  const procedPayment = () => {
    axios.post(`${process.env.REACT_APP_API}/orders/create`);
  };
 
  return (
    <>
    <div className={bag.main_div}>
      <div className={bag.left_product_list}>
        {product.length > 0 ? (
          product.map((ele) => {
            return <ProductCard ele={ele} key={ele._id} />;
          })
        ) : (
          <h1>You have not added any product !</h1>
        )}
      </div>
      <div className={bag.right_total_product}>
        <div className={bag.first_div}>
          <ul>
            {product.length > 0 &&
              product.map((ele) => {
                return (
                  <li>
                    <h3>{ele.brand}....</h3> <h2>Rs.{ele.price}</h2>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={bag.sec_div}>
          <ul>
            <li>
              <h3>GST % </h3> <h2 className={bag.gst_price}>RS.0</h2>{" "}
            </li>
            <li>
              <h3 className={bag.delivery_price}>Delivery fee &nbsp; &nbsp;</h3>{" "}
              <h3>Rs.{deliveryPrice}</h3>
            </li>
          </ul>
        </div>
        <div className={bag.third_div}>
          <ul>
            <li>
              <h3>Total &nbsp;</h3> <h2>RS.{total_temp}</h2>
            </li>
            <br />
          </ul>
        </div>

        <div className={bag.last_div}>
          <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            Place order
          </Button>

          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Enter Your address</DrawerHeader>

              <DrawerBody>
                <Input placeholder="locality/Block" value={locality} onChange={(e)=>setLocality(e.target.value)}marginBottom="1.2rem" />

                <Input placeholder="District/city" value={district} onChange={(e)=>setDistrict(e.target.value)} marginBottom="1.2rem" />
                <Input placeholder="State" value={state} onChange={(e)=>setState(e.target.value)} marginBottom="1.2rem" />
                <Input placeholder="Land Mark" value={landmark} onChange={(e)=>setLandmark(e.target.value)} marginBottom="1.2rem" />
                <Input placeholder="Pincode" marginBottom="1.2rem" onChange={(e)=>setPincode(e.target.value)} value={pincode} />
                  
                  <Input placeholder="Mobile number" value={mobile} onChange={(e)=>setMobile(e.target.value)} />
               
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={handleProced}>Procced</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <h3> @ free Delivery on order over 400</h3>
      </div>
    </div>
    <Modal isOpen={openModal} onClose={()=>setOpenModal(!openModal)}>
  <ModalOverlay/>
  <ModalContent>
  <h1 className={bag.modalheader}>Choose Payment</h1>
    <ModalCloseButton />
    <ModalBody>
 
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='red' mr={3} onClick={()=>setOpenModal(!openModal)}>
        Cancel
      </Button>
      <Button colorScheme="blue">Procced Next</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  );
};

export default Bag;

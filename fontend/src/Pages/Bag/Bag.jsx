import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  CardHeader,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  others,
  PinInput,
  PinInputField,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import validator from "validator";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getUserBagProduct } from "../../Redux/Products/action";
import bag from "./bag.module.css";
function generateOTP() {
  let min = 1000;
  let max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const Bag = () => {
  const location = useLocation();
  const [userToken, setUserToken] = useState(localStorage.getItem("email"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const btnRef = useRef();
const [UPI,setUPI]=useState("")
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [payment, setPayment] = useState(false);
  const [openModal, setOpenModal] = useState();
  const [loader, setLoader] = useState(false);
  const [otpBox, setOtpBox] = useState(false);
  const cancelRef = useRef();
  const [orderPlaced,setOrderPlaced]=useState(false)
  ////Address state///
  const [locality, setLocality] = useState("");

  const [district, setDistrict] = useState("");

  const [state, setState] = useState("");

  const [landmark, setLandmark] = useState("");

  const [pincode, setPincode] = useState("");

  const [mobile, setMobile] = useState("");
  //---------//

  const Addres = `Locality `;

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


    let total_temp = 0;


    if (product.length > 0) {
      total_temp = product.reduce((total, item) => total + item.price, 0);
  
      if (total_temp < 400) {
        setDeliveryPrice(40);
        total_temp += 40;
      }
    }

    setTotalPrice(total_temp)
  }, [isAuth]);

  


const handleOrderPlace=()=>{

  setOrderPlaced(true)
}
  



  //order post to database(API)

  const handleProced = () => {
    if (
      locality === "" ||
      district == "" ||
      state === "" ||
      landmark === "" ||
      pincode == "" ||
      mobile == ""
    ) {
      toast({
        title: `Please Enter all the feilds!`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else if (pincode < 100000 || pincode > 999999) {
      toast({
        title: `Please Enter a valid pincode(india) !`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else if (mobile < 1000000000 || mobile > 9999999999) {
      toast({
        title: `Please Enter a valid Mobile number !`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else {
      setOpenModal(true);
    }

    console.log(locality, district, state, landmark, pincode, mobile);
  };
  ///OTP genration--//
  const handleGenerateOTP = () => {
   if(UPI.length>6){
    setOpenModal(!openModal);
    setOtpBox(true);


    setOtp(generateOTP());
   }
else{
  toast({
    title: `please enter a valid UPi`,
    // description: "",
    position: "top",
    status: "success",
    duration: 2000,
    isClosable: true,
  });
}
      
      
  };

  useEffect(()=>{
    if(otp>0){
    toast({
      title: `Your OTP is ${otp}`,
      // description: "",
      position: "top",
      status: "success",
      duration: 10000,
      isClosable: true,
    });
  }

  },[otp])
  // console.log("user -OTp", userOtp);

  const cancelPayment = () => {
    setOtpBox(false);

    setOtp("");

    setUserOtp("");
  };


  const procedAndOrder = () => {
    setLoader(true);
if(+userOtp>0){
    if (otp == +userOtp) {
      setPayment(true);

      toast({
        title: `Payment SuccessFull `,
        // description: "",
        position: "top",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
     
    }else{
      toast({
        title: `OTP is inccorect `,
        // description: "",
        position: "top",
        status: "failure",
        duration: 1000,
        isClosable: true,
      });
setLoader(false)
      return
    }
    console.log(otp,+userOtp,payment)
  }
 
    const email = JSON.parse(localStorage.getItem("email"));
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const userID = userDetails._id;
    const addres = `Locality:${locality},District:${district},
State:${state},Landmark:${landmark},
Pincode:${pincode},Mobile:${mobile}`;
  
    product.map((ele) => {
      const order = {
        ProductId: ele._id,
        title: ele.title,
        image: ele.image,
        brand: ele.brand,
        category: ele.category,
        Rating: ele.Rating,
        payment: payment,
        price: ele.price,
        email: email,
        OrderedBy: userID,
        Mobile: mobile,
        count: ele.count,
        address: addres,
        deliverStatus: false,
      };

      console.log(order);

      axios.post(`${process.env.REACT_APP_API}/orders/create`,order)
        .then((r)=>{
      handleOrderPlace()
      console.log(r)
         }).catch((e)=>{
          toast({
            title: `Failed to order `,
           // description: "",
          position:'top',
            status: 'success',
             duration: 1000,
             isClosable: true,

           })
          
        })
    });
// console.log(count)

console.log(orderPlaced)
    if(orderPlaced){
//for deleting cart product of user //
     product.map((product)=>{

axios.delete(`${process.env.REACT_APP_API}/cart/delete/${product._id}`)
.then((r)=>{
  console.log(r)
})
.catch((e)=>{
  console.log(e)
})
     })

      toast({
        title: `Order placed succesfull `,
        // description: "",
        position:'top',
        status: 'success',
        duration: 4000,
        isClosable: true,

      })

      navigate("/")


  }
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
          <div className={bag.noProduct}>

            <Heading margin="auto">You have not added any product !</Heading>
            </div>
          )}
        </div>
      {product.length>0 && 
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
                <h3 className={bag.delivery_price}>
                  Delivery fee &nbsp; &nbsp;
                </h3>{" "}
                <h3>Rs.{deliveryPrice}</h3>
              </li>
            </ul>
          </div>
          <div className={bag.third_div}>
            <ul>
              <li>
                <h3>Total &nbsp;</h3> <h2>RS.{totalPrice}</h2>
              </li>
              <br />
              <li>
                <h3>Deliery Expected :- 7-10 Days</h3>
              </li>
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
                  <Input
                    placeholder="locality/Block"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    marginBottom="1.2rem"
                  />

                  <Input
                    placeholder="District/city"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    marginBottom="1.2rem"
                  />
                  <Input
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    marginBottom="1.2rem"
                  />
                  <Input
                    placeholder="Land Mark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    marginBottom="1.2rem"
                  />
                  <Input
                    placeholder="Pincode"
                    marginBottom="1.2rem"
                    onChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                  />

                  <Input
                    placeholder="Mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue" onClick={handleProced}>
                    Procced
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          <h3> @ free Delivery on order over 400</h3>
        </div> }

      </div>  
      

      <Modal isOpen={openModal} onClose={() => setOpenModal(!openModal)}>
        <ModalOverlay />
        <ModalContent>
          <h1 className={bag.modalheader}>Choose Payment</h1>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Toal;- INR. {totalPrice}</FormLabel>
            <Box>
              <FormLabel>Pay Via UPI</FormLabel>
              <InputGroup size="md">
                <Input pr="4.5rem" placeholder="Eg;- 8945553710@upi" value={UPI} onChange={(e)=>setUPI(e.target.value)} />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleGenerateOTP}>
                    Verify
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Checkbox colorScheme="green" marginTop="1.5rem">
                Cash on Delivery
              </Checkbox>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => setOpenModal(!openModal)}
            >
              Cancel
            </Button>
            <Button colorScheme="blue">Procced Next</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={otpBox}
        leastDestructiveRef={cancelRef}
        onClose={() => setOtpBox(!otpBox)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Enter OTP
            </AlertDialogHeader>

            <AlertDialogBody marginBottom="1.5rem">
              You are 100% Secure with us
            </AlertDialogBody>
            <HStack marginLeft="27%">
              <PinInput
                otp
                mask
                size="lg"
                value={userOtp}
                onChange={(value) => setUserOtp(value)}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={cancelPayment}>
                Cancel
              </Button>
              <Button colorScheme="red" ml={3} onClick={procedAndOrder}>
                complete Payment
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
              
            
  
              
  );
              
};

export default Bag;

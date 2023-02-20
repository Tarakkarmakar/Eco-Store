import css from "./Navbar.module.css";
import { Input, InputGroup, InputRightElement, Button, Stack, Avatar, AvatarBadge } from "@chakra-ui/react";
import logo from "../../images/logo.png";
import bag from "../../images/bag.png";
import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import account from "../../images/account.jpg";
import { json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AutoSignIn } from "../../Redux/SignUpReducer/action";
import { SIGNIN_FAILURE } from "../../Redux/SignUpReducer/actionTypes";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [aboutUser,setAboutUser]=useState(false)

  const goSignup = () => {
    navigate("/login");
  };
  
  const gotoHome=()=>{

    navigate("/")
  }
  const gotoBag=()=>{

    navigate("/bag")
  }
  const gotoPartner=()=>{

    navigate("/partner")
  }
let [user,setUser]=useState(JSON.parse(localStorage.getItem("email")) || "")

const { isAuth, isError, isLoading } = useSelector((state) => {
  return {
    isAuth: state.signUpReducer.isAuth,
    isError: state.signUpReducer.isError,
    isLoading: state.signUpReducer.isLoading,
  };
});

useEffect(()=>{

  setUser(JSON.parse(localStorage.getItem("email")))
if(user!==""){
  dispatch(AutoSignIn(user))
}

},[])
const openDiv=()=>{
setAboutUser(!aboutUser)

}

const logout=()=>{
  localStorage.setItem("email","")
  dispatch(SIGNIN_FAILURE)
}


console.log(isAuth)
  return (
    <>
    <div className={css.main_nav}>
      <div className={css.nav_left_section} onClick={gotoHome}>
        <img className={css.nav_logo} src={logo} alt="" />
      </div>
      <div>
        <h3 className={css.nav_company_name}>Eco Store</h3>
      </div>

      <div className={css.nav_serach_section}>
        <InputGroup size="md">
          <Input pr="4.5rem" focusBorderColor="lime" background="white" />
          <InputRightElement width="2.5rem">
            <Button h="1.75rem" size="sm">
              <Search2Icon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>

      <div className={css.nav_right_section}>
        <ul className={css.nav_right_list}>
{isAuth? 
<li onClick={openDiv}>
  <Avatar>
    <AvatarBadge boxSize='1.25em' bg='blue.500' />
  </Avatar>
  </li>
  :  <li onClick={goSignup}>
            {" "}
            <img className={css.nav_account} src={account} />{" "}
            <p> SignUp/Login</p>
          </li> }
      
        

          <li onClick={gotoPartner}>Become a Partner</li>
          <li onClick={gotoBag}>
            <img className={css.nav_bag} src={bag} alt="" />
            <p>Bag</p>
          </li>
        </ul>
      </div>

      <div className={css.nav_hamberger}>
        <HamburgerIcon h="2.3rem" w="2.2rem" />
      </div>
    </div>
  {aboutUser ? <div className={css.opendiv}>
   <h2>{user}</h2>

   <button onClick={logout}>log out</button>

  </div> :""}
    </>
  );
};

export default Navbar;

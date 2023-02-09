import css from "./Navbar.module.css";
import { Input, InputGroup, InputRightElement, Button, Stack, Avatar, AvatarBadge } from "@chakra-ui/react";
import logo from "../../images/logo.png";
import bag from "../../images/bag.png";
import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import account from "../../images/account.jpg";
import { json, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate();

  const goSignup = () => {
    navigate("/login");
  };
let user=JSON.parse(localStorage.getItem("email"))



  return (
    <div className={css.main_nav}>
      <div className={css.nav_left_section}>
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
{user!="" ? 
<li>
  <Avatar>
    <AvatarBadge boxSize='1.25em' bg='blue.500' />
  </Avatar>
  </li>
  :  <li onClick={goSignup}>
            {" "}
            <img className={css.nav_account} src={account} />{" "}
            <p> SignUp/Login</p>
          </li> }
      
        

          <li>Become a Partner</li>
          <li>
            <img className={css.nav_bag} src={bag} alt="" />
            <p>Bag</p>
          </li>
        </ul>
      </div>

      <div className={css.nav_hamberger}>
        <HamburgerIcon h="2.3rem" w="2.2rem" />
      </div>
    </div>
  );
};

export default Navbar;

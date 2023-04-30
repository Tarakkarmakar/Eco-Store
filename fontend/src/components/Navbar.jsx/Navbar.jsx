import css from "./Navbar.module.css";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  Avatar,
  AvatarBadge,
  useToast,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from "@chakra-ui/react";
import logo from "../../images/logo.png";
import bag from "../../images/bag.png";

import debounce from "lodash/debounce";
import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import account from "../../images/account.jpg";
import { json, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AutoSignIn } from "../../Redux/SignUpReducer/action";
import { SIGNIN_FAILURE } from "../../Redux/SignUpReducer/actionTypes";
import axios from "axios";
const Navbar = () => {
  const dispatch = useDispatch();
  const [intialSuggestion, setInitialSuggestion] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [aboutUser, setAboutUser] = useState(false);
  const [menuState, setMenuState] = useState(false);

  const toast = useToast();
  let [user, setUser] = useState(
    JSON.parse(localStorage.getItem("email")) || ""
  );
  const [logedUser, setloggedUser] = useState(true);
  const gotoHome = () => {
    navigate("/");
  };
  const goSignup = () => {
    navigate("/login");
  };
  const gotoBag = () => {
    navigate("/bag");
  };
  const gotoPartner = () => {
    navigate("/partner");
  };

  const { isAuth, isError, isLoading } = useSelector((state) => {
    return {
      isAuth: state.signUpReducer.isAuth,
      isError: state.signUpReducer.isError,
      isLoading: state.signUpReducer.isLoading,
    };
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("email")));
    if (user != "" || user !== null && isAuth) {
      dispatch(AutoSignIn(user));
    }
  }, []);

  const openDiv = () => {
    setUser(JSON.parse(localStorage.getItem("email")));
    setAboutUser(!aboutUser);
  };

  const logOut = () => {
    localStorage.setItem("email", null);
    setUser(JSON.parse(localStorage.getItem("email")));
    localStorage.setItem("userDetails", null);
    setAboutUser(!aboutUser);

    dispatch(AutoSignIn("empty"));

    setloggedUser(false);
    toast({
      title: `Your are Logged out !!`,
      status: "success",
      duration: 1500,
      position: "top",
      isClosable: true,
    });

    window.location.reload();
  };

  const fetchProducts = debounce(async (search) => {
    try {
      axios
        .get(`${process.env.REACT_APP_API}/customerproducts?search=${search}`)
        .then((r) => {
          setSuggestions(r.data);
        });
    } catch {
      alert("Unable to search at this time");
    }
  }, 500);

  useEffect(() => {
    if (search) {
      fetchProducts(search);
    }
  }, [search]);

  console.log(search)

  useEffect(() => {
    if (search == "") {
      setSuggestions([]);
      fetchProducts("$");
    }
  }, [search]);

  const handleSerach = (e) => {
    setSearch(e.target.value);
  };

  const handleClickSuggestion = (search) => {
    navigate(`/serach/${search}`);
  };
  // console.log(search);
  // console.log(suggestions);
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
            <Input
              pr="4.5rem"
              focusBorderColor="lime"
              background="white"
              value={search}
              onChange={handleSerach}
            />
            <InputRightElement width="2.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => handleClickSuggestion(search)}
              >
                <Search2Icon />
              </Button>
            </InputRightElement>
          </InputGroup>

          {suggestions.length > 0 && suggestions.length < 9 && (
            <div className={css.suggestionBox}>
              <ul>
                {suggestions.map((ele, index) => {
                  if (index < 6) {
                    const maxWords = 4;
                    const words = ele.title.split(" ").slice(0, maxWords);
                    const trimmedTitle = words.join(" ");
                    return (
                      <li
                        key={ele._id}
                        onClick={() => handleClickSuggestion(ele.title)}
                      >
                        {trimmedTitle}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}
        </div>

        <div className={css.nav_right_section}>
          <ul className={css.nav_right_list}>
            {isAuth ? (



<li className="dropdown">

<li  className=" btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Avatar>
                  <AvatarBadge boxSize="1.25em" bg="blue.500" />
                </Avatar>
              </li>
<ul className="dropdown-menu">
<li><a className="dropdown-item" >{user}</a></li>
<li><a className="dropdown-item" >My orders</a></li>
<li><a className="dropdown-item" > <button onClick={logOut}>log out</button></a></li>
</ul>
       
 
</li>
            
            ) : (
              <li onClick={goSignup}>
                {" "}
                <img className={css.nav_account} src={account} />{" "}
                <p> SignUp/Login</p>
              </li>
            )}

            <li onClick={gotoPartner}>Become a Partner</li>
            <li onClick={gotoBag}>
              <img className={css.nav_bag} src={bag} alt="" />
              <p>Bag</p>
            </li>
          </ul>
        </div>

        <div className={css.nav_hamberger}>
          <Menu>
            <MenuButton>
              <HamburgerIcon
                h="2.3rem"
                w="2.2rem"
                onClick={() => setMenuState(!menuState)}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                {isAuth ? (

<h2>Hi</h2>
                  
                ) : (
                  <h3 onClick={goSignup}>Login/SignUp</h3>
                )}
              </MenuItem>
              <MenuItem onClick={gotoBag}>Bag</MenuItem>
              <MenuItem>My orders</MenuItem>
              <MenuItem onClick={gotoPartner}>Become a Partner</MenuItem>
              <MenuItem>Help</MenuItem>

              {isAuth?    <MenuItem onClick={logOut}>Log out</MenuItem>
              : <MenuItem onClick={goSignup}>Login/Sign Up</MenuItem>}
           
            </MenuList>
          </Menu>
        </div>
      </div>
    
    </>
  );
};

export default Navbar;

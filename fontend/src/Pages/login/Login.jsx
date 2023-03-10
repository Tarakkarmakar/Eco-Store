import React, { useState, useEffect } from "react";
import { AiFillApple } from "react-icons/ai"; // FcGoogle
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../../images/logo.png";

import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Image,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Input,
  Spinner,
  Text,
  useMediaQuery,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { Loginfunction } from "../../Redux/SignUpReducer/action";
import Navbar from "../../components/Navbar.jsx/Navbar";

export default function Login() {
  const [userObj, setUserObj] = useState([]);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const toast = useToast();

  const GotoHome = () => {
    navigate("/");
  };
  const { isAuth, isError, isLoading } = useSelector((state) => {
    return {
      isAuth: state.signUpReducer.isAuth,
      isError: state.signUpReducer.isError,
      isLoading: state.signUpReducer.isLoading,
    };
  });
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const uppercaseReg = (password) => /(?=.*?[A-Z])/i.test(password);
  const lowercaseReg = (password) => /(?=.*?[a-z])/i.test(password);
  const digitsReg = (password) => /(?=.*?[0-9])/i.test(password);
  const specialCharReg = (password) => /(?=.*?[#?!@$%^&*-])/i.test(password);
  const minLengthReg = (password) => /.{8,}/i.test(password);
  const [loginRequest, setLoginRequest] = useState(false);
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 500);
  // }, []);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  useEffect(() => {
    if (email !== "" && password !== "") {
      if (isAuth) {
        toast({
          title: `LogIn Successfull`,
          status: "success",
          duration: 500,
          position: "top",
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
        setEmail("");
        setPassword("");
      } else {
        if (isError) {
          toast({
            title: `Invalid User Details!!!`,
            status: "error",
            duration: 2000,
            position: "top",
            isClosable: true,
          });
        }
        setEmail("");
        setPassword("");
        console.log(isError);
      }
    }
  }, [isAuth, isError, isLoading]);
  console.log(isError, isAuth);
  const SendSignInRequest = (e) => {
    e.preventDefault();
    if (email === "" && password === "") {
      toast({
        title: `Please Fill all the feilds !!!`,
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    } else if (email === "") {
      toast({
        title: `Please give your email !!!`,
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    } else if (password === "") {
      toast({
        title: `Please give your password !!!`,
        status: "error",
        duration: 1500,
        position: "top",
        isClosable: true,
      });
    } else if (!isEmail(email)) {
      toast({
        title: `Please Enter a valid email !`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else if (
      !uppercaseReg(password) ||
      !lowercaseReg(password) ||
      !digitsReg(password) ||
      !specialCharReg(password) ||
      !minLengthReg(password)
    ) {
      toast({
        title: `Password length should greater than 8 and contains
         one uppercase letter and one speacial charcter ,lowercase letter,number!`,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } else {
      dispatch(
        Loginfunction({
          email: email,
          password: password,
        })
      );
      setLoginRequest(!loginRequest);
    }
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  });
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Flex color="black" alignItems="center">
        <ArrowBackIcon color="blue" boxSize={8} onClick={GotoHome} />
      </Flex>

      {isLoading ? (
        <Flex justify="center" h="30vh" mt={"5"}>
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#3182ce"
            size="lg"
          />
        </Flex>
      ) : (
        <Flex
          background="white"
          justify="center"
          align="center"
          direction="column"
          textAlign="left"
        >
          <Heading mt="10" as="h2" size="lg">
            Log In
            <br />
          </Heading>

          <FormControl
            w={isLargerThan992 ? "24%" : "70%"}
            borderRadius="lg"
            p={"3"}
            cursor="pointer"
            mt={5}
            isRequired
          >
            {/* email */}
            <FormLabel htmlFor="email">Enter Email</FormLabel>

            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email address"
              w={"100%"}
              h={"40px"}
              value={email}
              border={`2px solid`}
              type={"email"}
              id="email"
              required
            />

            <FormHelperText mb={"8px"}>
              We'll never share your email.
            </FormHelperText>

            {/* password */}
            <FormLabel htmlFor="password">Enter Password</FormLabel>
            <InputGroup>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                w={"100%"}
                h={"40px"}
                value={password}
                type={show ? "text" : "password"}
                border={`2px solid`}
                mb={"8px"}
                id="password"
                required
              />

              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Checkbox size={"lg"} defaultChecked>
              Keep me signed in
            </Checkbox>
            <br />

            <Button
              onClick={SendSignInRequest}
              w={"100%"}
              h={"40px"}
              mt={4}
              colorScheme="blue"
              type="submit"
              disabled={email === "" || password === ""}
            >
              Sign In
            </Button>

            <Text mt={"15px"} display="flex" justifyContent={"center"}>
              <Link to={""} style={{ color: "blue" }}>
                Forgot password?
              </Link>
            </Text>

            <Text mt={"15px"} display="flex" justifyContent={"center"}>
              Don't have an account?{" "}
              <Link to={"/signup"} style={{ color: "blue" }}>
                Create Here...
              </Link>
            </Text>

            <Text mt={"25px"} display="flex" justifyContent={"center"}>
              or continue with
            </Text>
            <Box mt={"10px"} display="flex" justifyContent={"center"}>
              <AiFillApple
                size={"25px"}
                style={{ marginRight: "10px", cursor: "pointer" }}
              />
              <FcGoogle
                size={"25px"}
                style={{ marginRight: "10px", cursor: "pointer" }}
              />
              <AiFillFacebook
                size={"25px"}
                style={{ marginRight: "10px", cursor: "pointer" }}
                color={"blue"}
              />
            </Box>
          </FormControl>
        </Flex>
      )}
    </>
  );
}

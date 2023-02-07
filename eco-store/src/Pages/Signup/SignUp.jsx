import React, { useState, useEffect } from "react";
import { AiFillApple } from "react-icons/ai"; // FcGoogle
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SignUpFunction } from "../../Redux/SignUpReducer/action";
import { ArrowBackIcon, ArrowDownIcon } from '@chakra-ui/icons'
import logo from "../../images/logo.png"
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
  Select,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
const [name,setName]=useState("")
  const GotoHome=()=>{
    navigate("/")
  }
  const { userData, successfullyCreated, createAccountError } = useSelector(
    (state) => {
      return {
        userData: state.signUpReducer.userData,
        successfullyCreated: state.signUpReducer.successfullyCreated,
        createAccountError: state.signUpReducer.createAccountError,
      };
    },
    shallowEqual
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toaster = useToast();
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");
  useEffect(() => {
    if (successfullyCreated) {
      toaster({
        title: `Your Account Has Created `,
        duration: 2000,
        position: "top",
        status: "success",
       isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [successfullyCreated]);
  useEffect(() => {

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  useEffect(() => {
    if (createAccountError) {
      toaster({
        title: `Something Error Occourd !`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  }, [createAccountError]);

  function SendSignInRequest() {
    dispatch(
      SignUpFunction({

        name: name,
        email: email,
      gender:gender,
        password: password,
       
      })
    );
    setEmail("");
    setPassword("");
    setName("");
    setGender("");
  }
  return (
    <>
      {isLoading ? (
        <Flex justify="center" mt={"5"}>
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue"
            size="lg"
          />
        </Flex>
      ) : (  <>
          <Flex marginTop="1rem" color="black" alignItems="center">
            <ArrowBackIcon color="blue" boxSize={9} onClick={GotoHome} />
       
          </Flex>

          <Flex
            justify="center"
            align="center"
            direction="column"
            textAlign="left"
          >
            <Heading mt="10" as="h2" size="lg">
              Create an account
            </Heading>

            <FormControl
              w={isLargerThan992 ? "24%" : "60%"}
              borderRadius="lg"
              p={"3"}
              cursor="pointer"
              mt={5}
              isRequired
            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" Email address"
                w={"100%"}
                h={"40px"}
                value={email}
                border={`2px solid`}
                type={"email"}
                id="email"
              />
              <br />
              <br />
            
            
              {/* Name */}

              <Input
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                value={name}
                w={"100%"}
                h={"40px"}
                border={`2px solid`}
                type={"text"}
                mb={"8px"}
                id="userName"
              />
            
              <br />
              <Select
                onChange={(e) => setGender(e.target.value)}
                placeholder="Gender"
               
                w={"100%"}
                h={"40px"}
                border={`2px solid`}
                type={"text"}
                mb={"8px"}
                id="userName"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Other</option>
                </Select>
              <br />

           
              {/* email */}

              {/* UserType */}

              {/* password */}
              {/* <FormLabel htmlFor="password">Enter Password</FormLabel> */}
              <Input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                w={"100%"}
                h={"40px"}
                value={password}
                border={`2px solid`}
                type={"password"}
                mb={"8px"}
                id="password"
              />
             

              <Button
                onClick={SendSignInRequest}
                w={"100%"}
                h={"40px"}
                mt={4}
                colorScheme="blue"
                type="submit"
                disabled={email == "" || password === "" || name === ""}
              >
                Create Account
              </Button>

              <Text mt={"15px"} display="flex" justifyContent={"center"}>
                <Link to={""} style={{ color: "blue" }}>
                  Forgot password?
                </Link>
              </Text>

              <Text mt={"15px"} display="flex" justifyContent={"center"}>
                Already have an account?
                <Link to={"/login"} style={{ color: "blue" }}>
                  Sign In
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

        </>
      )}
    </>
  );

}


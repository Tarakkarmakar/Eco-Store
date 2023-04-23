import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { FaLeaf, FaTshirt, FaUtensils, FaCompass } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const sidebarBg = useColorModeValue("green.200", "green.800");
  const sidebarHoverBg = useColorModeValue("gray.200", "gray.700");
  const sidebarActiveBg = useColorModeValue("blue.200", "blue.700");
  const navigate = useNavigate();
  const gotoKitchen = () => {
    navigate("/kitchen");
  };

  const gotoFashion = () => {
    navigate("/fashion");
  };
  const gotoPlants = () => {
    navigate("/plants");
  };
  const gotoExplore = () => {
    navigate("/explore");
  };

  const SidebarItem = ({ icon, children, active = false, ...rest }) => (

 
    <Box
      display="flex"
      alignItems="center"
      px={4}
      py={2}
      cursor="pointer"
      transition="all 0.3s"
      fontWeight={active ? "bold" : "normal"}
      bg={active ? sidebarActiveBg : "transparent"}
      _hover={{ bg: sidebarHoverBg }}
      {...rest}
      
    >
      <Icon as={icon} mr={3} colo />
      <Text>{children}</Text>
    </Box>
  );

  return (
    <Box
      as="nav"
      pos="fixed"
      bottom={{ base: 0, md: 'auto' }}
      top={{ base: 'auto', md: "17vh"}}
      left={0}
      w={{ base: '100%', md: '190px' }}
      h={{ base: 'auto', md: '300px' }}
    bg="white"
      borderRightWidth={{ base: "1px", md: "1px"}}
      borderRightColor={useColorModeValue("black.300", "black.700")}
      borderBottomWidth={{ base: "1px", md: "1px"}}
      overflowY="auto"
      zIndex={10}
    >
      <Flex direction={{ base: "row", md: "column" }} h="full" justify="space-between">
        <Box>
          <SidebarItem icon={FaLeaf} onClick={gotoPlants} >
            Plants
           
          </SidebarItem>
          <SidebarItem icon={FaTshirt} onClick={gotoFashion}>Fashion</SidebarItem>
          <SidebarItem icon={FaUtensils}  onClick={gotoKitchen}>Kitchen</SidebarItem>
        </Box>
        <Box>
          <SidebarItem icon={FaCompass}  onClick={gotoExplore}>Explore</SidebarItem>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;

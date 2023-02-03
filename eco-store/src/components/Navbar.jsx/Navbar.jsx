
import css from "./Navbar.module.css"
import { Input,InputGroup,InputRightElement,Button } from '@chakra-ui/react'
import logo from "../../images/logo.png"
import bag from "../../images/bag.png"
import { Search2Icon } from '@chakra-ui/icons'
import account  from "../../images/account.jpg"
const Navbar = () => {






  return (

    <div className={css.main_nav}>

<div className={css.nav_left_section}>
    <img className={css.nav_logo} src={logo} alt="" />
   
</div>
<div>
    <h3 className={css.nav_company_name}>Eco Store</h3>
</div>


<div className={css.nav_serach_section}>
<InputGroup size='md'>
      <Input
        pr='4.5rem'
        focusBorderColor='lime'
       background="white"
      />
      <InputRightElement width='2.5rem' >
        <Button h='1.75rem' size='sm' >
          <Search2Icon />
        </Button>
      </InputRightElement>
    </InputGroup>


</div>

<div className={css.nav_right_section}>

  <ul className={css.nav_right_list}>

    
    <li> <img className={css.nav_account} src={account}  /> <p> SignUp/login</p>
   </li>
   
    <li>Become a Partner</li>
    <li>
<img  className={css.nav_bag} src={bag} alt="" />
<p>Bag</p>
    </li>
  </ul>
</div>

      
    </div>
  )
}

export default Navbar

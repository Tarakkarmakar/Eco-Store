import style from "./Footer.module.css"
import logo from "../../images/logo.png"
const Footer = () => {
  return (
    <div style={{backgroundColor:"green",color:"white"}} className={style.footer_main_con}>
      <div>
        <ul>
          <li>About</li>
          <li>Home</li>
          <li>Products</li>
          <li>SignUp/Login</li>
        </ul>

      </div>
      <div>
        <h3 className={style.cities_headline}>Cities we Deliver</h3>
        <ul>
          <li>Mumbai</li>
          <li>Delhi</li>
          <li>Kolkata</li>
          <li>Bangalore</li>
          <li>Pune</li>
        </ul>
      </div>
      <div>
        <ul><li>Chennai</li>
        <li>Goa</li>
        <li>Surat</li>
        <li>Durgapur</li>
        <li>Jaipur</li>
        <li>Hydrabad</li></ul>
      </div>
      <div className={style.footer_logo_container}>
      <img className={style.footer_logo} src={logo} alt="" />

      </div>

    </div>
  )
}

export default Footer

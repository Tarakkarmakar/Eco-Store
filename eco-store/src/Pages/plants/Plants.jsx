
import Filter from "../../components/filter/Filter"

import plants from "./plants.module.css"
const Plants = () => {
  return (
    <div className={plants.main_box}>
      <div className={plants.left_filter_box}>
        <Filter />

      </div>
      <div className={plants.right_product_box}></div>

        
      
    </div>
  )
}

export default Plants

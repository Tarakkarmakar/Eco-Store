import filter from "./filter.module.css";
import { Checkbox, Stack, Radio, RadioGroup } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Filter = ({ one, two, three, four, five, six, seven }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialcategory = searchParams.get("category");
  const initialsort = searchParams.getAll("sort");
  const [category, setCategory] = useState(initialcategory || "");
  const [sort, setSort] = useState(initialsort[0] || "");
  const [discount, setDiscount] = useState(0);
  const order = searchParams.getAll("sort") || "";

  const handleDisount = (e) => {
    setDiscount(0)
    setDiscount(e.target.value);
    console.log(e.target.value)
  };
  const handleBrandFilter = (e) => {
    setCategory("");
    setCategory(e.target.value);
  };
  useEffect(() => {
    let params = {};
    if (category != "") {
      params.brand = category;
    }
    sort && (params.sort = "price");
    if (order != "") {
      order && (params.order = sort);
    }
    if (discount > 0) {
     params.discount = discount;
    }
    setSearchParams(params);
  }, [category, setSearchParams, sort,discount]);

  const Handlesort = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className={filter.filter_section}>
      <div className={filter.price_filter}>
        <span>Sort By Price</span>
        <RadioGroup>
          <Stack spacing={2} direction="column" onChange={Handlesort}>
            <Radio
              value="asc"
              defaultChecked={sort === "asc"}
              colorScheme="red"
              borderColor="green"
            > 
              Low to High{" "}
            </Radio>
            <Radio
              value="desc"
              defaultChecked={sort === "desc"}
              colorScheme="red"
              borderColor="grey"
            >
              {" "}
              High to Low
            </Radio>
          </Stack>
        </RadioGroup>
      </div>
      <div className={filter.brand_filter}>
        <span>BRAND</span>
        <RadioGroup>
          <Stack spacing={2} direction="column" onChange={handleBrandFilter}>
            <Radio
              value="All"
              defaultChecked={category === "All"}
              colorScheme="red"
              borderColor="green"
            >
              All
            </Radio>
            <Radio
              value={one}
              defaultChecked={category === one}
              colorScheme="red"
              borderColor="green"
            >
              {one}
            </Radio>
            <Radio
              value={two}
              defaultChecked={sort === two}
              colorScheme="red"
              borderColor="grey"
            >
              {two}
            </Radio>
            <Radio
              value={three}
              defaultChecked={sort === three}
              colorScheme="red"
              borderColor="grey"
            >
              {three}
            </Radio>
          </Stack>
        </RadioGroup>
      </div>

      <div className={filter.discount_filter}>
        <RadioGroup>
          <Stack spacing={2} direction="column" onChange={handleDisount}>
            <Radio colorScheme="red" defaultChecked={discount === 10} value="10" borderColor="grey">
              10% and above{" "}
            </Radio>
            <Radio colorScheme="red" value="20" borderColor="grey">
              {" "}
              20% and above
            </Radio>
            <Radio colorScheme="red" value="30" borderColor="grey">
              {" "}
              30% and above
            </Radio>
            <Radio colorScheme="red" value="40" borderColor="grey">
              {" "}
              40% and above
            </Radio>

            <Radio colorScheme="red" value="50" borderColor="grey">
              50% and above{" "}
            </Radio>
            <Radio colorScheme="red" value="60" borderColor="grey">
              {" "}
              60% and above
            </Radio>
          </Stack>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Filter;

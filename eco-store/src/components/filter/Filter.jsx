import filter from "./filter.module.css";
import { Checkbox, Stack, Radio, RadioGroup } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Filter = ({ one, two, three, four, five, six, seven }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialcategory = searchParams.getAll("category");
  const initialsort = searchParams.getAll("sort");
  const [category, setCategory] = useState(initialcategory || []);
  const [sort, setSort] = useState(initialsort[0] || "");

  const handleCheckBox = (e) => {
    const newCategory = [...category];

    if (newCategory.includes(e.target.value)) {
      newCategory.splice(newCategory.indexOf(e.target.value));
    } else {
      newCategory.push(e.target.value);
    }
    setCategory(newCategory);
  };
  useEffect(() => {
    let params = {};

    params.category = category;
    sort && (params.sort = sort);

    setSearchParams(params);
  }, [category, setSearchParams, sort]);

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
              borderColor="grey"
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
        <Checkbox
          value={one}
          checked={category.includes("beco")}
          onChange={handleCheckBox}
          colorScheme="red"
          borderColor="grey"
        >
          {one}
        </Checkbox>
        <Checkbox
          value={two}
          checked={category.includes("sanhya dale")}
          colorScheme="red"
          onChange={handleCheckBox}
          borderColor="grey"
        >
          {two}{" "}
        </Checkbox>
        <Checkbox
          value={three}
          checked={category.includes("HRX by Hrithik Roshan")}
          onChange={handleCheckBox}
          colorScheme="red"
          borderColor="grey"
        >
          {three}
        </Checkbox>
        <Checkbox
          value={four}
          colorScheme="red"
          checked={category.includes("")}
          onChange={handleCheckBox}
          borderColor="grey"
        >
          {" "}
          {four}
        </Checkbox>
        <Checkbox
          value={five}
          colorScheme="red"
          checked={category.includes("")}
          onChange={handleCheckBox}
          borderColor="grey"
        >
          {five}
        </Checkbox>
        <Checkbox
          value={six}
          colorScheme="red"
          checked={category.includes("")}
          onChange={handleCheckBox}
          borderColor="grey"
        >
          {" "}
          {six}
        </Checkbox>

        <Checkbox
          value={seven}
          colorScheme="red"
          checked={category.includes("")}
          onChange={handleCheckBox}
          borderColor="grey"
        >
          {" "}
          {seven}
        </Checkbox>
      </div>
      <div className={filter.filterprice_filter}>
        <span>PRICE</span>

        <Checkbox colorScheme="red" borderColor="grey">
          {" "}
          Rs. 149 to Rs. 399
        </Checkbox>
        <Checkbox colorScheme="red" borderColor="grey">
          Rs. 400 to Rs. 999
        </Checkbox>
        <Checkbox colorScheme="red" borderColor="grey">
          Rs. 1000 to Rs. 2000
        </Checkbox>
        <Checkbox colorScheme="red" borderColor="grey">
          {" "}
          Rs. 2001 to Rs. 3001
        </Checkbox>
      </div>
    

      <div className={filter.discount_filter}>
        <RadioGroup defaultValue="2">
          <Stack spacing={2} direction="column">
            <Radio colorScheme="red" value="10" borderColor="grey">
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
            <Radio colorScheme="red" value="70" borderColor="grey">
              70% and above{" "}
            </Radio>
          </Stack>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Filter;

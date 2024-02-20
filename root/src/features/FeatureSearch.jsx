import React, { useState, useEffect } from "react";
import SearchIcon from "../icons/SearchIcon";
import { useForm, Controller } from "react-hook-form";
import { debounce } from "../utils/helperFunctions";
import { DEBOUNCE_DELAY } from "../utils/constants";
import { CloseIcon } from "../icons/CloseIcon";
import useFetch from "../hooks/useFetch";
import useGeolocation from "../hooks/useGeolocation";
import { LeftVectorIcon } from "../icons/LeftVectorIcon";
import { Link } from "react-router-dom";
import FeatureRestaurantCards from "./FeatureRestaurantCards";

import { SearchItems } from "../components/SearchItems";

import { useQuery } from "../hooks/useQueryParams";
import FeatureRestaurantCards from "./FeatureRestaurantCards";
import useFetch from "../hooks/useFetch";

export function FeatureSearch() {
  const [searched, setSearched] = useState("");
  const { location } = useGeolocation();
  const query = useQuery();
  const selectedItem = query.get("query");

  const fetchedData = useFetch(
    `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${location.latitude}&lng=${location.longitude}&str=${searched}&trackingId=undefined`
  );

  const { handleSubmit, control, reset, setValue, getValues } = useForm({
    defaultValues: {
      searchInput: selectedItem,
    },
  });

  useEffect(() => {
    selectedItem && setValue("searchInput", selectedItem);
  }, [selectedItem]);

  const onSubmit = (data) => {
    setSearched(data.searchInput);
  };

  const debouncedSubmit = debounce(onSubmit, DEBOUNCE_DELAY);

  const handleInputChange = (event) => {
    event.stopPropagation();
    const newValue = event.target.value;
    setValue("searchInput", newValue);
    debouncedSubmit({ searchInput: newValue });
  };

  const handleReset = () => {
    if (!getValues("searchInput")) return;
    reset({ searchInput: "" });
    setSearched("");
  };
  return (
    <>
      <div className='search-container'>
        <div className='search-box'>
          <div className='search-icon'>
            {selectedItem && (
              <Link to='/search'>
                <LeftVectorIcon />
              </Link>
            )}
          </div>
          <div className='search-input'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Controller
                control={control}
                name='searchInput'
                render={({ field }) => (
                  <input
                    type='text'
                    name={field.name}
                    onChange={handleInputChange}
                    value={field.value}
                    className='input-search'
                    placeholder={"Search for restaurants and food"}
                    autoComplete='off'
                  />
                )}
              />
            </form>
          </div>
          <div className='search-close' onClick={handleReset}>
            {!!getValues("searchInput") ? <CloseIcon /> : <SearchIcon />}
          </div>
        </div>
        {!selectedItem ? (
          <SearchItems items={fetchedData?.data?.suggestions} />
        ) : (
          <FeatureRestaurantCards selectedItem={selectedItem} />
        )}
      </div>
    </>
  );
}

export default FeatureSearch;

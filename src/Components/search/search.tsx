import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "Styles/Components/search.scss";

import { IconButton } from "Components/buttons/buttons";
import { InputElement } from "Components/form-elements/form-elements";


import { storeSearchText } from "../../Redux/Slices/searchTextSlice";

interface SearchProps {
  data: (searchText: string) => void;
  containerClass: string;
}

const Search: React.FC<SearchProps> = ({ data, containerClass }) => {
  const dispatch = useDispatch();

  const [iconClicked, setIconClicked] = useState(false);
  const [blurred, setBlurred] = useState(false);

  return (
    <div
      className={
        containerClass
          ? `search-container ${containerClass}`
          : "search-container"
      }
    >
      {iconClicked ? (
        <>
          <InputElement
            placeholder={"Search"}
            uid={"search-box"}
            type="text"
            // value={formData['fullName']}
            containerClass={!blurred ? "search-box-open" : "search-box-close"}
            onChange={(e: any) => {
              data(e.target.value);
            }}
            icon={<i className="demo-icon icon-search size-16-8f" />}
            autoFocus
            onBlur={() => {
              setBlurred(true);
              setTimeout(() => {
                setIconClicked(false);
                setBlurred(false);
                dispatch(storeSearchText(""));
              }, 1000);
            }}
          />
        </>
      ) : (
        <IconButton
          click={() => {
            setIconClicked(true);
          }}
          icon={<i className="demo-icon icon-search" />}
        />
      )}
    </div>
  );
};

export default React.memo(Search);

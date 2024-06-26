import { FC } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { Select, MenuItem } from "@material-ui/core";
import noop from "lodash/noop";
import {
  DropdownProps,
  InputElementProps,
  TextInputElementProps,
} from "Components/Interfaces/interfaces";

import "Styles/Components/form-elements.scss";

export const InputElement: FC<InputElementProps> = ({
  label,
  type = "text",
  uid,
  placeholder,
  containerClass,
  icon,
  errMsg,
  successMsg,
  reference,
  ...rest
}) => {
  return (
    <div key={uid} className={`element input-container ${containerClass}`}>
      <div className="d-flex justify-space-between mb-10 label-container">
        <label className="label" htmlFor={uid}>
          {label}
        </label>
        <label
          className="label"
          style={errMsg ? { color: "#FF0000" } : { color: "#267A08" }}
        >
          {errMsg ? errMsg : successMsg || ""}
        </label>
      </div>
      <input
        className={
          label?.length && label?.length > 0
            ? "input-element mt-5"
            : "input-element"
        }
        type={type}
        name={uid}
        id={uid}
        placeholder={
          placeholder ? placeholder : `Enter a ${label?.toLowerCase()}`
        }
        ref={reference}
        {...rest}
      />
      <div className="icon-container">{icon || ""}</div>
    </div>
  );
};

export const TextInputElement: FC<TextInputElementProps> = ({
  label,
  type,
  key,
  uid,
  placeholder,
  containerClass,
  ...rest
}) => {
  return (
    <div
      key={key}
      className={`element textArea-input-container ${containerClass}`}
    >
      <label htmlFor={uid}>{label}</label>
      <textarea
        className={
          label?.length && label?.length > 0
            ? "textArea-input-element mt-5"
            : "textArea-input-element"
        }
        //type={type}
        name={uid}
        id={uid}
        placeholder={
          placeholder ? placeholder : `Enter a ${label?.toLowerCase()}`
        }
        {...rest}
      />
    </div>
  );
};

export const Dropdown: FC<DropdownProps> = ({
  labelName,
  key,
  options = [""],
  optionSelect = noop,
  value,
  ...rest
}) => {
  return (
    <div key={key} className="dropdown">
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">
          {labelName}
        </InputLabel>
        <Select
          label={labelName}
          onChange={(e: any) => {
            optionSelect(e.target.value);
          }}
          displayEmpty={true}
          renderValue={() => {
            return value?.title ? value.title : value;
          }}
          {...rest}
        >
          <MenuItem aria-label="None" value="" />
          {options.map((item: any, key: any) => {
            return (
              <MenuItem key={key} value={item}>
                {item?.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

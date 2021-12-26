import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import PropTypes from "prop-types";

//CSS
import "./form-element.css";
import { noop } from 'lodash';


export function InputElement({ lable, type, uid, placeholder, ...rest }) {
  return (
    <div key={uid} className="element input-container">
      <label for={uid}>{lable}</label>
      <input
        className="input-element"
        type={type}
        name={uid}
        id={lable}
        placeholder={placeholder ? placeholder : `Enter a ${lable?.toLowerCase()}`}
        {...rest}
      />
    </div>
  );
}

export function TextInputElement({ lable, type, uid, placeholder, ...rest }) {
  return (
    <div key={uid} className="element textArea-input-container">
      <label for={uid}>{lable}</label>
      <textarea
        className="textArea-input-element"
        type={type}
        name={uid}
        id={lable}
        placeholder={placeholder ? placeholder : `Enter a ${lable?.toLowerCase()}`}
        {...rest}
      />
      
    </div>
  );
}

export function Dropdown({ labelName , options , optionSelect }) {
  return (
    <div className="dropdown">
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">{labelName}</InputLabel>
        <Select
          onChange={(e) => {
            optionSelect(JSON.parse(e.target.value))
          }}
          label={labelName}
        >
          <option aria-label="None" value="" />
          {options.map((item , key) => {
            return (
              <option key={key} value={JSON.stringify(item)}>{item?.title ? item.title : item}</option>
            )
          })}
       
        </Select>
      </FormControl>
    </div>
  )
}

InputElement.defaultProps = {
  type: 'text'
}

Dropdown.defaultProps = {
  options : [],
  optionSelect : noop
}
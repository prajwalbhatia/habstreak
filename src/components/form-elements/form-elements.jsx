import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Select, MenuItem } from '@material-ui/core';

//CSS
import "./form-element.css";
import { noop } from 'lodash';


export function InputElement({ lable, type, uid, placeholder, containerClass, icon, errMsg, successMsg, reference, ...rest }) {
  return (
    <div key={uid} className={`element input-container ${containerClass}`}>
      <div className='d-flex justify-space-between mb-10 label-container'>
        <label className='label' htmlFor={uid}>{lable}</label>
        <label className='label' style={errMsg ? { color: '#FF0000' } : { color: '#267A08' }}>
          {errMsg ? errMsg : (successMsg ? successMsg : '')}
        </label>
      </div>
      <input
        className={lable?.length > 0 ? 'input-element mt-5' : 'input-element'}
        type={type}
        name={uid}
        id={lable}
        placeholder={placeholder ? placeholder : `Enter a ${lable?.toLowerCase()}`}
        ref={reference}
        {...rest}
      />
      <div className='icon-container'>
        {icon ? icon : ''}
      </div>
    </div>
  );
}

export function TextInputElement({ lable, type, key, uid, placeholder, containerClass, ...rest }) {
  return (
    <div key={key} className={`element textArea-input-container ${containerClass}`}>
      <label htmlFor={uid}>{lable}</label>
      <textarea
        className={lable?.length > 0 ? 'textArea-input-element mt-5' : 'textArea-input-element'}
        type={type}
        name={uid}
        id={lable}
        placeholder={placeholder ? placeholder : `Enter a ${lable?.toLowerCase()}`}
        {...rest}
      />

    </div>
  );
}

export function Dropdown({ labelName, key, options, optionSelect, value, ...rest }) {
  return (
    <div key={key} className="dropdown">
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-age-native-simple">{labelName}</InputLabel>
        <Select
          label={labelName}
          onChange={(e) => {
            optionSelect(e.target.value)
          }}
          displayEmpty={true}
          renderValue={() => {
            return value?.title ? value?.title : value
          }}
          {...rest}
        >
          <MenuItem aria-label="None" value="" />
          {options.map((item, key) => {
            return (
              <MenuItem key={key}
                value={item}
              >
                {item?.title ? item.title : item}
              </MenuItem>
            )
          })}

        </Select>
      </FormControl>
    </div>
  )
}

InputElement.defaultProps = {
  type: 'text',
}

Dropdown.defaultProps = {
  options: [],
  optionSelect: noop
}
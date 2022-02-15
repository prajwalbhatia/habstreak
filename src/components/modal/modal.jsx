import { useEffect } from "react";
import { React, useState } from "react";

//LIBRARIES
import { cloneDeep } from "lodash";
import Calendar from 'react-calendar';

//Components
import { SecondaryButton, PrimaryButton } from "../button/button";
import { InputElement, TextInputElement, Dropdown } from "../form-elements/form-elements";

import "./modal.css";
import { OutlinedPrimaryButton } from "components/button/button";

function Modal(props) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(cloneDeep(props?.initialData) || {});
    }, [props.initialData])

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const setDropDown = ((key, value) => {
        setFormData({ ...formData, [key]: value })
    })

    const content = (dataArr) => {
        return dataArr.map((data) => {
            if (data.eleType === 'text') {
                return (
                    <p>{data.text}</p>
                )
            }
            else if (data.eleType === 'input') {
                return (
                    <InputElement
                        lable={data?.label}
                        uid={data.uid}
                        placeholder={data?.placeholder}
                        value={formData?.[data.uid]}
                        onChange={changeHandler}
                        type={data.type}
                        min={data?.min}
                        icon={data.icon ? <i className={`{demo-icon ${data.icon} size-16-8f}`} /> : null}
                    />)
            }
            else if (data.eleType === 'textArea') {
                return (
                    <TextInputElement
                        lable={data.label}
                        uid={data.uid}
                        placeholder={data?.placeholder}
                        onChange={changeHandler}
                        value={formData?.[data.uid]}
                        type={data.type}
                    />
                )
            }
            else if (data.eleType === 'dropdown') {
                return (
                    <Dropdown
                        labelName={data.label}
                        options={data.options}
                        value={formData?.[data.uid]}
                        optionSelect={(value) => {
                            setDropDown(data.uid, value)
                            props.dropdownHandler(data.uid, value)
                        }}
                        disabled={data?.disabled}
                    />
                )
            }
            else if (data.group) {
                return (
                    <div className="d-flex">
                        {
                            data?.items.map((data, index) => {
                                return (
                                    <InputElement
                                        lable={data?.label}
                                        uid={data.uid}
                                        placeholder={data?.placeholder}
                                        containerClass={index === 0 ? 'mr-10' : ''}
                                        value={formData?.[data.uid]}
                                        onChange={changeHandler}
                                        type={data.type}
                                        min={data?.min}
                                        icon={data.icon ? <i className={`{demo-icon ${data.icon} size-16-8f}`} /> : null}
                                    />
                                )
                            })

                        }
                    </div>
                )
            }
            else
                return null;
        })
    }


    const handleClick = (type) => {
        if (type === 'primary') {
            props.btnClickHandler({ type, ...formData });
        }
        else if (type === 'secondary') {
            props.btnClickHandler({ type });
        }
        else {
            props.btnClickHandler({ type })
        }
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="header-part">
                    <div className="header-content-part">
                        <div className="d-flex">
                            <h2>{props.title}</h2>
                            <i className="demo-icon icon-streak streak-icon" />
                        </div>
                        <i
                            className="demo-icon icon-close size-16-8f close-icon"
                            onClick={() => handleClick('secondary')}
                        />
                    </div>
                </div>
                <div className="content-part">
                    {content(props.content)}
                    
                    {/* <div>
                        <Calendar  />
                    </div> */}
                </div>
                <div className="buttons-part">
                    {
                        props.extraButtons && props.extraButtons.map((btn) => {
                            return (
                                <PrimaryButton
                                    name={btn.text}
                                    click={() => handleClick(btn.uid)}
                                    style={btn.style ? { ...btn.style } : {}}
                                />
                            );
                        })
                    }

                    <OutlinedPrimaryButton
                        name={props.primaryButtonText}
                        click={() => handleClick('primary')}
                        btnClass={'primary-btn'}
                    />

                    <SecondaryButton
                        name={props.secondaryButtonText}
                        click={() => handleClick('secondary')}
                        btnClass={'secondary-btn'}
                    />

                </div>
            </div>
            <div className="wrapper">
                modal
            </div>
        </div>
    );
}

export default Modal;
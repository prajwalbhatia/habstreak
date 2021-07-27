import { useEffect } from "react";
import { React, useState } from "react";
import { IconContext } from "react-icons"

//Components
import { SecondaryButton, PrimaryButton } from "../button/button";
import { InputElement, TextInputElement, Dropdown } from "../form-elements/form-elements";

import "./modal.css";

function Modal(props) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData(props?.initialData || {});
    }, [props.initialData])

    const changeHandler = (e) => {
        console.log(e.target.name)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const setDropDown = ((key, value) => {
        setFormData({ ...formData, [key]: value })
    })

    const content = (dataArr) => {
        return dataArr.map((data) => {
            if (data.eleType === 'input') {
                return (
                    <InputElement
                        lable={data.label}
                        uid={data.uid}
                        placeholder={data?.placeholder}
                        value={formData?.[data.uid]}
                        onChange={changeHandler}
                        type={data.type}
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
                            props.dropdownHandler(value)
                        }}
                    />
                )
            }

        })
    }


    const handleClick = (type) => {
        if (type === 'primary') {
            props.btnClickHandler({ type, ...formData });
        }
        else if (type === 'secondary') {
            props.btnClickHandler({ type });
        }

    }

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="header-part">
                    <h4>{props.title}</h4>
                    <IconContext.Provider
                        value={{ style: { fontSize: '1.4rem', marginTop: "1px", marginRight: "5px" } }}>
                        {props.icon}
                    </IconContext.Provider>
                </div>
                <div className="content-part">
                    {content(props.content)}
                </div>
                <div className="buttons-part">
                    <PrimaryButton
                        name={props.primaryButtonText}
                        click={() => handleClick('primary')}
                    />

                    <SecondaryButton
                        name={props.secondaryButtonText}
                        click={() => handleClick('secondary')}
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
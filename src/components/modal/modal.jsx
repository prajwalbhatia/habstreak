import {React , useState} from "react";
import { AiFillHeart  } from "react-icons/ai";
import {IconContext} from "react-icons"

//Components
import { SecondaryButton , PrimaryButton } from "../button/button";
import { InputElement , TextInputElement } from "../form-elements/form-elements";

import "./modal.css";

function Modal(props)
{
    const [formData , setFormData] = useState({});

    const changeHandler = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    const content = (dataArr) => {
        return dataArr.map((data) => {
            if(data.eleType === 'input')
            {
                return (
                <InputElement
                    lable={data.label}
                    uid={data.uid}
                    onChange={changeHandler}
                    type={data.type}
                />)
            }
            else if(data.eleType == 'textArea')
            {
                return (
                <TextInputElement
                    lable={data.label}
                    uid={data.uid}
                    onChange={changeHandler}
                    type={data.type}
                />
                )
            }
        })
    }
    

    const handleClick = (type) =>
    {
        if(type === 'primary')
        {
            props.btnClickHandler({type , ...formData});
        }
        else if(type === 'secondary')
        {
            props.btnClickHandler({type });
        }

    }

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="header-part">
                    <h4>{props.title}</h4>
                    <IconContext.Provider 
                    value={{ style: {fontSize: '1.4rem',  marginTop : "1px" , marginRight : "5px"}}}>
                      {props.icon}
                    </IconContext.Provider>
                </div>
                <div className="content-part">
                    { content(props.content)}
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
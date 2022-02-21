import { useEffect } from "react";
import { React, useState } from "react";

//LIBRARIES
import { cloneDeep, map as _map, size as _size } from "lodash";
import Calendar from 'react-calendar';
import moment from 'moment';

//Components
import { SecondaryButton, PrimaryButton } from "../button/button";
import { InputElement, TextInputElement, Dropdown } from "../form-elements/form-elements";
import { OutlinedPrimaryButton } from "components/button/button";

//CSS
import 'react-calendar/dist/Calendar.css';
import "./modal.css";

function Modal(props) {
    const [formData, setFormData] = useState({});
    const [showCalendar, setShowCalendar] = useState(false);
    const [modalType, setModalType] = useState('');

    useEffect(() => {
        setFormData(cloneDeep(props?.initialData) || {});
    }, [props.initialData])

    useState(() => {
        setModalType(props.type);
    }, [])

    //FUNCTIONS

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const setDropDown = ((key, value) => {
        setFormData({ ...formData, [key]: value })
    })

    const calendarDate = (rangeArr) => {
        const dateFrom = moment(rangeArr[0]).format().split('T')[0];
        const dateTo = moment(rangeArr[1]).format().split('T')[0];

        var from = moment(rangeArr[0]);
        var to = moment(rangeArr[1]);
        const days = to.diff(from, 'days');

        setFormData({ ...formData, dateFrom, dateTo, days })
        setShowCalendar(false);
    }
    //FUNCTIONS

    const content = (dataArr) => {
        return dataArr.map((data) => {
            if (data.eleType === 'text') {
                return (
                    <h3 className="font-rob-med font-18">{data.text}</h3>
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
                        autoFocus={data.autoFocus ? data.autoFocus : false}
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
                        autofocus={data.autoFocus ? data.autoFocus : false}
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
                    <div className="pos-relative">
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
                                            disabled
                                            icon={data.icon
                                                ?
                                                <i
                                                    className={`{demo-icon ${data.icon} size-16-8f}`}
                                                    onClick={() => setShowCalendar((prop) => !prop)}
                                                />
                                                : null}
                                        />
                                    )
                                })

                            }
                        </div>
                        {
                            showCalendar
                                ?
                                <div className="react-calendar-container">
                                    <Calendar
                                        returnValue="range"
                                        selectRange={true}
                                        onChange={calendarDate}
                                        minDate={new Date()}
                                    />
                                </div>
                                :
                                null
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
            if (modalType === 'create') {
                const isEmpty = _size(formData) === 0;
                const allFieldsAreFilled = _size(formData) === 5;

                if (!isEmpty && allFieldsAreFilled) {
                    let emptyField = false;
                    _map(formData, (item) => {
                        if (item.length === 0)
                            emptyField = true;
                    });

                    if (!emptyField) {
                        props.btnClickHandler({ type, ...formData });
                    }
                }
            }
            else {
                props.btnClickHandler({ type, ...formData });
            }
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
                            <h2 style={modalType === 'delete' ? { color: '#D63E3E' } : {}}>{props.title}</h2>
                            <i
                                className={`demo-icon streak-icon ${props.icon}`}
                                style={modalType === 'delete' ? { color: '#D63E3E' } : {}}
                            />
                        </div>
                        <i
                            className="demo-icon icon-close size-16-8f close-icon"
                            onClick={() => handleClick('secondary')}
                        />
                    </div>
                </div>
                <div className="content-part">
                    {content(props.content)}

                </div>
                <div className="buttons-part">
                    {
                        props.extraButtons && props.extraButtons.map((btn) => {
                            return (
                                <PrimaryButton
                                    name={btn.text}
                                    click={() => handleClick(btn.uid)}
                                    btnContainerClass={btn.btnContainerClass ? btn.btnContainerClass : ''}
                                    btnClass={btn.btnClass ? btn.btnClass : ''}
                                    style={btn.style ? { ...btn.style } : {}}
                                    tooltip={btn.tooltip}
                                    tooltipData={btn.tooltipData}
                                />
                            );
                        })
                    }

                    <OutlinedPrimaryButton
                        name={props.primaryButtonText}
                        click={() => handleClick('primary')}
                        btnClass={modalType === 'delete' ? 'primary-btn danger-btn' : 'primary-btn'}
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
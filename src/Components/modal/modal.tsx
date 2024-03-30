import { useState, useEffect } from "react";

import cloneDeep from "lodash/cloneDeep";
import map from "lodash/map";
import size from "lodash/size";

import Calendar from "react-calendar";
import moment from "moment";

import {
  InputElement,
  TextInputElement,
  Dropdown,
} from "../form-elements/form-elements";
import {
  OutlinedPrimaryButton,
  SecondaryButton,
  PrimaryButton,
} from "Components/buttons/buttons";

import "react-calendar/dist/Calendar.css";
import "Styles/Components/modal.scss";

const objectHasKey = (obj: any, keys : any) => {
  return keys.every((key : any) => key in obj);
};

function Modal(props: any) {
  const [formData, setFormData] = useState<any>({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [modalType, setModalType] = useState("");

  const [minDate, setMinDate] = useState<any>(null);
  const [maxDate, setMaxDate] = useState<any>(null);

  useEffect(() => {
    if (props.initialData) {
      setFormData(cloneDeep(props?.initialData) || {});
      if (props.initialData.minDate) setMinDate(props.initialData.minDate);

      if (props.initialData.maxDate) setMaxDate(props.initialData.maxDate);
    }
  }, [props.initialData]);

  useEffect(() => {
    setModalType(props.type);
  }, [props.type]);

  //FUNCTIONS

  const changeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setDropDown = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const calendarDate = (
    rangeArr:
      | string
      | number
      | moment.Moment
      | Date
      | moment.MomentInputObject
      | moment.MomentInput[]
      | null
      | undefined
  ) => {
    if (Array.isArray(rangeArr)) {
      const dateFrom = moment(rangeArr[0]).format("YYYY-MM-DD").toString();
      const dateTo = moment(rangeArr[1]).format("YYYY-MM-DD").toString();

      let from = moment(rangeArr[0]);
      let to = moment(rangeArr[1]);
      const days = to.diff(from, "days") + 1;

      setFormData({ ...formData, dateFrom, dateTo, days });
    } else {
      const date = moment(rangeArr).format("YYYY-MM-DD");
      setFormData({ ...formData, pickDate: date });
    }
    setShowCalendar(false);
  };

  const content = (dataArr: any[]) => {
    return dataArr.map((data, index) => {
      if (data.eleType === "text") {
        return (
          <h3 key={index} className="font-rob-med font-18">
            {data.text}
          </h3>
        );
      } else if (data.eleType === "input") {
        return (
          <div key={index}>
            <InputElement
              label={data?.label}
              uid={data.uid}
              placeholder={data?.placeholder}
              value={formData?.[data.uid]}
              onChange={changeHandler}
              type={data.type}
              min={data?.min}
              icon={
                data.icon ? (
                  <i className={`{demo-icon ${data.icon} size-16-8f}`} />
                ) : null
              }
              autoFocus={data.autoFocus ? data.autoFocus : false}
            />
          </div>
        );
      } else if (data.eleType === "textArea") {
        return (
          <div key={index}>
            <TextInputElement
              key={data.label}
              label={data.label}
              uid={data.uid}
              placeholder={data?.placeholder}
              onChange={changeHandler}
              value={formData?.[data.uid]}
              type={data.type}
              autoFocus={data.autoFocus ? data.autoFocus : false}
            />
          </div>
        );
      } else if (data.eleType === "dropdown") {
        return (
          <Dropdown
            key={data?.uid}
            labelName={data.label}
            options={data.options}
            value={formData?.[data.uid]}
            placeholder={"data?.placeholder"}
            optionSelect={(value) => {
              setDropDown(data.uid, value);
              props.dropdownHandler(data.uid, value);
              const { dateFrom, dateTo } = value;
              setMinDate(new Date(dateFrom));
              setMaxDate(new Date(dateTo));
            }}
            disabled={data?.disabled}
          />
        );
      } else if (data.group) {
        return (
          <div key={index} className="d-flex pos-relative">
            <div className="d-flex flex-1">
              {data?.items.map((dataInner: any, index: any) => {
                return (
                  <div className="w-100" key={index}>
                    <InputElement
                      label={dataInner?.label}
                      uid={dataInner.uid}
                      placeholder={dataInner?.placeholder}
                      containerClass={
                        data.items && data?.items.length > 1
                          ? "d-flex flex-1 mr-10"
                          : "d-flex flex-1"
                      }
                      value={formData?.[dataInner.uid]}
                      onChange={changeHandler}
                      type={dataInner.type}
                      disabled
                      icon={
                        dataInner.icon ? (
                          <i
                            className={`{demo-icon ${dataInner.icon} size-16-8f}`}
                            onClick={() => setShowCalendar((prop) => !prop)}
                          />
                        ) : null
                      }
                    />
                  </div>
                );
              })}
            </div>
            {showCalendar ? (
              <div key={index} className="react-calendar-container">
                <Calendar
                  returnValue={data.range ? "range" : "start"}
                  selectRange={data.range}
                  onChange={calendarDate}
                  minDate={
                    minDate
                      ? minDate < new Date()
                        ? new Date()
                        : minDate
                      : new Date()
                  }
                  maxDate={maxDate ? new Date(maxDate) : undefined}
                />
              </div>
            ) : null}
          </div>
        );
      } else return null;
    });
  };

  const handleClick = (type: any) => {
    if (type === "primary") {
      if (modalType === "create") {
        const isEmpty = size(formData) === 0;
        const allFieldsAreFilled = size(formData) === 5;

        if (!isEmpty && allFieldsAreFilled) {
          let emptyField = false;
          map(formData, (item: []) => {
            if (item.length === 0) emptyField = true;
          });

          if (!emptyField) {
            props.btnClickHandler({ type, ...formData });
          }
        }
      } else {
        props.btnClickHandler({ type, ...formData });
      }
    } else {
      props.btnClickHandler({ type });
    }
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="header-part">
          <div className="header-content-part">
            <div className="d-flex">
              <h2 style={modalType === "delete" ? { color: "#D63E3E" } : {}}>
                {props.title}
              </h2>
              <i
                className={`demo-icon streak-icon ${props.icon}`}
                style={modalType === "delete" ? { color: "#D63E3E" } : {}}
              />
            </div>
            <i
              className="demo-icon icon-close size-16-8f close-icon"
              onClick={() => handleClick("secondary")}
            />
          </div>
        </div>
        <div className="content-part">{content(props.content)}</div>
        <div className="buttons-part">
          {props.extraButtons &&
            props.extraButtons.map((btn: any, index: any) => {
              return (
                <div key={index} className="w-100 mr-10">
                  <PrimaryButton
                    name={btn.text}
                    click={() => handleClick(btn.uid)}
                    btnContainerClass={
                      btn.btnContainerClass ? btn.btnContainerClass : ""
                    }
                    btnClass={btn.btnClass ? btn.btnClass : ""}
                    // style={btn.style ? { ...btn.style } : {}}
                    tooltip={btn.tooltip}
                    tooltipData={btn.tooltipData}
                  />
                </div>
              );
            })}

          <OutlinedPrimaryButton
            name={props.primaryButtonText}
            click={() => handleClick("primary")}
            btnClass={
              modalType === "delete" ? "primary-btn danger-btn" : "primary-btn"
            }
            disabled={props.disableCheckKeys ? !objectHasKey(formData , props.disableCheckKeys) : false}
          />

          {props.secondaryButtonText && (
            <SecondaryButton
              name={props.secondaryButtonText}
              click={() => handleClick("secondary")}
              btnClass={"secondary-btn"}
            />
          )}
        </div>
      </div>
      <div className="wrapper"></div>
    </div>
  );
}

export default Modal;

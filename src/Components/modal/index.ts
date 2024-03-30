/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import ReactDOM from "react-dom/client";
import ModalComponent from "./modal";

const modalContainerId = "modal-container-id";

function Modal(this: any) {
  this.show = (renderProps: any) => {
    const element = React.createElement(ModalComponent, {
      ...renderProps,
      hide: this.hide,
    });

    const root = ReactDOM.createRoot(
      document.getElementById(modalContainerId) as HTMLElement
    );

    root.render(element);
  };

  this.hide = () => {
    const root = ReactDOM.createRoot(
      document.getElementById(modalContainerId) as HTMLElement
    );
    root.unmount();
  };

  return this;
}

export default new (Modal as any)();

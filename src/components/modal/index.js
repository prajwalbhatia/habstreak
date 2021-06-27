import React from 'react'
import ReactDOM from 'react-dom';
import ModalComponent from './modal.jsx';

const modalContainerId = 'modal-container-id';

function Modal() {
    console.log(document.getElementById(modalContainerId))
    this.show = (renderProps) => {
        const element = React.createElement(ModalComponent , {...renderProps , hide : this.hide});
        ReactDOM.render(element , document.getElementById(modalContainerId));
    }

    this.hide = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById(modalContainerId));
    }

    return this;
}

export default new Modal();
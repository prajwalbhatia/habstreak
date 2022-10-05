import React, { useState } from 'react';

//css
import { IconButton } from "components/button/button";
import { InputElement } from "components/form-elements/form-elements";

//Redux
import { useDispatch } from "react-redux";

//Actions
import { search } from "redux/actions/streak";

import "./search.css";

function Search(props) {
    const dispatch = useDispatch();

    const [iconClicked, setIconClicked] = useState(false);
    const [blurred, setBlurred] = useState(false);

    return (
        <div className={props.containerClass ? `search-container ${props.containerClass}` : 'search-container'} >
            {
                iconClicked
                    ?
                    <>
                        <InputElement
                            placeholder={'Search'}
                            uid={'search-box'}
                            type="text"
                            // value={formData['fullName']}
                            containerClass={!blurred ? 'search-box-open' : 'search-box-close'}
                            onChange={(e) => {
                                props.data(e.target.value)
                            }}
                            icon={<i className="demo-icon icon-search size-16-8f" />}
                            autoFocus
                            onBlur={() => {
                                setBlurred(true);
                                setTimeout(() => {
                                    setIconClicked(false);
                                    setBlurred(false);
                                    dispatch(search(''));
                                }, 1000);
                            }}
                        />
                    </>
                    :
                    <IconButton
                        click={() => { setIconClicked(true); }}
                        icon={<i className="demo-icon  icon-search" />}
                    />
            }

        </div>
    )
}

export default React.memo(Search);
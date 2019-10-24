import React from 'react';

const Square = props => (
    <button id={'square'} className={`square`} onClick={props.onClick}>
        {props.value}
    </button>
);

export default Square;
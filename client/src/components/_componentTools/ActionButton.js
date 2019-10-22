import React from "react";

export default function ActionButton(props) {

    return <button onClick={props.onClick} style={{marginBottom: '10px'}} type="button"
                   className="btn btn-info btn-block">{props.name}</button>
}
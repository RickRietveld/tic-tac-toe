import React from "react";

export default function InsertBox(props) {

    return <div className="form-group">
        <input onChange={props.onChange} type="name" className="form-control"
               id="roomInput" style={{marginTop: '10px'}} placeholder={props.value}/>
    </div>
}
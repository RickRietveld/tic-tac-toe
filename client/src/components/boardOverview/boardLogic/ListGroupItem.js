import React from "react";
import {ListGroup} from "react-bootstrap";

export default function ListGroupItem(props) {

    return <ListGroup.Item>{props.token} {props.name}</ListGroup.Item>
}

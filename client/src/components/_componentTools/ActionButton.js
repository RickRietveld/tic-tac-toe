export default function ActionButton(props) {

    return
<
    button
    onClick = {props.onClick}
    style = {
    {
        marginTop: '50px', marginBottom
    :
        '50px'
    }
}
    type = "button"
    className = "btn btn-warning  btn-block" > {props.name} < /button>
}
export default function InsertBox(props) {

    return
<
    div
    className = "form-group" >
        < input
    onChange = {props.onChange}
    type = "name"
    className = "form-control"
    id = "roomInput"
    style = {
    {
        marginTop: '20px'
    }
}
    placeholder = {props.name}
    />
    < /div>
}

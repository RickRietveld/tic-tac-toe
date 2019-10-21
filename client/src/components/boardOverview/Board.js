import React from 'react';
import * as ReactRedux from 'react-redux';


export class Board extends React.Component {


    render() {
        return <>
            Hello
        </>
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Board);
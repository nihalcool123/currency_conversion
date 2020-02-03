import React from 'react';
import fileData from './file.json';
import PropTypes from "prop-types"



class CurrencyDropdown extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            initialData: []
        }
    }

    componentDidMount() {
        let fileDatas = Object.keys(fileData)
        this.setState({
            initialData: fileDatas,
        })
    }

    handleFirstOption = e => {

        if (this.props.labelFirst === 'from') {
            let firstVal = e.target.value

            this.props.triggerFirst(firstVal)
        }

        if (this.props.labelSecond === 'to') {
            let secondVal = e.target.value

            this.props.triggerSecond(secondVal)
        }
    }

    render() {
        return (
            <select className="ui mini dropdown" defaultValue={'DEFAULT'} style={{ width: "auto", marginLeft: "20px" }} required onChange={this.handleFirstOption} >
                <option value="DEFAULT" disabled >Select</option>
                {this.state.initialData.map(val => <option key={val} value={val} >{val}</option>)}
            </select >
        )
    }
}

CurrencyDropdown.propTypes = {
    labelFirst: PropTypes.string,
    labelSecond: PropTypes.string,
    triggerSecond: PropTypes.func,
    triggerFirst: PropTypes.func
}

export default CurrencyDropdown;
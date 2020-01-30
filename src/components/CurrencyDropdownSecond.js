import React from 'react';
import fileData from './file.json';


class CurrencyDropdownSecond extends React.Component {

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

    handleSecondOption = e => {
        let secondVal = e.target.value
        this.props.triggerSecond(secondVal)
    }

    render() {
        return (
            <select className="ui mini dropdown" defaultValue={'DEFAULT'} style={{ width: "auto", marginLeft: "43px" }} required onChange={this.handleSecondOption}>
                <option value="DEFAULT" disabled >Select</option>
                {this.state.initialData.map(val => <option key={val} value={val} >{val}</option>)}
            </select>
        )
    }
}

export default CurrencyDropdownSecond;
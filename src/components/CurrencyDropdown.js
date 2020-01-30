import React from 'react';
import fileData from './file.json';


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

        let firstVal = e.target.value

        this.props.triggerFirst(firstVal)
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

export default CurrencyDropdown;
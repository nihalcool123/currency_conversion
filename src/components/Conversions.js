import React from 'react';
import fileData from './file.json';
import currenyPairs from "./currencyPairs.json";
import CurrencyDropdown from "./CurrencyDropdown";
import "./Conversion.css"

class Conversions extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            totalData: '',
            // initialData: [],
            firstOption: '',
            secondOption: '',
            inputValue: '',
            currencyPairList: '',
            displayData: '',
            errorMsg: '',
            emptyMsg: '',
            // labelFirst: 'firstOption'
        }
    }


    componentDidMount() {
        // let fileDatas = Object.keys(fileData)
        this.setState({
            totalData: fileData,
            // initialData: fileDatas,
            currencyPairList: currenyPairs
        })
    }

    updateInput = e => {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleSubmit = () => {

        if (this.state.firstOption === '' && this.state.secondOption === '') {
            this.setState({
                emptyMsg: 'Please select a value'
            })
        } else {
            let firstOptionSelectedData = this.state.firstOption;
            let secondOptionSelectedData = this.state.secondOption;
            let secondSelectedObjectValue = '';
            secondSelectedObjectValue = this.state.totalData[firstOptionSelectedData][secondOptionSelectedData]
            this.startCalculation(secondSelectedObjectValue);
        }
    }

    startCalculation = (secondSelectedObjectValue) => {

        let concatSelectValue = this.state.firstOption.concat(this.state.secondOption);

        // * if the value in the table is equal to a Direct and Invert 

        if (secondSelectedObjectValue === 'D' || secondSelectedObjectValue === 'INV') {
            let currencyPairValue = this.state.currencyPairList[concatSelectValue];
            let result = currencyPairValue * this.state.inputValue;
            this.setState({
                displayData: result.toFixed(2)
            })
        }

        // * if the value in the table is equal to a 1:1 relationship 

        if (secondSelectedObjectValue === '1') {
            let result = this.state.inputValue;
            this.setState({
                displayData: result
            })
        }
        // * if the value in the table is equal to USD 

        if (secondSelectedObjectValue === 'USD') {
            let firstPairConcat = this.state.firstOption.concat('USD')

            let resultfirstPairConcat = this.state.currencyPairList[firstPairConcat]

            let secondPairConcat = 'USD'.concat(this.state.secondOption)

            let resultsecondPairConcat = this.state.currencyPairList[secondPairConcat]

            let crossRateResult = resultfirstPairConcat * resultsecondPairConcat;

            let totalCrossRateResult = this.state.inputValue * crossRateResult;

            this.setState({
                displayData: totalCrossRateResult.toFixed(2)
            })
            if (isNaN(resultfirstPairConcat) || isNaN(resultsecondPairConcat)) {
                this.setState({
                    errorMsg: 'value is not there in  the currency list pair'
                })
            }
        }

        // * if the value in the table is equal to EUR => IMP_NOTE linking ex CZKUSD - CZKEUR && EURUSD

        if (secondSelectedObjectValue === 'EUR') {
            let firstPairConcat = this.state.firstOption.concat('EUR')

            let resultfirstPairConcat = this.state.currencyPairList[firstPairConcat]

            let secondPairConcat = 'EUR'.concat(this.state.secondOption)

            let resultsecondPairConcat = this.state.currencyPairList[secondPairConcat]

            let crossRateResult = resultfirstPairConcat * resultsecondPairConcat;

            let totalCrossRateResult = this.state.inputValue * crossRateResult;

            this.setState({
                displayData: totalCrossRateResult.toFixed(2)
            })
            if (isNaN(resultfirstPairConcat) || isNaN(resultsecondPairConcat)) {
                this.setState({
                    errorMsg: 'value is not there in  the currency list pair'
                })
            }
        }

        // * if the value in the table is equal to EUR => IMP_NOTE linking ex CZKUSD - EURCZK && EURUSD

        // if (secondSelectedObjectValue === 'EUR') {
        //     let firstPairConcat = 'EUR'.concat(this.state.firstOption);
        //     console.log("frstPAIRCONCAT", firstPairConcat)

        //     let resultfirstPairConcat = this.state.currencyPairList[firstPairConcat]
        //     console.log("resultfirstPairConcat = ", resultfirstPairConcat)

        //     let secondPairConcat = 'EUR'.concat(this.state.secondOption)
        //     console.log("secondPairConcat", secondPairConcat)

        //     let resultsecondPairConcat = this.state.currencyPairList[secondPairConcat]
        //     console.log("resultsecondPairConcat = ", resultsecondPairConcat)

        //     let crossRateResult = resultfirstPairConcat * resultsecondPairConcat;
        //     console.log("crossRateResult", crossRateResult)

        //     let totalCrossRateResult = this.state.inputValue * crossRateResult;
        //     console.log("totalCrossRateResult", totalCrossRateResult)

        //     this.setState({
        //         displayData: totalCrossRateResult.toFixed(2)
        //     })
        //     if (isNaN(resultfirstPairConcat) || isNaN(resultsecondPairConcat)) {
        //         this.setState({
        //             errorMsg: 'value is not there in  the currency list pair'
        //         })
        //     }
        // }

    }

    formSubmit = (e) => {
        e.preventDefault()
    }

    updateDropdownFirstOption = (firstOption) => {

        this.setState({
            firstOption: firstOption
        })
        this.setState({
            errorMsg: '',
            emptyMsg: ''
        })
    }

    updateDropdownSecondOption = (secondOption) => {

        this.setState({
            secondOption: secondOption
        })

        this.setState({
            errorMsg: '',
            emptyMsg: ''
        })
    }

    render() {
        let DisplayResult;
        if (this.state.displayData === 'NaN') {
            DisplayResult = <p>{""}</p>;
        } else {
            DisplayResult = <p style={{ marginLeft: "74px", fontSize: "large", fontWeight: "bold" }} >{this.state.secondOption} {this.state.displayData} </p>;
        }

        return (
            <div style={{ marginLeft: '550px', marginTop: '0px' }} >
                <h1 style={{ marginLeft: "10px" }} >Currency Calculator</h1>
                <h4 style={{ color: "red" }} >{this.state.errorMsg}</h4>
                <h4 style={{ color: "red" }} >{this.state.emptyMsg}</h4>
                <form onSubmit={this.formSubmit} >
                    <div>
                        <label className="ui header" >From:</label>
                        <CurrencyDropdown triggerFirst={this.updateDropdownFirstOption} labelFirst="from" />
                        <span>
                            <div className="ui small input focus">
                                <input placeholder="value..." onChange={this.updateInput} value={this.state.inputValue} style={{ marginLeft: "30px" }} type="number" required />
                            </div>
                        </span>

                    </div>
                    <br />
                    <div>
                        <label className="ui header" htmlFor="id_select_second" style={{ marginLeft: '22px' }} >To:</label>
                        <CurrencyDropdown triggerSecond={this.updateDropdownSecondOption} labelSecond="to" />


                    </div>
                    <br />
                    <button onClick={this.handleSubmit} style={{ marginLeft: "55px" }} className="ui small right labeled icon button">
                        <i className="right arrow icon"></i>
                        Submit
                    </button>
                    <br /> <br /> <br />
                    {DisplayResult}
                </form>
            </div>
        )
    }
}

export default Conversions;
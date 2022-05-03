import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFile, faArrowsRotate, faPlus, faMinus, faBackward, faForward } from '@fortawesome/free-solid-svg-icons'

class Documents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {taxonomy: 'master'} // default master taxonomy name
    }

    /*##################################################################################
                                        Table Functions
    ###################################################################################*/
    
    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: renderFilesTable
    Description: creates the files list table
    Returns: list of files
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    renderFilesTable = () => {
        const table = []
        for (let r = 0; r < Object.keys(this.props.filesList).length; r++) { // for each file in file list
          table.push(
            <tr key = {r} className={"table-row--no-hover" + (this.disabledBtn(r) === true ? " table-row--selected" : "")}>
                <td> 
                    {Object.keys(this.props.filesList)[r] + Object.values(this.props.filesList)[r]} 
                </td>
                <td>
                    {this.disabledBtn(r) ?
                        null
                        :
                        <button className="button blue" onClick={() => this.props.addFile(r)}>
                            <FontAwesomeIcon icon={faPlus}/> &nbsp; 
                            Add
                        </button>
                    }
                    {this.disabledBtn(r) ?
                        <button className="button red" onClick={() => this.props.removeFile(r)}>
                            <FontAwesomeIcon icon={faMinus}/> &nbsp; 
                            Delete
                        </button>
                        :
                        null
                    }
                </td>
            </tr>
          )
        }
        return table;
    }


    /*##################################################################################
                                        Page Functions
    ###################################################################################*/
    
    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: handleChange
    Description: updates when a user types in input box
    Returns: sets in state input, output, or taxonomy name
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: submitInput
    Description: submits the input location
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    submitInput = () => {
        this.props.setInput(this.state.input)
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: submitOutput
    Description: submits the output location
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    submitOutput = () => {
        this.props.setOutput(this.state.output)
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: submitTaxonomy
    Description: submits name of master taxonomy
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    submitTaxonomy = () => {
        this.props.setTaxonomyName(this.state.taxonomy)
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: disabledBtn
    Description: checks if file has been selected
    Returns: returns true if the file has been selected
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    disabledBtn = (r) => {
        if (Object.keys(this.props.filesList)[r] in this.props.selectedFiles){
            return true
        } 
        return false
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: render
    Description: renders the Documents page in pipeline
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="document-wrapper">
                        {this.props.load ? // load or create from a taxonomy
                            <h2 className="document-header">
                                Document Corpus (Load)
                            </h2>
                            :
                            <h2 className="document-header">
                                Document Corpus (Create)
                            </h2>
                        }
                        <div className="document-content-box">
                            <div className="document-content-box--centered">
                                {this.props.load ? // loading from a .csv
                                    <></>
                                    : // creating a new taxonomy
                                    <> &nbsp;
                                        <div className="document-input-box" id="input"> &nbsp;&nbsp;
                                            <input onChange={this.handleChange} name="input" 
                                                placeholder="C:\Users\user\OneDrive\Desktop\boeing-naturallanguageprocessing\Data\Input" size="75"/> &nbsp;&nbsp;&nbsp;
                                            <button className="button" onClick={() => this.submitInput()}>
                                                <FontAwesomeIcon icon={faFolder}/> &nbsp;
                                                Submit Input Location
                                            </button>
                                            <div className="document-location-box">
                                                Input: {this.props.input}
                                            </div>   
                                        </div>
                                        <hr className="hr"/>
                                    </>
                                }
                                {this.props.load ? // loading from a .csv
                                    <> &nbsp;
                                        <div className="document-input-box" id="output">
                                            &nbsp;&nbsp;
                                            <input onChange={this.handleChange} name="output" 
                                                placeholder="C:\Users\user\OneDrive\Desktop\boeing-naturallanguageprocessing\Data\Output" size="75"/> &nbsp;&nbsp;&nbsp;
                                            <button className="button" onClick={() => this.submitOutput()}>
                                                <FontAwesomeIcon icon={faFolder}/> &nbsp;
                                                Submit Output Location
                                            </button>
                                            <div className="document-location-box">
                                                Output: {this.props.output}
                                            </div>
                                        </div>
                                        <hr className="hr"/>
                                        <div className="document-input-box" id="corpus"> &nbsp;&nbsp;
                                            <input onChange={this.handleChange} size="75" name="taxonomy" 
                                                placeholder="Will write over files with the same name"/> &nbsp;&nbsp;&nbsp;
                                            <button className="button" onClick={() => this.submitTaxonomy()}>
                                                <FontAwesomeIcon icon={faFile}/> &nbsp; 
                                                Submit Taxonomy Name: 
                                            </button>
                                            <div className="document-location-box">
                                                Name: {this.props.taxonomy}
                                            </div>
                                        </div>
                                    </>
                                    : // creating a new taxonomy
                                    <>
                                        <div className="document-input-box" id="output"> &nbsp;&nbsp;
                                            <input onChange={this.handleChange} name="output" 
                                                placeholder="C:\Users\user\OneDrive\Desktop\boeing-naturallanguageprocessing\Data\Output" size="75"/> &nbsp;&nbsp;&nbsp;
                                            <button className="button" onClick={() => this.submitOutput()}>
                                                <FontAwesomeIcon icon={faFolder}/> &nbsp; 
                                                Submit Output Location 
                                            </button>
                                            <div className="document-location-box">
                                                Output: {this.props.output}
                                            </div>
                                        </div>
                                        <hr className="hr"/>
                                        <div className="document-input-box" id="corpus"> &nbsp;&nbsp;
                                            <input onChange={this.handleChange} size="75" name="taxonomy" 
                                                placeholder="Files with the same name will be overwritten in output location"/> &nbsp;&nbsp;&nbsp;
                                            <button className="button" onClick={() => this.submitTaxonomy()}> 
                                                <FontAwesomeIcon icon={faFile}/> &nbsp; 
                                                Submit Taxonomy Name: 
                                            </button>
                                            <div className="document-location-box">
                                                Name: {this.props.taxonomy}
                                            </div>
                                        </div>
                                    </>
                                }
                                {this.props.load ? // loading from a .csv
                                    <></>
                                    : // creating a new taxonomy
                                    <>
                                        <hr className="hr"/>
                                        <div id="getFiles"> &nbsp;&nbsp;
                                            <button className="button" onClick={() => this.props.getFiles()}> 
                                                <FontAwesomeIcon icon={faArrowsRotate}/> &nbsp; 
                                                Get Files From Input Folder: 
                                            </button>
                                        </div>
                                        <div className="table-box--documents">
                                            <table className="table table-head"> &nbsp;
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="table-header">
                                                            File
                                                        </th>
                                                        <th className="table-header">
                                                            Add/ Remove
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(this.props.filesList).length === 0 ?
                                                        <tr>
                                                            <td></td>
                                                        </tr>
                                                        : 
                                                        this.renderFilesTable()
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="page-button-box">
                                <button className="button__small" onClick={() => this.props.prevPage()}> 
                                    <FontAwesomeIcon icon={faBackward}/> &nbsp; 
                                    Back 
                                </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="button__small" onClick={() => {this.props.nextPage()}}>
                                    Forward  &nbsp;
                                    <FontAwesomeIcon icon={faForward}/> 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Documents;
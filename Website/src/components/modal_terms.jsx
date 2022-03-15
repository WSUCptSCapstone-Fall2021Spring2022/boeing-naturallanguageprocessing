import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap';  

/*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: 
Description:
Returns:
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/   
class ModalPopup extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {showModal: false};  
    }


    /*##################################################################################
                                        Modal Functions
    ###################################################################################*/
  

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: 
    Description:
    Returns:
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/   
    handleClose = () => {  
        this.props.onPopupClose(false);  
    }  

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: 
    Description:
    Returns:
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/ 
    handleSubmit = () => {
        this.props.confirmSave()
        this.handleClose();
    }

    /*##################################################################################
                                        Table Functions
    ###################################################################################*/
    
    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: 
    Description:
    Returns:
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/   
    renderTable = () => {
        const table = []
        for (let r = 0; r < this.props.sentences['context'].length; r++) {
            for (let t = 0; t<this.props.sentences['context'][r][1].length; t++){
                table.push(
                    <tr key={r} className={"centered weight"}>
                        <td className="table-data">{this.props.sentences['context'].at(r).at(0)}</td>
                        <td className="table-data">{this.props.sentences['context'].at(r).at(1).at(t)}</td>
                    </tr>
                )
            }
        }
        return table
    }


    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: 
    Description:
    Returns:
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/   
    render() {  
        return (  
            this.props.type == "confirm"? 
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose}
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered>  
                    <Modal.Header closeButton>  
                        <Modal.Title id="sign-in-title">  
                            Are you really double dog sure, you want save?
                        </Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body>  
                        <button className="button__small blue" onClick={() => this.handleSubmit()}>
                            Yes!
                        </button> &nbsp;&nbsp;&nbsp;
                        <button className="button__small red" onClick={() => this.handleClose()}>
                            No!
                        </button>
                    </Modal.Body>
                </Modal>  
            </Fragment>: 
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose} onShow={this.handleCreateLoad}
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered>  
                    <Modal.Body>  
                        <div className="centered">{this.props.term} </div>
                        
                        <table className="table table-head">
                            <thead className="table-light">
                                <tr>
                                    <th className="centered table-header">
                                        Location
                                    </th>
                                    <th className="centered table-header">
                                        Sentences
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="table-body--terms">
                                {this.props.sentences == null ?
                                    null 
                                    :
                                    this.renderTable()
                                }
                            </tbody>
                        </table>
                    </Modal.Body>
                </Modal>  
            </Fragment>  
        );  
    }  
}  
  
export default (ModalPopup);
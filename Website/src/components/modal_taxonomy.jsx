import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPlusCircle, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'

class ModalPopup extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            showModal: false,
            edge: "", // Name of relationship
            color: "#000000" // Color of relationship
        };  
    }

    /*##################################################################################
                                        Modal Functions
    ###################################################################################*/

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: isShowModal
    Description: shows or hides modal
    Returns: sets in state modal status
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/    
    isShowModal = (status) => {
        this.handleClose();  
        this.setState({showModal: status}); 
        
    }  

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: handleClose
    Description: closes modal
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/  
    handleClose = () => {  
        this.props.onPopupClose(false, "", this.props.row);  
    }  

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: handleChange
    Description: handles renaming an edge type
    Returns: sets in state edge type name
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    handleChange = (event) => {
        this.setState({edge: event.target.value});
    }
    
    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: handleChangeEdgeColor
    Description: handles changing an edge type color
    Returns: sets in state edge type color
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    handleChangeEdgeColor = (event) => {
        this.setState({color: event.target.value});
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: handleEditLoad
    Description: when editing, loads the current edge type information
    Returns: sets in state original edge type name and color
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    handleEditLoad = () => {
        this.setState({edge: Object.keys(this.props.relationships[this.props.row]).toString(),
            color: Object.values(this.props.relationships[this.props.row]).toString()
        })
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: handleCreateLoad
    Description: when creating a new edge type, set default edge name and color
    Returns: sets in state default edge type name and color
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    handleCreateLoad = () => {
        this.setState({edge: "",
            color: "#000000"})
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: handleAddLoad
    Description: when creating a new edge type, set default edge name and color
    Returns: sets in state default edge type name and color
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    handleAddLoad = () => {
        this.setState({edge: Object.keys(this.props.relationships[0]).toString(),
            color: Object.values(this.props.relationships[0]).toString()})
    }

    /*''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: handleSubmit
    Description: either saves edge types and graph to .csv, creates a new edge type, submits a edge type edit, or creates an edge between 2 nodes
    ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    handleSubmit = () => {
        this.props.type === "confirm" ? // confirm save to .csv
            this.props.confirmSave():
        this.props.type === "createNewEdgeType" ? // Creating a new edge type
            this.props.createRelationship(this.state.color, this.state.edge)
            :
            this.props.type === "editEdgeType" ? // Editing an existing edge type
                this.props.editRelationship(this.state.color, this.state.edge)
                : // Creating a new edge line between 2 nodes
                this.props.addEdge(this.state.color, this.state.edge)

        this.handleClose();
    }

    /*##################################################################################
                                    Relationship Functions
    ###################################################################################*/

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: handleChooseEdge
    Description: when you select an edge type from drop down menu
    Returns: sets in state that edge type color and name
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    handleChooseEdge = (event) => {
        let color;

        for(let i = 0; i < this.props.relationships.length; i++) { // gets the selected edge types name and color from edge type list
            if(Object.keys(this.props.relationships[i]).toString() === event.target.value) {
                color = (Object.values(this.props.relationships[i])).toString()
            }
        }

        this.setState({edge: event.target.value,
            color: color})
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: handleDeleteEdge
    Description: deletes an edge type
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    handleDeleteEdge = () => {
        this.props.deleteRelationship()
        this.handleClose()
    }


    /*##################################################################################
                                        Table Functions
    ###################################################################################*/

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: renderTermTable
    Description: renders the terms found in a node
    Returns: list of terms
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    renderTermTable = () => {
        const table = []

        for (let i = 0; i < Object.keys(this.props.nouns).length; i++){
            table.push(
                <tr key={i} className={"centered weight"}>
                    <td className="table-data">
                        {Object.keys(this.props.nouns)[i]}
                    </td>
                </tr>
            )
        }

        return table
    }


    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: render
    Description: renders modal for Taxonomy page
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    render() {  
        return (  
            this.props.type === "confirm" ? // save confirmation to .csv
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
                </Fragment>
                :
                this.props.type === "nouns" ? // load nouns from a node
                    <Fragment>  
                        <Modal show={this.props.showModalPopup} onHide={this.handleClose} onShow={this.handleCreateLoad}
                            size="lg"  
                            aria-labelledby="contained-modal-title-vcenter"  
                            centered>
                            <Modal.Header closeButton>  
                                <Modal.Title id="sign-in-title">  
                                    {this.props.label}
                                </Modal.Title>  
                            </Modal.Header>  
                            <Modal.Body>  
                                <table className="table table-head">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="centered table-header">
                                                Nouns
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body--taxonomy">
                                        {this.props.nouns === null ? // there are no nouns in node
                                            null 
                                            : // there are nouns in node
                                            this.renderTermTable()
                                        }
                                    </tbody>
                                </table>
                            </Modal.Body>
                        </Modal>  
                    </Fragment>  
                    : 
                    this.props.type === "createNewEdgeType" ? // Creating a new edge type
                        <Fragment>  
                            <Modal show={this.props.showModalPopup} onHide={this.handleClose} onShow={this.handleCreateLoad}
                                size="lg"  
                                aria-labelledby="contained-modal-title-vcenter"  
                                centered>  
                                <Modal.Header closeButton>  
                                    <Modal.Title id="sign-in-title">  
                                        Create a new edge type
                                    </Modal.Title>  
                                </Modal.Header>  
                                <Modal.Body>  
                                <div>
                                    <input type="string" size="95" value={this.state.edge} id='relationshipName' placeholder="Enter a Relationship Name..." onChange={this.handleChange}/> 
                                </div> &nbsp;&nbsp;&nbsp;
                                <div>
                                    <h6>
                                        Choose a color for the edge
                                    </h6>
                                    <input type="color" value={this.state.color} id='relationshipColor' onChange={this.handleChangeEdgeColor}/> &nbsp;&nbsp;&nbsp;
                                </div> &nbsp;&nbsp;&nbsp;
                                <div>
                                    <button className="button__small blue" id='relationshipBtn' onClick={() => this.handleSubmit()}>
                                        <FontAwesomeIcon icon={faPlusCircle}/> &nbsp;
                                        Create
                                    </button>
                                </div> 
                                </Modal.Body>
                            </Modal>  
                        </Fragment>  
                        :
                        this.props.type === "addEdge" ? // Creating a new edge between 2 nodes
                         <Fragment> 
                             <Modal show={this.props.showModalPopup} onHide={this.handleClose} onShow={this.handleAddLoad}
                                 size="lg"  
                                 aria-labelledby="contained-modal-title-vcenter"  
                                 centered>  
                                <Modal.Header closeButton>  
                                    <Modal.Title id="sign-in-title">  
                                        Add Relationship
                                    </Modal.Title>  
                                </Modal.Header>  
                                <Modal.Body>  
                                    <div>
                                        <select value={this.state.edge} onChange={this.handleChooseEdge}>
                                            {this.props.relationships.map((option) => (
                                                <option value={Object.keys(option)}>
                                                    {Object.keys(option)}
                                                </option>)) // Display current options from created relationships
                                            }
                                        </select>
                                    </div> &nbsp;&nbsp;&nbsp;
                                    <div>
                                        <button className="button__small blue" onClick={() => this.handleSubmit()}>
                                            <FontAwesomeIcon icon={faPlus}/> &nbsp;
                                            Add
                                        </button>
                                    </div>
                                </Modal.Body>
                            </Modal>  
                        </Fragment> 
                        : 
                        // this.props.type === "editEdgeType" ? // Editing a edge type
                        <Fragment>   
                            <Modal show={this.props.showModalPopup} onHide={this.handleClose} onShow={this.handleEditLoad}
                                size="lg"  
                                aria-labelledby="contained-modal-title-vcenter"  
                                centered>  
                                <Modal.Header closeButton>  
                                    <Modal.Title id="sign-in-title">  
                                        Edit edge
                                    </Modal.Title>  
                                </Modal.Header>
                                <Modal.Body>  
                                    <div>
                                        <input type="string" size="95" value={this.state.edge} placeholder="New edge name..." onChange={this.handleChange}/> 
                                    </div> &nbsp;&nbsp;&nbsp;
                                    <div>
                                        <h6>
                                            Edit color for the edge
                                        </h6>
                                        <input type="color" value={this.state.color} onChange={this.handleChangeEdgeColor}/>
                                </div> &nbsp;&nbsp;&nbsp;
                                    <div>
                                        <button className="button__small blue" onClick={() => this.handleSubmit()}>
                                            <FontAwesomeIcon icon={faCheck}/> &nbsp;
                                            Enter
                                    </button> &nbsp;&nbsp;&nbsp;
                                        <button className="button__small red" onClick={() => this.handleDeleteEdge()}>
                                            <FontAwesomeIcon icon={faTrash}/> &nbsp;
                                            Delete
                                        </button>
                                    </div>
                                </Modal.Body>
                            </Modal>  
                        </Fragment>  
                            // : // Creating a new edge line between 2 nodes
                            // <Fragment> 
                            //     <Modal show={this.props.showModalPopup} onHide={this.handleClose} 
                            //         size="lg"  
                            //         aria-labelledby="contained-modal-title-vcenter"  
                            //         centered>  
                            //         <Modal.Header closeButton>  
                            //             <Modal.Title id="sign-in-title">  
                            //                 Choose edgedhfddzfgzsg
                            //             </Modal.Title>  
                            //         </Modal.Header>  
                            //         <Modal.Body>  
                            //             <select value={this.state.edge} onChange={this.handleChooseEdge}>
                            //                 {this.props.relationships.map((option) => (
                            //                     <option value={Object.keys(option)}>
                            //                         {Object.keys(option)}
                            //                     </option>)) // Display current options from created relationships
                            //                 }
                            //             </select>
                            //             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            //             <button onClick={() => this.handleSubmit()}>
                            //                 Select
                            //             </button>
                            //         </Modal.Body>
                            //     </Modal>  
                            // </Fragment>  
            );  
    }  
}  
  
export default (ModalPopup);
import React from 'react';
import ModalPopup from './modal_relationship_type';
//import example from '../images/taxonomy_example.png';

import Graph from 'vis-react';

var options = {
    layout: {
        hierarchical: true
    },
    edges: {
        color: '#000000'
    },
    interaction: { multiselect: true, hover: true}
};

class Taxonomy extends React.Component {

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //                       Modal Popup Functions
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // Displays modal popup
    isShowPopup = (status, type) => {  
        this.setState({ showModalPopup: status,
                        type: type});  
    };  

    constructor() {  
        super();  
        this.state = {  
            newID: 0,
            counter: 0,
            relationships: [],
            showModalPopup: false,
            nodes: [],
            type: "",
            graph: {
              nodes: [
                // { id: 1, label: "Node 1", color: "#e04141" },
                // { id: 2, label: "Node 2", color: "#e09c41" },
                // { id: 3, label: "Node 3", color: "#e0df41" },
                // { id: 4, label: "Node 4", color: "#7be041" },
                // { id: 5, label: "Node 5", color: "#41e0c9" }
              ],
              edges: [
                // { from: 1, to: 2 },
                // { from: 1, to: 3 },
                // { from: 2, to: 4 },
                // { from: 2, to: 5 }
              ]
            },
            events: {
              click: ({ nodes, edges }) => {
                  this.setState({nodes: nodes})
              }
            }
        }  
    } 

    componentDidMount() {
        let nodes = []
        let newGraph = {...this.state.graph}
        let counter = this.state.counter

        for (let r = 0; r < Object.keys(this.props.categories).length; r++) {
            counter = counter + 1
            nodes.push({id: counter, label: Object.keys(this.props.categories)[r], color: '#e04141'})
        }

        newGraph.nodes = nodes
        
        this.setState({
            counter: counter,
            graph: newGraph,
            newID: this.state.newID + 1
        })         
    }

    createNode = () => {
        let counter = this.state.counter + 1
        let newNodes = [...this.state.graph.nodes]
        let newGraph = {...this.state.graph}

        newNodes.push({id: counter, label: `Node ${counter}`, color: '#e04141'})

        newGraph.nodes = newNodes

        this.setState({
            counter: counter,
            graph: newGraph,
            newID: this.state.newID + 1
        })         
    }

    createRelationship = (color) => {
        let newEdges = [...this.state.graph.edges]
        let newGraph = {...this.state.graph}

        newEdges.push({from: this.state.nodes[0], to: this.state.nodes[1], color: color, width: 3})

        newGraph.edges = newEdges

        this.setState({
            graph: newGraph,
            newID: this.state.newID + 1,
            nodes: []
        })            
    }

    createRelationshipType = (color, relationship) => {
       let newRelationships = [...this.state.relationships]
       newRelationships.push({[relationship]: color})
       this.setState({relationships: newRelationships})
    }

    renderRelationshipTypes = () => {
        const table = []
        for (let r = 0; r < Object.keys(this.state.relationships).length; r++) {
            table.push(
                <tr key={r} className="centered">
                    <td>
                        {Object.keys(this.state.relationships[r])}
                    </td>
                    <td style={{ color: Object.values(this.state.relationships[r]) }}>
                        {Object.values(this.state.relationships[r])}
                    </td>
                </tr>
            )
        }
        return table;
    }





    render() {
        return (
            <div className = "page">
                <ModalPopup showModalPopup={this.state.showModalPopup}  
                            type={this.state.type}
                            onPopupClose={this.isShowPopup}
                            createRelationshipType = {this.createRelationshipType}
                            createRelationship = {this.createRelationship}
                />
                <div className="pageBox">
                    <div className="categoriesUploadSection">
                        
                        <div className="categoriesLeft">
                            <Graph key={this.state.newID} graph={this.state.graph} options={options} events={this.state.events} style={{ height: "435px" }} />
                        </div>

                        <div className="categoriesCenter">
                            <button className="btn" onClick={() => this.createNode()}>Create New Node</button>

                            {this.state.nodes.length == 2 ?
                                <button className="btn" onClick={() => this.isShowPopup(true, "color")}>Create New Relationship</button>
                                : null
                            }
                            
                            <button className="btn" onClick={() => this.isShowPopup(true, "relationship")}>Create New Relationship Type</button>
                        </div>

                        <div className="categoriesRight">
                            <table className="table table-hover tableBody tl">
                                <thead className="table-light">
                                    <tr>
                                        <th className="cell-align-middle centered tableHeader">Relationship</th>
                                        <th className="cell-align-middle centered tableHeader">Color</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(this.state.relationships).length === 0 ?
                                        <tr>
                                            <td></td>
                                        </tr>
                                        : this.renderRelationshipTypes()
                                    } 
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    <div className="modeBtn">
                                <button className="btn bottom4" onClick={() => this.props.prevPage()}> Back </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Taxonomy
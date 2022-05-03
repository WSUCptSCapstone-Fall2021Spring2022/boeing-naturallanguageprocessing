import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons'

class Load extends React.Component {

    /*''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: render
    Description: renders screen to create a new taxonomy or load from one
    ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="load-wrapper">
                        <h2 className="load-header">
                            Create or Load a Taxonomy
                        </h2>
                        <div className="load-content-box">
                            <div className="load-content-box--centered">
                                <div className="load-input-box">
                                    <button onClick={() => this.props.reset(false)} className="button" id="createBtn">
                                        <FontAwesomeIcon icon={faPlus}/> &nbsp;
                                        Create
                                    </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button onClick={() => this.props.reset(true)} className="button" id="loadBtn">
                                        <FontAwesomeIcon icon={faUpload}/> &nbsp;
                                        Load
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Load;
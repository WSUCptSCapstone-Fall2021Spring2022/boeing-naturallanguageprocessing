import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons'

class Load extends React.Component {
    constructor(props) {
        super(props);
    }
    
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
                            Create/ Load Taxonomy
                        </h2>
                        <div className="load-content-box">
                            <div className="load-content-box--centered">
                                <div className="load-input-box">
                                    <button onClick={() => this.props.loaded(false)} className="button">
                                        <FontAwesomeIcon icon={faPlus}/> &nbsp;
                                        Create a new Taxonomy
                                    </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button onClick={() => this.props.loaded(true)} className="button">
                                        <FontAwesomeIcon icon={faUpload}/> &nbsp;
                                        Load from Taxonomy
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
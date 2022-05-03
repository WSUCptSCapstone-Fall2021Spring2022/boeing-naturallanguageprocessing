import React from 'react';
import ModalPopup from './modal_categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faForward, faFileArrowDown, faAngleRight, faAngleLeft, faRotateRight, faTrash, faPlus, faCircleXmark, faLeftLong, faRightLong } 
    from '@fortawesome/free-solid-svg-icons'

class Categories extends React.Component {
    constructor() {  
        super();  
        this.state = {  
          showModalPopup: false,
          categoryMode: "weight", // mode which changes how terms in categories are dispalyed
          categoryRow: -1, // row of currently selected category
          selectedTerms: [], //  list of selected terms from category
          selectedWeightTerms: [], // list of selected terms from weight dictionary
          pageTerms: 0, // page of weight dictionary
          pageCategory: 0 // pages of categories
        }  
    } 

    /*##################################################################################
                                    Modal Functions
    ###################################################################################*/

    /*''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: isShowPopup
    Description: renders popup modal
    Returns: sets in state popup modal status and the type of modal to display
    ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    isShowPopup = (status, type) => {  
        this.setState({showModalPopup: status,
            type:type
        });  
    };  


    /*##################################################################################
                                        Table Functions
    ###################################################################################*/

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: renderTermsTable
    Description: renders the terms in a table
    Returns: a list of terms
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    renderTermsTable = () => {
        const table = []
        if ((this.state.pageTerms * 100) + 100 > Object.keys(this.props.termsDictionary).length) { // there are less than 100 terms in weights dictionary
            for (let r = this.state.pageTerms * 100; r < Object.keys(this.props.termsDictionary).length; r++) { // pagination, render only 100 terms
                if(!this.props.termsDictionary[Object.keys(this.props.termsDictionary)[r]].category){
                    table.push(
                        <tr key = {r} className={"table-row" + (this.checkSelectedWeight(r) === true ? " table-row--selected" : "")}
                            onClick={() => (this.checkSelectedWeight(r) ? this.removeSelectedWeightTerm(r) : this.selectWeightTerm(r))}>
                            <td>
                                {Object.keys(this.props.termsDictionary)[r]}
                            </td>
                            <td>
                                {Object.values(this.props.termsDictionary)[r].frequency}
                            </td>
                            <td>
                                {Object.values(this.props.termsDictionary)[r].weight}
                            </td>
                        </tr>
                    )
                }
            }
        } else { // there are more than 100 terms in weights dictionary
            for (let r = this.state.pageTerms * 100; r < (this.state.pageTerms * 100) + 100; r++) { // pagination, render only 100 terms
                if(!this.props.termsDictionary[Object.keys(this.props.termsDictionary)[r]].category){
                    table.push(
                        <tr key = {r} className={"table-row" + (this.checkSelectedWeight(r) === true ? " table-row--selected" : "")}
                            onClick={() => (this.checkSelectedWeight(r) ? this.removeSelectedWeightTerm(r) : this.selectWeightTerm(r))}>
                            <td>
                                {Object.keys(this.props.termsDictionary)[r]}
                            </td>
                            <td>
                                {Object.values(this.props.termsDictionary)[r].frequency}
                            </td>
                            <td>
                                {Object.values(this.props.termsDictionary)[r].weight}
                            </td>
                        </tr>
                    )
                }
            }
        }
        return table;
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: renderCategoriesTable
    Description: renders the categories table
    Returns: a list of categories
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    renderCategoriesTable = () => {
        const table = []
        if ((this.state.pageCategory * 10) + 10 > Object.keys(this.props.categories).length) { // there are less than 10 categories
            for (let r = this.state.pageCategory * 10; r < Object.keys(this.props.categories).length; r++) { // pagination, render only 10 categories
                table.push(
                    <tr onClick={() => this.changeMode(r)} className="table-row" key={r}>
                        <td>
                            {Object.keys(this.props.categories)[r]}
                        </td>
                        <td>
                            <div className="table-data--categories">
                                {this.renderCategoryTerms(r)}
                            </div>
                        </td>
                    </tr>
                )
            }
        } else { // there are more than 10 categories
            for (let r = this.state.pageCategory * 10; r < (this.state.pageCategory * 10) + 10; r++) { // pagination, render only 10 categories
                table.push(
                    <tr onClick={() => this.changeMode(r)} className="table-row" key={r}>
                        <td>
                            {Object.keys(this.props.categories)[r]}
                        </td>
                        <td>
                            <div className="table-data--categories">
                                {this.renderCategoryTerms(r)}
                            </div>
                        </td>
                    </tr>
                )
            }
        }
        return table;
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: renderCategoryTerms
    Description: renders the terms in each category
    Returns: list of terms
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    renderCategoryTerms = (r) => {
        const Terms = [];

        if (this.state.categoryRow === -1) { // rendering terms in categories when no category is selected
            for (let d = 0; d < Object.values(Object.values(this.props.categories)[r]).length; d++) {
                Terms.push(<div className="table-data--categories__terms"> {Object.keys(Object.values(this.props.categories)[r])[d]} </div>)
            }
        } else { // rendering terms in category when a category is selected
            for (let d = 0; d < Object.values(Object.values(this.props.categories)[r]).length; d++) {
                Terms.push(
                    <button className={"table-data--categories__terms__inside" + (this.checkSelected(r, d) === true ? " table-data--categories__terms__inside--selected": "")}
                        onClick={ () => (this.checkSelected(r, d) === false ? this.selectTerm(r, d) : this.removeSelectedTerm(r, d)) }> 
                        {Object.keys(Object.values(this.props.categories)[r])[d]} 
                    </button>
                )
            }
        }
        return Terms
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: renderTermTable
    Description: renders the terms in categories
    Returns: list of terms
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    renderTermTable = () => {
        const table = []

        table.push(
            <tr className="table-row--no-hover" key={0}>
                <td>
                    <div>
                        {this.renderCategoryTerms(this.state.categoryRow)}
                    </div>
                </td>
            </tr>
        )
        return table;
    }


    /*##################################################################################
                                    Select Functions
    ###################################################################################*/

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: selectWeightTerm
    Description: selects term from weight category
    Returns: sets seleted terms in state
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    selectWeightTerm = (row) => {
        let selectedWeightTerms = this.state.selectedWeightTerms
        selectedWeightTerms.push(row.toString())

        this.setState({selectedWeightTerms: selectedWeightTerms})
    }

    /*''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: checkSelectedWeight
    Description: checks if the term has been selected in the weight dictionary
    Returns: true if the row has been selected
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    checkSelectedWeight = (row) => {
        if (this.state.selectedWeightTerms.includes(row.toString())) {
            return true
        }
        return false
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: removeSelectedWeightTerm
    Description: removes a selected term from the selected weight terms
    Returns: sets in state new selected weight terms
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    removeSelectedWeightTerm = (row) => {
        let selectedWeightTerms = this.state.selectedWeightTerms

        for (let i = 0; i < this.state.selectedWeightTerms.length; i++) {
            if (this.state.selectedWeightTerms[i] === row.toString()) {
                if (i === 0) {
                    selectedWeightTerms.shift()
                } else {
                    selectedWeightTerms.splice(i, 1)
                }
            }
        }
        this.setState({selectedWeightTerms: selectedWeightTerms})
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: selectTerm
    Description: selects a term from category when the category is selected
    Returns: sets new selected terms in state
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    selectTerm = (categoryIndex, termIndex) => {
        let newSelectedTerms = this.state.selectedTerms

        newSelectedTerms.push(categoryIndex.toString() + termIndex.toString())
        this.setState({selectedTerms: newSelectedTerms})
    }

    /*''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: removeSelectedTerm
    Description: unselected a term from a category when the category is selected
    Returns: sets new selected terms in state
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    removeSelectedTerm = (categoryIndex, termIndex) => {
        let newSelectedTerms = this.state.selectedTerms

        for (let x = 0; x < this.state.selectedTerms.length; x++) { // for each term in selected terms
            if (this.state.selectedTerms[x] === categoryIndex.toString() + termIndex.toString()) { // the selected term is the same as the term we are deselecting
                if (x === 0) { // the selected terms list is empty
                    newSelectedTerms.shift()
                } else { // the selected terms list is not empty
                    newSelectedTerms.splice(x, 1)
                }
            }
        }
        this.setState({selectedTerms: newSelectedTerms})
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: checkSelected
    Description: when a category is selected, checks if the term is selected
    Returns: true if the term is selected
    ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    checkSelected = (categoryIndex, termIndex) => {
        if (this.state.selectedTerms.includes(categoryIndex.toString() + termIndex.toString())) {
            return true
        }
        return false
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: clearSelected
    Description: clears selected terms and selected weight terms
    Returns: sets empty lists in state
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    clearSelected = () => {
        this.setState({selectedTerms: [],
            selectedWeightTerms: []})
    }


    /*##################################################################################
                                    Page Functions
    ###################################################################################*/

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: changeMode
    Description: switches mode if a category has been selected
    Returns: sets mode in state
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    changeMode = (row) => {
        if (this.state.categoryMode === "weight") { // category has not been selected
            this.setState({categoryMode: "category",
                categoryRow: row})
        } else { // category has been selected
            this.setState({categoryMode: "weight",
                categoryRow: row})
        }
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: pageTerms
    Description: switches between pages for weight dictionary
    Returns: sets page in state
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    pageTerms = (direction) => {
        if (direction === 'next') { // next page
            this.setState({pageTerms: this.state.pageTerms + 1})
        } else { // previous page
            this.setState({pageTerms: this.state.pageTerms - 1})
        }
    }

    
    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: pageCategory
    Description: switches between pages for categories
    Returns: sets page in state
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    pageCategory = (direction) => {
        if (direction === 'next') { // next page
            this.setState({pageCategory: this.state.pageCategory + 1})
        } else { // previous page
            this.setState({pageCategory: this.state.pageCategory - 1})
        }
    }


    /*##################################################################################
                               Weights/ Category Functions
    ###################################################################################*/

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: deleteFromCategory
    Description: deletes selected terms from a category and puts them back into the weight dictionary
    Returns: sets a empty list in selected terms state
    ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    deleteFromCategory = () => {
        this.props.deleteFromCategory(this.state.selectedTerms)
        this.setState({selectedTerms: []})
    }

    /*''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: addToCategory
    Description: adds a term into a category and removes it from weight dictionary
    Returns: sets a empty list in selected weight terms state
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    addToCategory = () => {
        this.props.addToCategory(this.state.selectedWeightTerms, this.state.categoryRow)
        this.setState({selectedWeightTerms: []})
    }

    /*''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: deleteCat
    Description: deletes a category and puts all the terms from that category back into weight dictionary
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    deleteCat = () => {
        this.props.deleteCategory(this.state.categoryRow)
        this.changeMode(-1) // unselects category and goes back to weight dictionary mode
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: saveCategories
    Description: opens popup to confirm saving categories
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    saveCategories = () => {
        this.isShowPopup(true, "confirm")
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: confirmSave
    Description: saves the categories to master .csv
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    confirmSave = () => {
        this.props.saveCategories(this.state.categories)
    }

    /*'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Function: render
    Description: renders Categories page from pipeline
    '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/
    render() {
        return (
            <div className="section">
                <div className="container">
                    <div className="categories-wrapper">
                        <ModalPopup showModalPopup={this.state.showModalPopup}  
                            confirmSave={this.confirmSave}
                            type={this.state.type}
                            onPopupClose={this.isShowPopup}
                            createCategory={this.props.createCategory}
                            categories={this.props.categories}
                        />
                        <h2 className="categories-header">
                            Category Creation
                        </h2>
                        <div className="categories-content-box">
                            <div className="categories-terms-box">
                                <div className="categories-terms-box--left">
                                    <h1 className="centered">
                                        Terms
                                    </h1>
                                    <h6 className="centered">
                                        Select terms to move to category
                                    </h6>
                                    <div className="table-box--categories">
                                        <table className="table table-head">
                                            <thead className="table-light">
                                                <tr>
                                                    <th className="table-header">
                                                        Noun
                                                    </th>
                                                    <th className="table-header">
                                                        Frequency
                                                    </th>
                                                    <th className="table-header">
                                                        Weight
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(this.props.termsDictionary).length === 0 ? // weight dictionary is empty
                                                    <tr>
                                                        <td></td>
                                                    </tr>
                                                    : // weight dictionary is not empty
                                                    this.renderTermsTable()
                                                } 
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="categories-button-box">
                                        <div className="categories-input-box">
                                            {this.state.pageTerms === 0 ? // at page 0
                                                <button className="button__small--disabled" disabled={true} onClick={() => this.pageTerms('pervious')}>
                                                    <FontAwesomeIcon icon={faAngleLeft}/> &nbsp;
                                                    Previous:
                                                </button>
                                                : // page is not at 0
                                                <button className="button__small" onClick={() => this.pageTerms('pervious')}>
                                                    <FontAwesomeIcon icon={faAngleLeft}/> &nbsp;
                                                    Previous:
                                                </button>
                                            } &nbsp;&nbsp;&nbsp;
                                            {this.state.pageTerms} &nbsp;&nbsp;&nbsp;
                                            {(this.state.pageTerms * 100) + 100 <  Object.keys(this.props.termsDictionary).length ? // there are still more terms to page through
                                                <button className="button__small" onClick={() => this.pageTerms('next')}>
                                                    Next: &nbsp; 
                                                    <FontAwesomeIcon icon={faAngleRight}/>
                                                </button> 
                                                : // there are no more terms to page through
                                                <button className="button__small--disabled" disabled={true} onClick={() => this.pageTerms('next')}>
                                                    Next: &nbsp;
                                                    <FontAwesomeIcon icon={faAngleRight}/>
                                                </button>
                                            }
                                        </div>   
                                    </div>
                                </div>
                                <div className="categories-terms-box--center" id="categoryControls">
                                    <h6 className="categories-sub-header centered">
                                        Edit Categories
                                    </h6> &nbsp;
                                    <div className="categories-input-box">
                                        {this.state.categoryRow === -1 ? // category has not been selected
                                            <button className="button categories__buttons" id='createCategory' onClick={() => this.isShowPopup(true,"")}>
                                                <FontAwesomeIcon icon={faPlus}/> &nbsp; 
                                                Create New Category
                                            </button> 
                                            : // category has been selected
                                            <button className="button categories__buttons" onClick={() => this.changeMode(-1)}>
                                                <FontAwesomeIcon icon={faCircleXmark}/> &nbsp; 
                                                Exit Category
                                            </button>
                                        }
                                        &nbsp;
                                        {this.state.categoryRow === -1 ?  // category has not been selected
                                            null 
                                            : // category has been selected
                                            <button className="button categories__buttons red" id='deleteCategory' onClick={() => this.deleteCat()}>
                                                <FontAwesomeIcon icon={faTrash}/> &nbsp; 
                                                Delete Category
                                            </button>
                                        } &nbsp;
                                        {this.state.categoryRow === -1 ? // category has not been selected
                                            null 
                                            : // category has been selected
                                            this.state.selectedTerms.length === 0 ? // term in category has not been selected
                                                <button disabled={true} onClick={() => this.deleteFromCategory()} className="button--disabled categories__buttons">
                                                    <FontAwesomeIcon icon={faLeftLong}/>
                                                </button> 
                                                :
                                                <button onClick={() => this.deleteFromCategory()} className="button categories__buttons">
                                                    <FontAwesomeIcon icon={faLeftLong}/>
                                                </button>
                                        }
                                        &nbsp;
                                        {this.state.categoryRow === -1 ? // category has not been selected
                                            null 
                                            : // category has been selected
                                            this.state.selectedWeightTerms.length === 0 ? // term in category has not been selected
                                                <button disabled={true} className="button--disabled categories__buttons" onClick={() => this.addToCategory()}>
                                                    <FontAwesomeIcon icon={faRightLong}/>
                                                </button> 
                                                : // terms in category have been selected
                                                <button className="button categories__buttons" onClick={() => this.addToCategory()}>
                                                    <FontAwesomeIcon icon={faRightLong}/>
                                                </button>
                                        }
                                        &nbsp;
                                        {this.state.selectedWeightTerms.length !== 0 || this.state.selectedTerms.length !== 0 ? // there are terms selected
                                            <button className="button categories__buttons" onClick={() => this.clearSelected()}>
                                                <FontAwesomeIcon icon={faRotateRight}/> &nbsp; 
                                                Clear Selected
                                            </button> 
                                            : // no terms have been selected
                                            <button disabled={true} className="button--disabled categories__buttons" onClick={() => this.clearSelected()}>
                                                <FontAwesomeIcon icon={faRotateRight}/> &nbsp; 
                                                Clear Selected
                                            </button>
                                        }
                                        &nbsp;
                                        {this.state.categoryRow === -1  ? // category has not been selected
                                            <button className="button categories__buttons" onClick={() => this.saveCategories()}>
                                                <FontAwesomeIcon icon={faFileArrowDown}/> &nbsp; 
                                                Save Categories
                                            </button> 
                                            : // category has been selected
                                            null
                                        }
                                    </div>
                                </div>
                                    {this.state.categoryMode === "weight" ? // in weight dictionary mode (category has not been selected)
                                        <div className="categories-terms-box--right">
                                            <h1 className="categories-sub-header centered">
                                                Categories
                                            </h1>
                                            <h6 className="categories-sub-header centered">
                                                Select a category to edit
                                            </h6>
                                            <div className="table-box--categories">
                                                <table className="table table-head">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th className="table-header">
                                                                Category
                                                            </th>
                                                            <th className="table-header">
                                                                Terms
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Object.keys(this.props.categories).length === 0 ? // there are no categories created
                                                            <tr>
                                                                <td></td>
                                                            </tr>
                                                            : // there are categories created
                                                            this.renderCategoriesTable()
                                                        } 
                                                    </tbody>
                                                </table> 
                                            </div>
                                            <div className="categories-button-box">
                                                <div className="categories-input-box">
                                                    {this.state.pageCategory === 0 ? // page 0
                                                        <button className="button__small--disabled" disabled={true} onClick={() => this.pageCategory('pervious')}>
                                                            <FontAwesomeIcon icon={faAngleLeft}/> &nbsp;
                                                            Previous:
                                                        </button>
                                                        : // page not at 0
                                                        <button className="button__small" onClick={() => this.pageCategory('pervious')}>
                                                            <FontAwesomeIcon icon={faAngleLeft}/> &nbsp;
                                                            Previous:
                                                        </button>
                                                    } &nbsp;&nbsp;&nbsp;
                                                    {this.state.pageCategory} &nbsp;&nbsp;&nbsp;
                                                    {(this.state.pageCategory * 100) + 100 <  Object.keys(this.props.categories).length ? // there are still more categories to page through
                                                        <button className="button__small" onClick={() => this.pageCategory('next')}>
                                                            Next: &nbsp;
                                                            <FontAwesomeIcon icon={faAngleRight}/>
                                                        </button> 
                                                        : // there are not more categories to page through
                                                        <button className="button__small--disabled" disabled={true} onClick={() => this.pageCategory('next')}>
                                                            Next: &nbsp;
                                                            <FontAwesomeIcon icon={faAngleRight}/>
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        : // category has been selected
                                        <div className="categories-terms-box--right">
                                            <h1 className="categories-sub-header centered">
                                                {Object.keys(this.props.categories)[this.state.categoryRow]}
                                            </h1>
                                            <h6 className="categories-sub-header centered">
                                                Select terms to remove from category
                                            </h6>
                                            <div className="table-box--categories">
                                                <table className="table table-head">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th className="table-header">
                                                                    Terms
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.keys(this.props.categories).length === 0 ? // there are not categories created
                                                                <tr>
                                                                    <td>
                                                                    </td>
                                                                </tr>
                                                                : // there are categories created
                                                                this.renderTermTable()
                                                            } 
                                                        </tbody>
                                                </table> 
                                            </div>
                                        </div>
                                    }
                            </div>
                            <div className="page-button-box">
                                <button className="button__small" onClick={() => this.props.prevPage()}>
                                    <FontAwesomeIcon icon={faBackward}/> &nbsp;
                                    Back
                                </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="button__small" onClick={() => this.props.nextPage()}>
                                    Forward &nbsp;
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

export default Categories;
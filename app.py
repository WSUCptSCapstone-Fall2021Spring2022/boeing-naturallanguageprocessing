from Parser import main as parser
from Taxonomy import extraction
from tests import unit_tests
from flask import Flask
from flask import request
from Taxonomy import categories

# from tkinter import Tk
# from tkinter import filedialog

'''''''''''''''''''''''''''''''''''''''''''''''''''
Function: main
Description: main, runs all functions
Parameters:
Returns:
'''''''''''''''''''''''''''''''''''''''''''''''''''
# def main():
#     # STEP 1: Run parser and extract terms from documents
#     parser.parse()

#     # STEP 2: Find frequencies and weights of terms
#     parsed_terms = extraction.find_frequencies_and_weights()
#     print(parsed_terms)

#     unit_tests.test_accuracy()


# if __name__ == "__main__":
#     main()

app = Flask(__name__)

# @app.route('/path1')
# def path1():
#     print("HERE")
#     return "HELLO WORLD!"

#################################################################################################
# Function: Parse
# Direction: Bac to Front
# Returns: all the nouns and send to front end
#################################################################################################
@app.route('/parse', methods = ['POST'])
def parse():
    #json = {'time' : "HERE"}
    location = request.get_json(force=True)
    print(location)
    print(list(location.values())[0])
    total_nouns = parser.parse(list(location.values())[0], list(location.values())[1])
    return total_nouns
    #selectFolder()

#################################################################################################
# Function: Weights
# Direction: Bac to Front
# Returns: all the weights, freq and noun data as dict and sends to front end
#################################################################################################
@app.route('/weights', methods = ['POST'])
def weights():
    location = request.get_json(force=True)
    print(location)
    return extraction.find_frequencies_and_weights(list(location.values())[0])

# @app.route('/folder')
# def folder():
#     #Tk().withdraw() # we don't want a full GUI, so keep the root window from appearing
#     #dir = filedialog.askdirectory()
#     return {'directory': dir}

#################################################################################################
# Function: category
# Direction: Front to Back to front
# Returns: Helps to create the categories themselves
#################################################################################################
@app.route('/category', methods = ['POST'])
def category():
    category = request.get_json(force=True)
    print(category)
    #return categories.receive_categories(category)
    return {category["Category"]: {}}

#################################################################################################
# Function: saveCategories
# Direction: Front to Back
# Returns: Retrieves dictionary of all the terms and cats and sends to method 
#################################################################################################
@app.route('/saveCategories', methods = ['POST'])
def saveCategories():
    inputInfo = request.get_json(force=True)
    #print(inputInfo['input'])
    #print(inputInfo['data'])

    #retrieves file location
    folder = inputInfo['input']

    #retrieves category dictionary from the front end
    categoryDict = inputInfo['data']

    #Send to the csv writer
    categories.receive_categories(folder, categoryDict)

    return inputInfo
    #return categories.receive_categories(inputInfo)
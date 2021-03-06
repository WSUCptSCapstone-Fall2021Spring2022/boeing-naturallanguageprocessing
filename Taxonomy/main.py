from Taxonomy import weights
from Taxonomy import categories
from Taxonomy import relationships

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: main
Description: all taxonomy functions will be called from here
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: get_weight_dictionary
Description: creates a weights dictionary for given files in output location
Returns: {term: {frequency, weight}}
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def get_weight_dictionary(output, files):
    return weights.create_weight_dictionary(output, files)


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: save_categories
Description: writes categories into main corpus .csv
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def write_categories(output, corpus, category):
    taxDict = categories.create_taxonomy_dictionary(category)
    categories.write_to_csv(output, corpus, taxDict)


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: write_relationships
Description: writes relationships into main corpus .json file
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def write_relationships(output, corpus, graph, relationship):
    relationships.write_to_json(output, corpus, graph, relationship)
import csv

'''
File Task:
Input: Categories and their terms:weights s.a. 
{categories:{terms:weights}}
Output: CSV file with the following:
Category    Cat_Weight      Terms or Terms:Weights

Big Questions:
# 1) What will the input data structure actually be?
# 2) Must we retain term weights
'''

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Method: receive_categories(input, output?)
Input: Categories and their terms:weights s.a. 
{categories:{terms:weights}}
Output: None
Description: 
A master method that:
1) Takes input dictionary and passes into a calculation helper
2) The taxonomy calculator will return one of the following:
    Tax weight itself
    {Category:Weight}:[Terms]
Then passes result to tax_writer
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def receive_categories(input, output):
    #taxDict={}
   # taxDict=process_taxonomy(input)
   # taxonomy_writer(taxDict,output)
    pass


'''
Method: calculate_taxonomy
Input: {categories:{terms:weights}}
Output: {Category:Weight}:[Terms]
Description:
'''
def process_taxonomy(input):
    pass

'''
Method: calculate_taxonomy
Input: categories:{terms:weights}
Output: taxWeight
Description: adds up the category weight of each term
'''
def calculate_taxonomy(input):
    pass

'''
Method: taxonomy_writer
Input: {Category:Weight}:[Terms]
Output: A CSV file with: 
Description: 
'''
def taxonomy_writer(input, output):
    pass
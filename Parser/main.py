import time as Time
from pathlib import Path
from Parser import noun as Noun
from Parser import Spacy
from Parser import text_factory
from Data import main as Data
import multiprocessing

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: main
Description: all the parser functions will be called from here
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
outDir = None
nounData = {}


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: initializer
Description: initializes paramaters for use of single_parse in multiprocess.Pool
Returns: 
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def initializer(output):
    global outDir
    outDir = output


#########################################################
#                  Parser Functions
#########################################################

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: parse_sync
Description: runs parser on given files from input location synchronously
Returns: all terms found and number of occurences of each term
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def parse_sync(input, output, files):
    folder = Path(input)
    totalNouns = {}
    global outDir
    outDir = output

    for filePath in folder.iterdir():
        if filePath.stem in files:
            nouns = single_parse(filePath)
            for noun in nouns:
                totalNouns.__setitem__(noun.text, noun.occurances)

    return (totalNouns)


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: single_parse
Description: runs parser on a single file from input location
Returns: terms found and number of occurences of each term
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def single_parse(filePath):
    print('parsing ' + filePath.name)
    startTime = Time.time()

    fileText = text_factory.get_text(filePath)
    terms = Spacy.get_terms(fileText) # gets nouns and noun phrases from each file's text

    elapsedTime = Time.time() - startTime
    totalTimeStr = "Total time: " + str(round(elapsedTime, 3)) + " sec"
    print('finished parsing ' + filePath.name)
    print(totalTimeStr)

    uniqueNouns = len(terms)
    totalNouns = Noun.get_total_nouns(terms)

    costPerNoun = 0 if totalNouns == 0 else (elapsedTime * 1000) / totalNouns
    costPerNounStr = "Cost per noun: " + str(round(costPerNoun, 3)) + " ms"
    

    Data.parser_to_csv(totalTimeStr, costPerNounStr, terms, uniqueNouns, totalNouns, filePath, outDir)

    return terms
        


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: parse
Description: runs parser on given files from input location asynchronously
Returns: all terms found and number of occurences of each term
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def parse(input, output, files):
    print('starting process pool')
    folder = Path(input)
    global outDir
    outDir = output
    total_nouns = {}
    folder = [file for file in folder.iterdir() if file.stem in files]
    with multiprocessing.Pool(5, initializer, [output]) as p: # limit number of processes to 5
        results = p.map(single_parse, folder)
        for doc in results:
            for noun in doc:
                total_nouns.__setitem__(noun.text, noun.occurances)
    return (total_nouns)


# # FOR TESTING ONLY
# if __name__ == "__main__":
#     start = Time.time()
#     # parse("./Parser/data", "./Parser/output", [])
#     parseAll("./Data/Input/Games", "./Data/Output", ['test_paragraph'])
#     print("***total time = {}".format(Time.time() - start))
import pdfplumber
from Parser import text_replacer

'''''''''''''''''''''''''''''''''''''''''''''''''''
Function: get_text
Description: gets text from .pdf
Returns: text from .pdf
'''''''''''''''''''''''''''''''''''''''''''''''''''
def get_text(filePath):
    file = open_file(filePath)
    fileText = extract_pdf_text(file)
    return fileText


'''''''''''''''''''''''''''''''''''''''''''''''''''
Function: openFile
Description: opens .pdf using pdfplumber
Returns: .pdf object
'''''''''''''''''''''''''''''''''''''''''''''''''''
def open_file(filePath):
    if not filePath.exists():
        print("File " + filePath.name + " does not exist. Exiting...")
        return 0
    elif not filePath.suffix == ".pdf":
        print("File " + filePath.name + " is not a pdf. Exiting...")
        return 0

    file = pdfplumber.open(filePath)
    return file


'''''''''''''''''''''''''''''''''''''''''''''''''''
function: extract_pdf_text
description: extracts the text from the pdf
returns: List containing text
'''''''''''''''''''''''''''''''''''''''''''''''''''
def extract_pdf_text(file):
    fileText = []
    for page in file.pages:
        if (page.extract_text() != None):  # page is not empty (ex. full page image)
            text = page.extract_text().encode('utf-8')
            text = str(text)
            text = text_replacer.replace_text(text[:-1])
            fileText.append(text)
    return fileText
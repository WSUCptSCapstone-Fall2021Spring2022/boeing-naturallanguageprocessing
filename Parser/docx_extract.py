import docx
from Parser import text_replacer

'''''''''''''''''''''''''''''''''''''''''''''''''''
Function: get_text
Description: gets text from .docx
Returns: text from .docx
'''''''''''''''''''''''''''''''''''''''''''''''''''
def get_text(filePath):
    file = open_file(filePath)
    fileText = extract_docx_text(file)
    return fileText


'''''''''''''''''''''''''''''''''''''''''''''''''''
Function: open_file
Description: Opens the .doc
Returns: .doc object
'''''''''''''''''''''''''''''''''''''''''''''''''''
def open_file(filePath):
    if not filePath.exists():
        print("File " + filePath.name + " does not exist. Exiting...")
        return 0
    elif not filePath.suffix == ".docx":
        print("File " + filePath.name + " is not a doc. Exiting...")
        return 0

    file = docx.Document(filePath)
    return file


'''''''''''''''''''''''''''''''''''''''''''''''''''
Function: extract_docx_text
Description: Gets the text from .docx file
Returns: list of text
'''''''''''''''''''''''''''''''''''''''''''''''''''
def extract_docx_text(file):
    fileText = []
    for paragraph in file.paragraphs:
        text = paragraph.text.encode('utf-8')
        text = str(text)
        text = text_replacer.replace_text(text[:-1])
        fileText.append(text)
    return fileText
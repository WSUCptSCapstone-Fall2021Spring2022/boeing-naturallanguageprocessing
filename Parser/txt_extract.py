from Parser import text_replacer

'''''''''''''''''''''''''''''''''''''''''''''''''''
Function: get_text
Description: gets text from .txt
Returns: text from .txt
'''''''''''''''''''''''''''''''''''''''''''''''''''
def get_text(filePath):
    file = open_file(filePath)
    if file:
        fileText = extract_txt_text(file)
        return fileText
    return 0

    
'''''''''''''''''''''''''''''''''''''''''''''''''''
Function: open_file
Description: opens the .txt
Returns: .txt object
'''''''''''''''''''''''''''''''''''''''''''''''''''
def open_file(filePath):
    if not filePath:
        return 0
    if not filePath.exists():
        print("File " + filePath.name + " does not exist. Exiting...")
        return 0
    elif not filePath.suffix == ".txt":
        print("File " + filePath.name + " is not a txt. Exiting...")
        return 0

    file = open(filePath, encoding="utf-8")
    return file


'''''''''''''''''''''''''''''''''''''''''''''''''''
Function: extract_txt_text
Description: extracts text from .txt
Returns: List containing text
'''''''''''''''''''''''''''''''''''''''''''''''''''
def extract_txt_text(file):
    fileText = []
    for line in file:
        text = line.encode('utf-8')
        text = str(text)
        text = text_replacer.replace_text(text)
        fileText.append(text[:-1])
    return fileText


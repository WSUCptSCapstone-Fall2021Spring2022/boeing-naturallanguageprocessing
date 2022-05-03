from Parser import noun as Noun
import re
import spacy
from Parser import text_replacer

'''''''''''''''''''''''''''''''''''''''''''''''''''
Function: get_terms
Description: gets nouns and noun phrases from text
Returns: list of noun objects [noun, sentence]
'''''''''''''''''''''''''''''''''''''''''''''''''''
def get_terms(fileText):
    sentences = get_sentences(fileText)
    terms = get_nouns(sentences)
    return terms


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: get_sentences
Description: gets sentences from text
Returns: a list of the Span objects from the Spacy library, representing each sentence
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def get_sentences(text):
    sentences = ""
    nlp = spacy.load('en_core_web_sm')
    for page in text:
        textCleaned = re.sub(' +', ' ', page) # removes extra spaces
        sentences += textCleaned
    sentences = nlp(sentences) # converts sentences into NLP span objects
    sentences = list(sentences.sents) # converts span objects into a list of span objects
    return sentences


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: get_nouns
Description: gets nouns and noun phrases and the sentences they belong to
Returns: a list of noun objects 
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def get_nouns(sentences):
    nouns = []
    nlp = spacy.load('en_core_web_sm')
    for sentence in sentences:
        foundDash = False
        foundSlash = False
        sentenceCleaned = nlp(sentence.text) # creates nlp object from sentence
        for chunk in sentenceCleaned.noun_chunks:
            nounChunk = ""
            found = False
            for token in chunk:
                if token.pos_ != 'PRON':
                    noun, foundDash, foundSlash = text_replacer.token_replacer(token, foundDash, foundSlash) # removes extra spaces in front and behind of dash or slash
                    nounChunk += noun
            nounChunkCleaned = nounChunk.lstrip().rstrip() # removes extra spaces
            for noun in nouns:
                if nounChunkCleaned == noun.text: # chunk is already in total_nouns
                    noun.add_occurance(sentence.text) # add new sentence to noun object
                    found = True
                    break
            if not found and nounChunkCleaned != "":
                newNoun = Noun.Noun(nounChunkCleaned.lower(), sentence.text) # create a new noun object
                nouns.append(newNoun)
    return nouns
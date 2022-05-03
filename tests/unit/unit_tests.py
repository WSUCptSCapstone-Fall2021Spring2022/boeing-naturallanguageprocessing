from Parser import Spacy
# from Parser import output_writers
from Parser import text_factory
import os
from pathlib import Path
import time

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: unit_tests
Description:
Returns:
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
test_data = Path('tests/test_data')
output = Path('Parser/output')
# TODO: make multiple dicionaries with varying sizes, counts and punctuation
tsd1 = {"the queen": 1, "england": 1, "buckingham palace": 1,
        "some stock": 1, "the painting": 1, "something": 1, "we": 1, "our difference": 1,
        "30 jacket": 1, "the golden age": 1, "many country": 1, "war": 1, "mask": 1,
        "this big snake": 1}


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: 
Description:
Returns:
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def test_sentence_no_punc():
    pass


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: 
Description:
Returns:
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# def test_blank_pdf():
#     docInfo, total_nouns, total_sentences = parsers.run_parsers(
#         test_data / 'blank_pdf.pdf')
#     csv_name = output_writers.to_csv(
#         docInfo, 'totalTimeStr', 'costPerNounStr', total_nouns, 0, 0, test_data / 'blank_pdf.pdf')
#     outfile = output / csv_name
#     assert len(total_nouns) == 0
#     assert outfile.exists() == True
#     os.remove(outfile)  # cleanup


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: 
Description:
Returns:
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def test_accuracy(file, check):
    text = text_factory.get_text(test_data / file)
    total_nouns = Spacy.get_terms(text)
    correct_counts = 0
    extra_counts = 0
    d = {}
    print("---------------------------------------------------------")
    print("Expected:")
    print("---------------------------------------------------------\n")
    {print(x, ", ", check[x]) for x in check}
    print("\n---------------------------------------------------------")
    for noun in total_nouns:
        d[noun.text] = noun.occurances
        if(noun.text in check):
            correct_counts += 1
        else:
            extra_counts += 1
    print("Actual:")
    print("---------------------------------------------------------\n")
    {print(noun, ", ", occur) for noun, occur, in d.items()}
    print("\n---------------------------------------------------------\n")
    print(str(correct_counts) + '/' + str(len(check)) + " Terms Found")
    print(str(extra_counts) + " False Positives")
    print(str(sum(check.values())) + " Expected Occur")
    print(str(sum(d.values())) + " Actual Occur")
    # print("Total accuracy = " + str(round(correct_counts / sum(d.values()), 2) * 100))

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: 
Description: 
Returns:
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def test_speed(file):
    start = time.time()
    text = text_factory.get_text(test_data / file)
    total_nouns = Spacy.get_terms(text)
    end = time.time()
    print(end - start)

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: 
Description:
Returns:
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# def test_accuracy_():
#     # TODO: Mock data in test_data dir
#     # nlp = spacy.load('en_core_web_sm')
#     # noun_chunks = [[print(c.lemma_) for c in s.noun_chunks] for s in doc.sents]
#     docInfo, total_nouns, total_sentences = parsers.run_parsers(
#         test_data / 'test_sentences_10.pdf')


# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# Function: 
# Description:
# Returns:
# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# def test_info_parsing():
#     docInfo, total_nouns, total_sentences = parsers.run_parsers(
#         test_data / 'test_paragraph.pdf')
#     if docInfo != None:
#         print("docInfo working")


# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# Function: 
# Description:
# Returns:
# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# def test_sentence_punc():
#     docInfo, total_nouns, total_sentences = parsers.run_parsers(
#         test_data / 'test_paragraph.pdf')
#     if len(total_sentences) == 4:
#         print("sentence parsing accurate")
#     else:
#         print("sentence parsing inaccurate")


# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# Function: 
# Description:
# Returns:
# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# def test_invalid_input_extension():
#     assert parsers.validate_file(Path('tests/unit_tests.py')) == False


# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# Function: 
# Description:
# Returns:
# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# def test_invalid_input_path():
#     assert parsers.validate_file(Path('asdfasdfa')) == False


# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# Function: 
# Description:
# Returns:
# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# def test_valid_input_pdf():
#     assert parsers.validate_file(test_data / 'Game_Genres.pdf') == True


# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# Function: 
# Description:
# Returns:
# '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# def test_valid_input_docx():
#     assert parsers.validate_file(
#         test_data / 'Alpha_Prototype_Report_template.docx') == True
# what is this supposed to test?


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: 
Description:
Returns:
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
# def test_non_english_input():
#     docInfo, total_nouns, total_sentences = parsers.run_parsers(
#         test_data / 'non_english_pdf.pdf')
#     csv_name = output_writers.to_csv(
#         docInfo, 'totalTimeStr', 'costPerNounStr', total_nouns, 0, 0, test_data / 'non_english_pdf.pdf')
#     outfile = output / csv_name
#     assert outfile.exists() == True
#     os.remove(outfile)  # cleanup


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: 
Description:
Returns:
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
def test_existing_database():
    pass


'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Function: 
Description:
Returns:
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
if __name__ == "__main__":
    test_accuracy('test_sentences_10.txt', tsd1)

    # test_accuracy('VaporwavePdf.pdf', tsd2)
    # test_accuracy('GrindcorePdf.pdf', tsd3)
    # test_accuracy('Butt-Rockpdf.pdf', tsd4)

    # test_accuracy('EldenRingCombat.pdf', tsd5)
    # test_accuracy('EldenRingStats.pdf', tsd6)
    # test_accuracy('EldenRingRadahn.pdf', tsd7)

    # test_speed('EldenRingCombat.pdf')
    # test_speed('EldenRingStats.pdf')
    # test_speed('EldenRingRadahn.pdf')
    # test_speed('VaporwavePdf.pdf')



    # test_accuracy('VaporwavePdf.pdf', tsd8)
    # test_accuracy('GrindcorePdf.pdf', tsd9)
    # test_accuracy('Butt-Rockpdf.pdf', tsd10)
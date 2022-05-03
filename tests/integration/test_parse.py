import time
from pathlib import Path
from Parser import Spacy
from Parser import text_factory
from Parser.main import initializer, parse, single_parse
from tests.test_data.test_term_dictionaries import *

import pytest

test_data = Path('tests/test_data')
files = ['blank', 'EldenRingMount', 'EldenRingStance', 'EldenRingStelth', 'test_sentences_10']

@pytest.mark.skip(reason="Helper function")
def test_accuracy(file, check):
    text = text_factory.get_text(file)
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


def test_accuracy_blank():
    test_accuracy((test_data / 'txt_files'/ 'blank.txt'), BlankDocumentTerms)

def test_accuracy_EldenMount():
    test_accuracy((test_data / 'txt_files'/ 'EldenRingMount.txt'), EldenRingMountTerms)

def test_accuracy_EldenStance():
    test_accuracy((test_data / 'txt_files'/ 'EldenRingStance.txt'), EldenRingStanceTerms)

def test_full_run_single():
    initializer(test_data)
    single_parse((test_data / 'txt_files'/ 'EldenRingMount.txt'))

def test_full_run_multi():
    parse(test_data / 'docx_files', test_data, files)


if __name__ == '__main__':
    test_accuracy((test_data / 'txt_files'/ 'blank.txt'), BlankDocumentTerms)
    test_accuracy((test_data / 'txt_files'/ 'EldenRingMount.txt'), EldenRingMountTerms)
    test_accuracy((test_data / 'txt_files'/ 'EldenRingStance.txt'), EldenRingStanceTerms)
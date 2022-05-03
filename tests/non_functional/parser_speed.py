from Parser import Spacy
from Parser import text_factory
from pathlib import Path
from Parser.main import initializer, parse_sync, parse, single_parse
import time

test_data = Path('tests/test_data')

files = ['blank', 'EldenRingMount', 'EldenRingStance', 'EldenRingStelth', 'test_sentences_10']

def test_speed_small():
    print("starting speed test for a small file")
    start = time.time()
    text = text_factory.get_text(test_data / 'docx_files' / 'EldenRingStealth.docx')
    total_nouns = Spacy.get_terms(text)
    end = time.time()
    print("Small file took", round(end - start), "sec")

def test_speed_large():
    print("starting speed test for a large file")
    start = time.time()
    text = text_factory.get_text(test_data / 'speed_test_files' / '737_Pilot_Operating_Manual.pdf')
    total_nouns = Spacy.get_terms(text)
    end = time.time()
    print("Large file took", round(end - start), "sec")

def test_speed_multiple_files_sync():
    print("starting speed test for a multiple docx file synchronously")
    start = time.time()
    initializer(test_data)
    total_nouns = parse_sync(test_data / 'docx_files', test_data, files)
    end = time.time()
    print("Multi sync file took", round(end - start), "sec")

def test_speed_multiple_files_async():
    print("starting speed test for a multiple docx file asynchronously")
    start = time.time()
    total_nouns = parse(test_data / 'docx_files', test_data, files)
    end = time.time()
    print("Multi async file took", round(end - start), "sec")


if __name__ == "__main__":
    test_speed_multiple_files_sync()
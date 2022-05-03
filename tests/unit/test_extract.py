from Parser import txt_extract
from Parser import pdf_extract
from Parser import docx_extract
from pathlib import Path

"""
These are unit tests for the text extraction module. Tests consist of 
assertions that make sure the files types are being opened and served
correctly
"""


# Files used for the test cases below 
txt_file1 = Path('tests/test_data/txt_files/blank.txt')
txt_file2 = Path('tests/test_data/txt_files/test_sentences_10.txt')
txt_file3 = Path('tests/test_data/txt_files/EldenRingMount.txt')

pdf_file1 = Path('tests/test_data/pdf_files/blank.pdf')
pdf_file2 = Path('tests/test_data/pdf_files/test_sentences_10.pdf')
pdf_file3 = Path('tests/test_data/pdf_files/EldenRingMount.pdf')

docx_file1 = Path('tests/test_data/docx_files/blank.docx')
docx_file2 = Path('tests/test_data/docx_files/test_sentences_10.docx')
docx_file3 = Path('tests/test_data/docx_files/EldenRingMount.docx')

# def test_open_txt_file():
#     assert txt_extract.open_file(txt_file1) != 0
#     assert txt_extract.open_file(txt_file2) != 0
#     assert txt_extract.open_file(txt_file3) != 0

# def test_open_txt_file_invalid():
#     assert txt_extract.open_file(pdf_file1) == 0
#     assert txt_extract.open_file(pdf_file2) == 0
#     assert txt_extract.open_file(pdf_file3) == 0

# def test_open_pdf_file():
#     assert pdf_extract.open_file(pdf_file1) != 0
#     assert pdf_extract.open_file(pdf_file2) != 0
#     assert pdf_extract.open_file(pdf_file3) != 0

# def test_open_pdf_file_invalid():
#     assert pdf_extract.open_file(docx_file1) == 0
#     assert pdf_extract.open_file(docx_file2) == 0
#     assert pdf_extract.open_file(docx_file3) == 0

# def test_open_docx_file():
#     assert docx_extract.open_file(docx_file1) != 0
#     assert docx_extract.open_file(docx_file2) != 0
#     assert docx_extract.open_file(docx_file3) != 0

# def test_open_docx_file_invalid():
#     assert docx_extract.open_file(txt_file1) == 0
#     assert docx_extract.open_file(txt_file2) == 0
#     assert docx_extract.open_file(txt_file3) == 0

def test_extract_txt():
    assert txt_extract.get_text(txt_file1) == []
    assert txt_extract.get_text(txt_file2) == ["I'm scared that he won't ever come home.", 'The Queen of England lives in Buckingham Palace.', 'I want to invest in some stocks now.', 'The painting looked like something out of the 1700s.', 'We should be able to resolve our differences.', 'I have 30 jackets.', 'The Golden Age in many countries died down due to wars.', 'She spent over $300 on masks alone in 2020.', "It's so cold.", 'He was very scared when he saw this big snake.']
    assert txt_extract.get_text(txt_file3) == ['Elden Ring will have a large scale in terms of the world and exploration, and to go hand-in-hand with this, some new mechanics are introduced such as jumping, yes players can jump now, as well as riding on horseback (Mounts). Hidetaka Miyazaki strongly suggests that you thoroughly search and explore every section of the world to find Skills that are hidden.', '', 'There are a number of choices as well that players can approach their way of combat, some may be brave and choose to go on head-to-head, while others would rather have allies such as being able to summon the spirits of deceased enemies.']

def test_extract_txt_invalid():
    assert txt_extract.get_text(txt_file1) != ["Kadir was here"]
    assert txt_extract.get_text(txt_file2) != []
    assert txt_extract.get_text(txt_file3) != []

def test_extract_pdf_file():
    assert pdf_extract.get_text(pdf_file1) == []
    assert pdf_extract.get_text(pdf_file2) == ["I'm scared that he won't ever come home. The Queen of England lives in Buckingham Palace. I want to invest in some stocks now. The painting looked like something out of the 1700s. We should be able to resolve our differences. I have 30 jackets. The Golden Age in many countries died down due to wars. She spent over $300 on masks alone in 2020. It's so cold. He was very scared when he saw this big snake. "]
    assert pdf_extract.get_text(pdf_file3) == ['Elden Ring will have a large scale in terms of the world and exploration, and to go hand-in-hand with this, some new mechanics are introduced such as jumping, yes players can jump now, as well as riding on horseback (Mounts). Hidetaka Miyazaki strongly suggests that you thoroughly search and explore every section of the world to find Skills that are hidden.  There are a number of choices as well that players can approach their way of combat, some may be brave and choose to go on head-to-head, while others would rather have allies such as being able to summon the spirits of deceased enemies. ']

def test_extract_pdf_file_invalid():
    assert pdf_extract.get_text(pdf_file1) != ["Kadir is still here"]
    assert pdf_extract.get_text(pdf_file2) != []
    assert pdf_extract.get_text(pdf_file3) != []

def test_extract_docx_file():
    assert docx_extract.get_text(docx_file1) == ['']
    assert docx_extract.get_text(docx_file2) == ["I'm scared that he won't ever come home.", 'The Queen of England lives in Buckingham Palace.', 'I want to invest in some stocks now.', 'The painting looked like something out of the 1700s.', 'We should be able to resolve our differences.', 'I have 30 jackets.', 'The Golden Age in many countries died down due to wars.', 'She spent over $300 on masks alone in 2020.', "It's so cold.", 'He was very scared when he saw this big snake.']
    assert docx_extract.get_text(docx_file3) == ['Elden Ring will have a large scale in terms of the world and exploration, and to go hand-in-hand with this, some new mechanics are introduced such as jumping, yes players can jump now, as well as riding on horseback (Mounts). Hidetaka Miyazaki strongly suggests that you thoroughly search and explore every section of the world to find Skills that are hidden.', '', 'There are a number of choices as well that players can approach their way of combat, some may be brave and choose to go on head-to-head, while others would rather have allies such as being able to summon the spirits of deceased enemies.']

def test_extract_txt_docx_invalid():
    assert docx_extract.get_text(docx_file1) != ["Wow Kadir is still here"]
    assert docx_extract.get_text(docx_file2) != []
    assert docx_extract.get_text(docx_file3) != []

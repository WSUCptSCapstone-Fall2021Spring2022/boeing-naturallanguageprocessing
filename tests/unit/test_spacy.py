from Parser import Spacy
from tests.test_data.test_term_dictionaries import *

"""
These are unit tests for the spacy module. Tests consist of 
assertions that make sure the resulting dictionary of terms and frequencies
is correct
"""

blankTxt = ""
test_sentences_10_txt = """
I'm scared that he won't ever come home.
The Queen of England lives in Buckingham Palace.
I want to invest in some stocks now.
The painting looked like something out of the 1700s.
We should be able to resolve our differences.
I have 30 jackets.
The Golden Age in many countries died down due to wars.
She spent over $300 on masks alone in 2020.
It's so cold.
He was very scared when he saw this big snake.

"""
EldenRingMountTxt = """
Elden Ring will have a large scale in terms of the world and exploration, and to go hand-in-hand with this, some new mechanics are introduced such as jumping, yes players can jump now, as well as riding on horseback (Mounts). Hidetaka Miyazaki strongly suggests that you thoroughly search and explore every section of the world to find Skills that are hidden.

There are a number of choices as well that players can approach their way of combat, some may be brave and choose to go on head-to-head, while others would rather have allies such as being able to summon the spirits of deceased enemies.

"""
EldenRingStanceTxt = """
Similar to Sekiro: Shadows Die Twice, during Combat you should be careful not to lose your Stance in order to avoid getting staggered. You will also want to break your Enemy's Stance in order to make them stagger, giving you a chance to perform a critical attack. During combat, you can block your Enemy's attack by holding the block button, however if you block each attack only when it's necessary, the game will consider that you performed a perfect Block. Perfect Blocks will save your Stance, and waste the Enemy's Stance, but if you block earlier or keep blocking longer than necessary, you will lose some Stance while your Enemy saves it.

Performing successful parries will also help lowering or breaking your Enemy's Stance greatly, but failing an attempt of parrying will cost you a lot of Stance. Heavy Strikes, Sneak Attacks and attacking from above can also heavily lower or break the opponent's Stance.

"""

def test_get_terms_blank():
    total_nouns = {}
    nouns = Spacy.get_terms(test_sentences_10_txt)
    for n in nouns:
        total_nouns.__setitem__(n.text, n.occurances)
    assert  total_nouns == TestSentencesTerms

def test_get_terms_1():
    total_nouns = {}
    nouns = Spacy.get_terms(EldenRingMountTxt)
    for n in nouns:
        total_nouns.__setitem__(n.text, n.occurances)
    assert  total_nouns == EldenRingMountTerms

def test_get_terms_2():
    total_nouns = {}
    nouns = Spacy.get_terms(EldenRingStanceTxt)
    for n in nouns:
        total_nouns.__setitem__(n.text, n.occurances)
    assert  total_nouns == EldenRingStanceTerms

def test_get_terms_invalid_1():
    total_nouns = {}
    nouns = Spacy.get_terms(test_sentences_10_txt)
    for n in nouns:
        total_nouns.__setitem__(n.text, n.occurances)
    assert  total_nouns != EldenRingMountTerms

def test_get_terms_invalid_2():
    total_nouns = {}
    nouns = Spacy.get_terms(EldenRingMountTxt)
    for n in nouns:
        total_nouns.__setitem__(n.text, n.occurances)
    assert  total_nouns != EldenRingStanceTerms

def test_get_terms_invalid_3():
    total_nouns = {}
    nouns = Spacy.get_terms(EldenRingStanceTxt)
    for n in nouns:
        total_nouns.__setitem__(n.text, n.occurances)
    assert  total_nouns != TestSentencesTerms 
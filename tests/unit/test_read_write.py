from Data import main as save
from pathlib import Path

test_data = Path('tests/test_data')


def test_write_to_csv():
    data = [['elden ring',"['Elden Ring will have a large scale in terms of the world and exploration, and to go hand-in-hand with this, some new mechanics are introduced such as jumping, yes players can jump now, as well as riding on horseback (Mounts).']",1, 1]]
    save.write_to_csv(data, test_data / 'test.csv')

    assert (test_data / 'test.csv').exists()

def test_write_to_json():
    data = {}
    data['graph'] = {'nodes': [], 'edges': []}
    data['relationships'] = []
    save.write_to_json(data, test_data / 'test_relationships.json')

    assert (test_data / 'test_relationships.json').exists()

def test_read_weights():
    result = {}
    result['taxonomy'] = {'elden ring': {'context': ['Elden Ring will have a large scale in terms of the world and exploration, and to go hand-in-hand with this, some new mechanics are introduced such as jumping, yes players can jump now, as well as riding on horseback (Mounts).'], 'frequency': '1', 'weight': '1'}}
    result['graph'] = {'nodes': [], 'edges': []}
    result['relationships'] = []

    assert save.read_weights(test_data, 'test') == result

def test_read_weights_invalid():
    result = {}
    result['taxonomy'] = {'Kadir': {'context': ['Elden Ring will have a large scale in terms of the world and exploration, and to go hand-in-hand with this, some new mechanics are introduced such as jumping, yes players can jump now, as well as riding on horseback (Mounts).'], 'frequency': '1', 'weight': '1'}}
    result['graph'] = {'nodes': [], 'edges': []}
    result['relationships'] = []

    assert save.read_weights(test_data, 'test') != result

if __name__ == '__main__':
    test_write_to_json()
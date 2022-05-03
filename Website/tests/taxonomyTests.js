import { Selector } from 'testcafe';
import http from 'https';

var input = 'Website/tests/testIn';
var output = 'Website/tests/testout';

fixture `Relationshipstests`
    .page `http://localhost:3000/`;

test
    ('CanCreateRelationshipsTest', async t => {
    await t

        .click('#createBtn')

        .typeText(Selector("input[name='input']"), input)
        .click("#input > button")
        .expect(Selector('#input > div').innerText).eql('Input: ' + input)

        .typeText(Selector("input[name='output']"), output)
        .click("#output > button")
        .expect(Selector('#output > div').innerText).eql('Output: ' + output)

        .typeText(Selector("input[name='taxonomy']"), 'corpus')
        .click("#corpus > button")
        .expect(Selector('#corpus > div').innerText).eql('Name: corpus')

        .click('#getFiles')
        .expect(Selector('tbody > tr').exists).ok()

        .click(Selector('tbody > tr').child(1))
        .expect(Selector('tbody > tr.table-row--selected').exists).ok()

        .click(Selector('div.page-button-box').child(1))
        // .wait(3000)
        .expect(Selector('tbody').child(1).exists).ok()

        .click(Selector('div.page-button-box').child(1))
        .click(Selector('div.page-button-box').child(1))
        
        .click(Selector('div.taxonomy-terms-box--center').child(1))
        .typeText(Selector('.modal-body #relationshipName'), 'test_relationship1')
        .expect(Selector('.modal-body #relationshipName').value).eql('test_relationship1')

        .typeText(Selector('.modal-body #relationshipColor'), '#fffacb')
        .expect(Selector('.modal-body #relationshipColor').value).eql('#fffacb')

        .click(Selector('.modal-body #relationshipBtn'))
        .expect(Selector('.table-box--taxonomy tbody').child(-1)('td').innerText).contains('test_relationship1')
        .expect(Selector('.table-box--taxonomy tbody').child(-1)('td').child(-1).innerText).contains('#fffacb')

});

test
    ('CanTakeScreenshotTest', async t => {
    await t

        .click('#createBtn')

        .typeText(Selector("input[name='input']"), input)
        .click("#input > button")
        .expect(Selector('#input > div').innerText).eql('Input: ' + input)

        .typeText(Selector("input[name='output']"), output)
        .click("#output > button")
        .expect(Selector('#output > div').innerText).eql('Output: ' + output)

        .typeText(Selector("input[name='taxonomy']"), 'corpus')
        .click("#corpus > button")
        .expect(Selector('#corpus > div').innerText).eql('Name: corpus')

        .click('#getFiles')
        .expect(Selector('tbody > tr').exists).ok()

        .click(Selector('tbody > tr').child(1))
        .expect(Selector('tbody > tr.table-row--selected').exists).ok()

        .click(Selector('div.page-button-box').child(1))
        // .wait(3000)
        .expect(Selector('tbody').child(1).exists).ok()

        .click(Selector('div.page-button-box').child(1))
        .click(Selector('div.page-button-box').child(1))

        // .click(Selector('div.taxonomy-terms-box--center').child(-2))
        // .wait(1000)
});

test
    ('CanEditRelationshipTest', async t => {
        
});

test
    ('CanDeletetRelationshipTest', async t => {

});
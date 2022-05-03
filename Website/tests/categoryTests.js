import { Selector } from 'testcafe';
import http from 'https';
import { watchFile } from 'fs';

var input = 'Website/tests/testIn';
var output = 'Website/tests/testout';

fixture `CategoryTests`
    .page `http://localhost:3000/`;

test
    ('CanCreateCategoryTest', async t => {
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

        .click(Selector('#createCategory'))
        .typeText(Selector('.modal-body > input'), 'test1')
        .expect(Selector('.modal-body > input').value).eql('test1')
        .click(Selector('.modal-body > button'))
        .expect(Selector('.categories-terms-box--right tbody').child(-1)('td').innerText).contains('test1')

});

test
    ('CanDeleteCategoryTest', async t => {
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

        .click(Selector('#createCategory'))
        .typeText(Selector('.modal-body > input'), 'test1')
        .expect(Selector('.modal-body > input').value).eql('test1')
        .click(Selector('.modal-body > button'))
        .expect(Selector('.categories-terms-box--right tbody').child(-1)('td').innerText).contains('test1')

        .click(Selector('.categories-terms-box--right tbody').child(0))
        // .expect(Selector('.categories-terms-box--right tbody tr.table-row--no-hover')).exists
        .click(Selector('#deleteCategory'))
        .expect(Selector('.categories-terms-box--right tbody').child(1).exists).notOk()
});

test
    ('CanAddTermsToCategoryTest', async t =>{

});

test
    ('CanDeleteTermsFromCategoryTest', async t =>{
        
});
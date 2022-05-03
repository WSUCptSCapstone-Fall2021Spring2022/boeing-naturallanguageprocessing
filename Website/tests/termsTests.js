import { Selector } from 'testcafe';
import http from 'https';

var input = 'Website/tests/testIn';
var output = 'Website/tests/testout';

fixture `TermsViewTests`
    .page `http://localhost:3000/`;

test
    ('DoesViewExistTest', async t => {
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
        .wait(1000)
        .expect(Selector('tbody').child(1).exists).ok()
});

test
    ('DoesViewExistTestInvalid', async t => {
        await t

        .click('#createBtn')

        .typeText(Selector("input[name='input']"), input + 'invalid')
        .click("#input > button")
        .expect(Selector('#input > div').innerText).eql('Input: ' + input + 'invalid')

        .typeText(Selector("input[name='output']"), output + 'invalid')
        .click("#output > button")
        .expect(Selector('#output > div').innerText).eql('Output: ' + output + 'invalid')

        .typeText(Selector("input[name='taxonomy']"), 'corpus')
        .click("#corpus > button")
        .expect(Selector('#corpus > div').innerText).eql('Name: corpus')

        .click('#getFiles')
        .expect(Selector('tbody').child(1).exists).notOk()

        .click(Selector('div.page-button-box').child(1))
        .wait(1000)
        .expect(Selector('tbody').child(1).exists).notOk()
});

test
    ('DoesSentenceModalShowTest', async t =>{
        await t

        .click('#createBtn')

        .typeText(Selector("input[name='input']"), input + 'invalid')
        .click("#input > button")
        .expect(Selector('#input > div').innerText).eql('Input: ' + input + 'invalid')

        .typeText(Selector("input[name='output']"), output + 'invalid')
        .click("#output > button")
        .expect(Selector('#output > div').innerText).eql('Output: ' + output + 'invalid')

        .typeText(Selector("input[name='taxonomy']"), 'corpus')
        .click("#corpus > button")
        .expect(Selector('#corpus > div').innerText).eql('Name: corpus')

        .click('#getFiles')
        .expect(Selector('tbody').child(1).exists).notOk()

        .click(Selector('div.page-button-box').child(1))
        .click(Selector('tbody tr').child(-1))
        .expect('.modal-body').exists
});

test
    ('CanDeleteTermsTest', async t => {
    
});
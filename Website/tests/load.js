import { Selector } from 'testcafe';
import http from 'https';

var input = 'Website/tests/testIn';
var output = 'Website/tests/testOut';

fixture `LoadCorpusTests`
    .page `http://localhost:3000/`;

test
    ('LoadCorpusTest', async t => {
    await t

        .click('#loadBtn')

        .typeText(Selector("input[name='output']"), output)
        .click("#output > button")
        .expect(Selector('#output > div').innerText).eql('Output: ' + output)

        .typeText(Selector("input[name='taxonomy']"), 'master')
        .click("#corpus > button")
        .expect(Selector('#corpus > div').innerText).eql('Name: master')

        .click(Selector('div.page-button-box').child(1))
        // .wait(3000)
        .expect(Selector('tbody').child(1).exists).ok()

        .click(Selector('div.page-button-box').child(1))
        .expect(Selector('tbody').child(1).exists).ok()

        .click(Selector('div.page-button-box').child(1))
    });
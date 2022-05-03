import { Selector } from 'testcafe';
import http from 'https';

var input = 'Website/tests/testIn';
var output = 'Website/tests/testout';


// const executeRequest = (route, body) => {
//     return new Promise(resolve => {
//         const options = {
//             hostname: '127.0.0.1',
//             port:     5000,
//             path:     '/' + route,
//             body: JSON.stringify(body),
//             method:   'POST'
//         };

//         console.log(options);

//         const req = http.request(options, res => {
//             console.log('statusCode:', res.statusCode);
//             console.log('headers:', res.headers);
//             resolve();
//         });

//         req.on('error', e => {
//             console.error(e);
//         });

//         req.end();
//     });
// };

fixture `GetFilesTests`
    .page `http://localhost:3000/`;

test
    // .before(async t => {
    //     await executeRequest('getFiles', {'input': 'Data/Input'});})
    ('getFilesTests', async t => {
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
});

test
    ('getFilesTestInvalid', async t => {
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
    });
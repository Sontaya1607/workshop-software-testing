const request = require('supertest')
const app = require('../server')
const mydata1 = {
    id: 12,
    name: 'Miracle',
    email: 'miracle@liquid.com',
    phone: '191-191-1991',
    url: 'www.dota2.com',
    notes: 'Liquid Winner TI7'
}
const mydata2 = {
    id: 6,
    name: 'KuroKy',
    email: 'kuroky@liquid.com',
    phone: '191-191-1991',
    url: 'www.dota2.com',
    notes: 'Liquid GOD Dota2'
}

describe('GET /contacts', () => {
    it('should return list of contact id[0]', (done) => {
        request(app).get('/contacts')
            .expect(200)
            .then((res) => {
                let contacts = res.body
                expect(contacts instanceof Array).toBeTruthy()

                let contact = contacts[0]
                expect(contact.id).toBeDefined()
                expect(contact.name).toBeTruthy()
                expect(contact.email).toBeTruthy()
                expect(contact.phone).toBeTruthy()
                expect(contact.url).toBeTruthy()
                expect(contact.notes).toBeTruthy()
                done()
            })
    })

    it('should return list of contact id[1-n]', (done) => {
        request(app).get('/contacts')
            .expect(200)
            .then((res) => {
                let contacts = res.body
                expect(contacts instanceof Array).toBeTruthy()

                let count = contacts.length
                let contactId0 = contacts[0]
                for (let i = 0; i < count; i++) {
                    if (contacts[i] != contactId0) {
                        expect(contacts[i].id).toBeTruthy()
                        expect(contacts[i].name).toBeTruthy()
                        expect(contacts[i].email).toBeTruthy()
                        expect(contacts[i].phone).toBeTruthy()
                        expect(contacts[i].url).toBeTruthy()
                        expect(contacts[i].notes).toBeTruthy()
                    }
                }
                done()
            })
    })
})

describe('GET /contacts/:id', () => {
    it('get contact id = [0]', (done) => {
        request(app).get('/contacts/0')
            .expect(200)
            .then((res) => {
                let contact = res.body
                expect(contact instanceof Object).toBeTruthy()

                expect(contact.id).toEqual(0)
                expect(contact.id).toBeDefined()
                expect(contact.name).toBeTruthy()
                expect(contact.email).toBeTruthy()
                expect(contact.phone).toBeTruthy()
                expect(contact.url).toBeTruthy()
                expect(contact.notes).toBeTruthy()
                done()
            })
    })

    it('get contact id = [!0]', (done) => {
        request(app).get('/contacts/6')
            .expect(200)
            .then((res) => {
                let contact = res.body
                expect(contact instanceof Object).toBeTruthy()

                expect(contact.id).toEqual(6)
                expect(contact.id).toBeTruthy()
                expect(contact.name).toBeTruthy()
                expect(contact.email).toBeTruthy()
                expect(contact.phone).toBeTruthy()
                expect(contact.url).toBeTruthy()
                expect(contact.notes).toBeTruthy()
                done()
            })
    })
})

describe('POST /contacts', () => {
    it('post create contact', (done) => {
        request(app).post('/contacts')
            .send(mydata1)
            .expect(201)
            .then((res) => {
                let contact = res.body
                expect(contact instanceof Object).toBeTruthy()
                expect(contact).toEqual(mydata1)
                expect(contact.id).not.toBeNull()
                expect(contact.name).not.toBeNull()
                expect(contact.email).not.toBeNull()
                expect(contact.phone).not.toBeNull()
                expect(contact.url).not.toBeNull()
                expect(contact.notes).not.toBeNull()
                // expect(contact.id).toEqual(mydata.id)
                // expect(contact.name).toEqual(mydata.name)
                // expect(contact.email).toEqual(mydata.email)
                // expect(contact.phone).toEqual(mydata.phone)
                // expect(contact.url).toEqual(mydata.url)
                // expect(contact.notes).toEqual(mydata.notes)
                done()
            })
    })
})

describe('PUT /contacts/:id', () => {
    it('put update contact id = [6]', (done) => {
        request(app).put('/contacts/6')
            .send(mydata2)
            .expect(200)
            .then((res) => {
                done()
            })
    })
})

describe('DELETE /contacts/:id', () => {
    it('delete remove contact id = [6]', (done) => {
        request(app).delete('/contacts/6')
            .send(mydata2)
            .expect(204)
            .then((res) => {
                done()
            })
    })
})
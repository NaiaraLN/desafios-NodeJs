import supertest from "supertest"
import { expect } from 'chai'
import ArrayDAO from "./model/arrayDao/arrayDAO.js"

const arrayDAO = new ArrayDAO()
const request = supertest('http://localhost:8080')

describe('test MOCK products', () => {
    describe('GET', () => {
        it('La petición debería retornar status 200', async () => {
            let res = await request.get('/api/products-test')
            expect(res.status).to.equal(200)
        })
    })
    describe('POST', () => {
        it('Debe poder crear los productos', async () => {
            let res = await request.post('/api/products-test')
            expect(res.status).to.equal(200)
            expect(arrayDAO.popular()).to.have.lengthOf(5)
        })
    })
    describe('PUT', () => {
        it('Debe poder actualizar un producto', async () => {
            let product = {
                id:5,
                title:'hola',
                price: 3000,
                thumbnail: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/70.jpg'
            }
            let res = await request.put('/api/products-test/5').send(product)
            expect(res.status).to.equal(200)
        })
    })
    describe('DELETE', () => {
        it('Debe poder eliminar un producto', async () => {
            let res =  await request.delete('/api/products-test/2')
            expect(res.status).to.equal(200)
        })
        it('Debe poder eliminar todos los productos', async () => {
            let res =  await request.delete('/api/products-test')
            expect(res.status).to.equal(200)
        })
    })
})
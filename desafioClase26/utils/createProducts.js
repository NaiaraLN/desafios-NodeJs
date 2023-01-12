import{ faker } from '@faker-js/faker'
faker.locale = 'es'

function createProduct(id) {
    return {
        id,
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.avatar(),
    }
}
export {createProduct}
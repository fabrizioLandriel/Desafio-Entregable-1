import { promises as fs } from 'fs'
import { v4 as uuid } from 'uuid'

export class ProductManager {
    constructor() {
        this.path = "../products.json";
        this.products = [];
    }

    addProduct = async ({ title, description, price, thumbnail, code, stock }) => {
        const id = uuid()

        let newProduct = { id, title, description, price, thumbnail, code, stock }
        this.products = await this.getProduct()
        this.products.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct;
    }

    getProduct = async () => {
        const response = await fs.readFile(this.path, "utf-8")
        const responseJSON = JSON.parse(response)
        return responseJSON;
    }

    getProductById = async (id) => {
        const response = await this.getProduct()
        const product = response.find(product => product.id === id)
        if (product) {
            return product
        }
        else {
            console.log("Producto no encontrado")
        }
    }

    updateProduct = async (id, {... data }) => {
        const products = await this.getProduct()
        const index = products.findIndex(product => product.id === id)
        if (index != -1) {
            products[index] = { id, ...data }
            await fs.writeFile(this.path, JSON.stringify(products))
            return products[index]
        }
        else {
            console.log("Producto no encontrado")
        }

    }

    deleteProduct = async (id) => {
        const products = await this.getProduct()
        const index = products.findIndex(product => product.id === id)
        if (index != -1) {
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))
        }
        else {
            console.log("Producto no encontrado")
        }

    }
}
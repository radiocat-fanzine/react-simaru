import products from './products'

export function getProducts(){
    const promiseProducts = new Promise ( (resolve) => {
        setTimeout( () => {
            resolve(products)
        }, 1000 )
    })

    return promiseProducts;
}

// Funcion para obtener un producto segun su ID, con condicional que rechaza la promesa en caso no se cumpla,

export function getProductById( idRequested) {
    const reqItem = products.find( (item) => item.id === Number(idRequested) )

    const promiseProduct = new Promise ( (resolve, reject) => {
        setTimeout( () => {
            if (reqItem !== undefined) {
                resolve(reqItem)
            }
            else {
                reject("Item not found :(")
            }
        }, 1000)
    })
    return promiseProduct
}

export function getProductsByCategory( categRequested ){
    const productsFilter = products.filter( item => item.category === categRequested )

    return new Promise ( (resolve) => {
        setTimeout( () => {
            resolve(productsFilter)
        }, 1000)
    })
}


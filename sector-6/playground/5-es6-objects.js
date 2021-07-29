const name = 'Andrew'
const userAge = 27

const user = {
    name,
    age: userAge,
    location: 'Philadelphia'
}

console.log(user)

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

const transaction = (type, myProduct) => {
    const {label} = myProduct
}

const transaction = (type, {label, stock}) => {
}

transaction('order', product)



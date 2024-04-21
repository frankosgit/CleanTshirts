export interface IAllProductsResponse {
    products: IProduct[]
}

export interface IProduct {
    _id: string,
    name: string,
    price: number,
    description: string,
    image: string,
    status?: string,
    amountInStock: number,
    category: string;
}

export interface ICreateProductRes {
    newProduct: {
        acknowledged: boolean,
        insertedId: string
    } 
}
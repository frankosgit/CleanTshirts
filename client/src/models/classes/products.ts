import { IProduct } from "../interfaces/products";

export class NewProductDetails {
    constructor(
        public name: string,
        public price: number,
        public description: string,
        public image1: string,
        public image2: string,
        public status: boolean,
        public amountInStock: number,
        public category: string
    ) { }
}

export class CartProduct {
    constructor(
    public quantity: number,
    public product: IProduct
    ){}
}
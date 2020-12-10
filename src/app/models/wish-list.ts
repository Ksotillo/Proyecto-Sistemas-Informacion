import { Product } from './product';

export interface WishList {
    key?: string,
    userID: string,
    products: Array<Product>,
}

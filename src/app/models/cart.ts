import { Bag } from './bag';

export interface Cart {
    $key?: string,
    products: Array<Bag>,
    totalPrice: number,
}

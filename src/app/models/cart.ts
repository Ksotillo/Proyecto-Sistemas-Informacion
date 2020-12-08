import { Bag } from './bag';

export interface Cart {
    $key?: string,
    userId: string,
    products: Array<Bag>,
    totalPrice: number,
}

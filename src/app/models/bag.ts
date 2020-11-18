import { Product } from './product';

export interface Bag {
    bagContents: Array<{productTitle: string, productAmount: number}>;
    bagWeight: number,
}

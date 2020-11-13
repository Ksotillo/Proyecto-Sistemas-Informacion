export interface Bag {
    bagContents: Array<{
        productName: string,
        productPrice: number,
        productCategory: string,
        productWeight: number,
    }>;
    totalWeight: number;
    totalPrice: number;
}

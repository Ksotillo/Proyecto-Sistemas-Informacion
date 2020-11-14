

export interface Invoice {
    $key? : string;
    name : string;
    currentState: string;
    deliveryTipe:string;
    creationDate: string;
    products: Array<{
        product: string,
        price: number    }>;

}

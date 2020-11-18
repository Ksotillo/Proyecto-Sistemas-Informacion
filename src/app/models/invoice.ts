import { Bag } from './bag';


export interface Invoice {
    $key? : string,
    name : string,
    currentState: string,
    deliveryTipe:string,
    creationDate: string,
    totalPrice:number,
    products: Array<Bag>
}

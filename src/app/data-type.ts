export interface signUp {
    name: string,
    password: string,
    email: string
}

export interface Login {
    email: string
    password: string,
}

export interface product {
    id:number;
    name: string,
    price: number,
    category: string,
    color: string,
    description: string,
    image: string,
    quantity:undefined | number
}
export interface Cart {
    id?: number;          // optional id
    productId: number;
    name: string;
    price: number;
    category: string;
    color: string;
    description: string;
    image: string;
    quantity: number;     // must always be a number
    userId: number;
}
export interface priceSummary{
    price:number,
    Discount:number,
    tax:number,
    DeliveryFee:number,
    total:number
}
export interface MyOrder {
    userId:number;
    id:number;
  email: string;
  fullName: string;
  mobile: string;
  image:string;
  price:number;
  status:string;
  city: string;
  postalCode: string;
  address: string;
  priceSummary?: {
    price: number;
    Discount: number;
    tax: number;
    DeliveryFee: number;
    total: number;
  };
}

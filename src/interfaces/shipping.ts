export interface Shipping {
    id: number;
    created_at: string;
    modified_at: string;
    ship_payment: number,
    ship_charge: number,
    bill_addr1: string;
    bill_addr2: string;
    state: string;
    city: string;
    zipcode: number;
}
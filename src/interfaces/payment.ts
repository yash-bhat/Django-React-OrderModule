export interface Payment {
    id: number;
    created_at: string;
    modified_at: string;
    payment_order: number,
    payment_method: string,
    card_number: number,
    bill_addr1: string;
    bill_addr2: string;
    state: string;
    city: string;
    zipcode: number;
}
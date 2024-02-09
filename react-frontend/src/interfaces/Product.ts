export interface Product {
    id: number;
    title: string;
    description: string;
    image_url: string;
    price: number;
    category_id?: number;
    category_name: string;
    user_id: number;
}

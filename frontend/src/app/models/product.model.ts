export interface Product {
    id: number;
    name: string;
    price: number;
    thumbnail: string;    // image used in home page product card
    images: string[];     // all detail page images
    category: string;
}

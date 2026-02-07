import { Category } from "./category.type";

export interface User {
  _id: string;
  name: string;
  phone: string;
  image: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Ad {
  id: string;
  _id?: string;
  title: string;
  price: number;
  location: string;
  postedAt: string;
  coverImage: string;
  isFeatured: boolean;
  isUrgent: boolean;
  images?: string[];
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdDetail extends Omit<Ad, 'id' | 'postedAt' | 'coverImage'> {
  _id: string;
  user: User;
  categoryId: Category;
  condition: "new" | "used";
  description: string;
  negotiable: boolean;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  images: string[];
  status: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  relatedAds?: AdDetail[];
}

export interface AdMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface AdResponse {
  success: boolean;
  message: string;
  meta?: AdMeta;
  data: AdDetail;
}

export interface AdsResponse {
  success: boolean;
  message: string;
  meta?: AdMeta;
  data: Ad[];
}

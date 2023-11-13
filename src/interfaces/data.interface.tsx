import { StaticImageData } from "next/image";

export interface IAfrunaPartner {
  _id: string;
  img: StaticImageData;
}
export interface IService {
  img1: StaticImageData;
  services: string;
  des: string;
  location: string;
  rating: string;
  price: string;
}
export interface IProvider {
  img1: StaticImageData;
  services: string;
  name: string;
  rating: string;
}
export interface ICategories {
  img: StaticImageData;
  text: string;
}
export interface IConvo {
  id: string
  img: StaticImageData
  message: string
  time: string
  isOwn: boolean
}

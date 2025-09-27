import { MicroCMSImage } from "microcms-js-sdk";

export type Products = {
  name: string;
  thumbnail: MicroCMSImage;
  images: MicroCMSImage[];
  description: string;
  richDescription: string;
  price: number;
};

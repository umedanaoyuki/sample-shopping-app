import { Article } from "@/lib/mirocmsType";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: Article[];
};

export default function ProductList({ data }: Props) {
  return (
    <ul className="grid grid-cols-3 gap-8 w-11/12 max-w-[800px] mx-auto mt-10">
      {data.map((detail) => (
        <li key={detail.id} className="mb-10">
          <Link
            href={`/products/detail/${detail.id}`}
            className="flex flex-col h-96"
          >
            <div className="relative w-full h-52">
              <Image
                src={detail.thumbnail?.url}
                alt="thumbnail"
                className="rounded-lg"
                width={300}
                height={200}
                unoptimized={true} // 追加
                priority={false}
                loading="lazy"
              />
            </div>

            <dl className="flex flex-col items-center w-full px-3 mt-6">
              <dt className="text-xl font-bold line-clamp-1">{detail.name}</dt>
              <dd className="text-xl mt-3">{detail.price}円</dd>
            </dl>
          </Link>
        </li>
      ))}
    </ul>
  );
}

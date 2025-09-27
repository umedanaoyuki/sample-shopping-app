import { INITIAL_PER_PAGE } from "@/constants";
import Link from "next/link";
type Props = {
  totalCount: number;
  p?: number;
  basePath?: string;
};
export default function Pagination({
  totalCount,
  p = 1,
  basePath = "/products",
}: Props) {
  const pages = Array.from({
    length: Math.ceil(totalCount / INITIAL_PER_PAGE),
  }).map((_, i) => i + 1);
  return (
    <ul className="flex justify-center items-center p-6 mt-6">
      {pages.map((index) => (
        <li className="mx-1" key={index}>
          {p !== index ? (
            <Link
              href={`${basePath}/page/${index}`}
              className="flex justify-center items-center w-9 h-9 rounded-lg hover:bg-gray-200 border border-slate-400"
            >
              {index}
            </Link>
          ) : (
            <span className="flex justify-center items-center w-9 h-9 rounded-lg bg-blue-500 text-white">
              {index}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

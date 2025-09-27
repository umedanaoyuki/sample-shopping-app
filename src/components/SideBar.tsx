import { categories } from "@/constants/data";

export default function SideBar() {
  return (
    <div className="flex flex-col w-96 py-36">
      <p className="text-xl font-bold">商品を検索</p>
      <input
        type="search"
        className="w-full h-10 px-5 mt-2 border-slate-400 rounded-full focus:ring-l focus:ring-blue-500 focus:oilne-none"
        placeholder="検索..."
      />
      <div className="mt-12" />
      <p className="text-xl font-bold">カテゴリー</p>
      <ul className="flex flex-col my-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="px-2 py-1 my-1 text-sm rounded-md whitespace-nowrap"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

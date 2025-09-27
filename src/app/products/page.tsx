import Pagination from "@/components/Pagenation";
import { INITIAL_PER_PAGE } from "@/constants";
import { getList } from "@/lib/microcmsApi";
import ProductsList from "@/components/ProductList";
import SideBar from "@/components/SideBar";

export default async function Products() {
  const data = await getList({
    limit: INITIAL_PER_PAGE,
    orders: "createdAt",
  });

  return (
    <div className="flex flex-row w-full items-start mt-10">
      <SideBar />
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-3xl font-bold">#すべて の商品一覧</p>
        <ProductsList data={data.contents} />
        <Pagination totalCount={data.totalCount} />
      </div>
    </div>
  );
}

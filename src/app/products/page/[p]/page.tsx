import Pagination from "@/components/Pagenation";
import ProductList from "@/components/ProductList";
import SideBar from "@/components/SideBar";
import { INITIAL_PER_PAGE } from "@/constants";
import { getList } from "@/lib/microcmsApi";

type Props = {
  params: Promise<{ p: string }>;
};

export default async function Products({ params }: Props) {
  const awaitParams = await params;
  const p = parseInt(awaitParams.p, 10);

  const data = await getList({
    limit: INITIAL_PER_PAGE,
    offset: INITIAL_PER_PAGE * (p - 1),
    orders: "createdAt",
  });

  return (
    <div className="flex flex-row w-full items-start mt-10">
      <SideBar />
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-3xl font-bold">商品一覧（ページネーション後）</p>
        <ProductList data={data.contents} />
        <Pagination totalCount={data.totalCount} p={p} />
      </div>
    </div>
  );
}

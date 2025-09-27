import { getDetail } from "@/lib/microcmsApi";
import { formatRichEditor } from "@/utils/FormatRichEditor";
import Image from "next/image";
type Props = {
  params: Promise<{
    id: string;
  }>;
};
export default async function Detail({ params }: Props) {
  const awaitParams = await params;
  const data = await getDetail(awaitParams.id);
  return (
    <div className="flex flex-col w-full justify-between items-center pt-16">
      <div className="flex w-full">
        <div className="flex-1">
          <div className="relative h-72">
            <Image
              src={data.thumbnail?.url}
              alt="thumbnail"
              fill
              className="object-contain"
            />
          </div>
          <ul className="flex flex-wrap">
            {data.images.map((image, index) => (
              <li key={index}>
                <Image
                  src={image.url}
                  alt="images"
                  width={100}
                  height={100}
                  className={
                    index === 0 ? "border border-gray-800 mx-1" : "mx-1"
                  }
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-2 px-4 mx-4 flex flex-col">
          <h2 className="font-bold text-2xl sm:text-4xl px-4 mb-6 text-center">
            {data.name}
          </h2>
          <p className="my-8 pb-8 border-b border-gray-300">
            {data.description}
          </p>
          <div
            className="prose max-w-[720px] w-full mx-auto px-4 text-base leading-8 mt-10 
            [&_*:first-child]:mt-0 
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:border-b [&_h1]:border-gray-300 [&_h1]:my-12 
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-12


            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-12 
            [&_h4]:text-base [&_h4]:font-bold [&_h4]:my-12 
            [&_h5]:text-sm [&_h5]:font-bold [&_h5]:my-12 
            [&_p]:my-8 [&_p]:leading-relaxed 
            [&_pre]:overflow-x-auto [&_pre_code]:bg-gray-100 [&_pre_code]:block [&_pre_code]:overflow-x-auto [&_pre_code]:p-4 
            [&_div[data-filename]::before]:inline-block [&_div[data-filename]::before]:bg-gray-200 [&_div[data-filename]::before]:content-[attr(data-filename)] [&_div[data-filename]::before]:m-4 [&_div[data-filename]::before]:px-4 [&_div[data-filename]::before]:py-1 [&_div[data-filename]::before]:rounded-t 
            [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:my-4 
            [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:my-4 
            [&_li]:my-2

            [&_a]:underline 
            [&_figure]:my-8 
            [&_figure_img]:max-w-full [&_figure_img]:h-auto 
            [&_figure_figcaption]:text-sm [&_figure_figcaption]:text-gray-500 
            [&_strong]:font-bold 
            [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-8 
            [&_hr]:my-16 [&_hr]:h-[1px] [&_hr]:bg-gray-300 
            [&_table]:w-full [&_table]:my-8 
            [&_table_th]:bg-gray-200 [&_table_th]:text-left [&_table_th]:p-4 
            [&_table_td]:text-left [&_table_td]:p-4 
            sm:[&_.title]:text-2xl sm:[&_.title]:mb-5 sm:[&_.title]:text-center 
            sm:[&_.description]:text-sm sm:[&_.description]:text-gray-500 sm:[&_.description]:my-6 sm:[&_.description]:text-center 
            sm:[&_.meta]:flex sm:[&_.meta]:items-center sm:[&_.meta]:mb-10 sm:[&_.meta]:text-sm 
            sm:[&_.writer]:pr-6 sm:[&_.writer]:mr-6 
            sm:[&_.writerIcon]:w-8 sm:[&_.writerIcon]:h-8 sm:[&_.writerIcon]:rounded-full 
            sm:[&_.writerName]:ml-4 
            sm:[&_.thumbnail]:w-full sm:[&_.thumbnail]:h-auto sm:[&_.thumbnail]:mb-10"
            dangerouslySetInnerHTML={{
              __html: formatRichEditor(data.richDescription || ""),
            }}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-row w-full justify-between items-center border-b py-1 my-5">
            <p>価格：</p>
            <p className="text-center">
              <span className="text-3xl mx-3">{data.price}</span>円（税込）
            </p>
          </div>
          <form action={`/api/${awaitParams.id}/checkout`} method="post">
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                購入手続きへ
              </button>
            </div>
            <input type="hidden" name="amount" value={data.price} />
            <input type="hidden" name="name" value={data.name} />
            {data.thumbnail?.url ? (
              <input type="hidden" name="image" value={data.thumbnail?.url} />
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

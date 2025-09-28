"use client";

import { testApi } from "@/lib/testApi";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function Test() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  // 現在のページ番号（URLパラメータから取得、デフォルトは1）
  const currentPage = parseInt(searchParams.get("page") || "1");

  // 1ページあたりの表示数
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await testApi();
        if (data) {
          setTodos(data);
        }
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ページネーション計算
  const totalItems = todos.length;
  // ページネーションで表示するページ数
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // TODO配列の表示開始インデックス
  const startIndex = (currentPage - 1) * itemsPerPage;
  // TODO配列の表示終了インデックス（1ページあたりの表示数）
  const endIndex = startIndex + itemsPerPage;
  // 現在のページに表示するTODO配列
  const currentTodos = todos.slice(startIndex, endIndex);

  // ページ変更関数
  const handlePageChange = (page: number) => {
    router.push(`/test?page=${page}`);
  };

  /**
   * ページネーションロジック
   */
  // ページネーションの数
  const maxVisiblePages = 5;
  // 1ページから前は表示しないように制限
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  // 最後のページから後は表示しないように制限
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // 最後のページが表示範囲に含まれる場合、開始ページを調整
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages: number[] = [];
  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full items-center mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8">TODO一覧</h1>

      {/* 現在のページ情報 */}
      <div className="mb-4 text-gray-600">
        {startIndex + 1}-{Math.min(endIndex, totalItems)} / {totalItems} 件
      </div>

      {/* TODOリスト */}
      <div className="w-full max-w-2xl space-y-4 mb-8">
        {currentTodos.map((item: Todo) => (
          <div
            key={item.id}
            className={`p-4 border rounded-lg ${
              item.completed
                ? "bg-green-50 border-green-200"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <p
                className={`${
                  item.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {item.title}
              </p>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  item.completed
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {item.completed ? "完了" : "未完了"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          {/* 最初のページボタン */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {"<<"}
          </button>
          {/* 前のページボタン */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {"<"}
          </button>

          {/* ページ番号（5つまで表示） */}
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded w-[40px] ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}

          {/* 次のページボタン */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {">"}
          </button>
          {/* 最後のページボタン */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {">>"}
          </button>
        </div>
      )}
    </div>
  );
}

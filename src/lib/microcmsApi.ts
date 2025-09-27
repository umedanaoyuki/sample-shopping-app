import { createClient, MicroCMSQueries } from "microcms-js-sdk";
import { Products } from "./mirocmsType";
const apiKey = process.env.MICROCMS_API_KEY || "";
const serviceDomain = process.env.MICROCMS_SERVICE_ID || "";

export const client = createClient({
  serviceDomain: serviceDomain,
  apiKey: apiKey,
});
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Products>({
    endpoint: "products",
    queries,
  });
  return listData;
};

export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.getListDetail<Products>({
    endpoint: "products",
    contentId,
    queries,
  });
  return detailData;
};

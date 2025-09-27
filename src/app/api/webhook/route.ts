import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { microcmsWebhookSecretkey } from "@/lib/microcmsApi";
export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-microcms-signature");
    const bodyText = await request.text();
    if (
      !signature ||
      !isValidSignature(bodyText, signature, microcmsWebhookSecretkey)
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const bodyJson = JSON.parse(bodyText);
    if (bodyJson.api !== "products") {
      return NextResponse.json("", { status: 201 });
    }
    const newData = bodyJson.contents.new;
    switch (bodyJson.type) {
      case "new": {
        await createStripeProduct(newData);
        break;
      }
      case "edit": {
        switch (newData.status[0]) {
          case "PUBLISH": {
            break;
          }
          case "CLOSED": {
            break;
          }
          case "DRAFT": {
            break;
          }
          default:
            break;
        }
      }
      case "delete": {
        break;
      }
      default:
        break;
    }
    return NextResponse.json({ status: "OK" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
function isValidSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expected, "hex")
  );
}
async function createStripeProduct(newData: any) {
  const { id, name, description, images, price } = newData.publishValue;
  const imageURLs = images.map(
    (imageObject: { url: string }) => imageObject.url
  );
  await stripe.products.create({
    id,
    name,
    description,
    images: imageURLs,
  });
  await stripe.prices.create({
    currency: "JPY",
    product: id,
    unit_amount: price,
  });
}

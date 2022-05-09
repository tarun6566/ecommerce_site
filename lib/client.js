import SanityClientConstructor from "@sanity/client";
import ImageUrlBuilder from '@sanity/image-url';

const client = SanityClientConstructor({
  projectId: "ov5p19ck",
  dataset: "production",
  apiVersion: "2022-05-04",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
export default client;

const builder=ImageUrlBuilder(client);

export const urlFor=(source)=>builder.image(source);
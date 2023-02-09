import { MARKDOWN_CONVERTER_API_URL } from "./url";
console.log("MARKDOWN_CONVERTER_API_URL", MARKDOWN_CONVERTER_API_URL);

// markdown conveter endpoints
const markdownConfig = {
  convertMarkdown: `${MARKDOWN_CONVERTER_API_URL}`,
};

export default markdownConfig;

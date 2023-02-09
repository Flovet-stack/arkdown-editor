import axios from "axios";
import markdownConfig from "../config/markdownConfig";

export class MarkdownService {
  constructor() {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  static ConvertMarkdown(data: string) {
    const requestData = { mode: "markdown", text: data };
    return axios.post(`${markdownConfig.convertMarkdown}`, requestData);
  }
}

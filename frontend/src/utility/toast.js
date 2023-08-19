import { toast } from "react-toastify";

export const toastify = (content, type = "error") => {
  toast(content, {
    position: "top-center",
    type: type,
  });
};

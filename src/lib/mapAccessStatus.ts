import { AccessStatus } from "./types";

export const mapAccessStatus = (value?: string): AccessStatus => {
  switch (value) {
    case "pending":
    case "approved":
    case "rejected":
      return value;
    default:
      return "none";
  }
};

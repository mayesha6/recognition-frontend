export const formatErrorMessage = (error: any, defaultMessage: string = "Something went wrong."): string => {
  let errMsg = error?.data?.message || error?.message || defaultMessage;
  
  if (typeof errMsg === "string" && errMsg.startsWith("[") && errMsg.endsWith("]")) {
    try {
      const parsed = JSON.parse(errMsg);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item: any) => item.message).join(", ");
      }
    } catch (e) {
      // ignore parsing error
    }
  }
  
  return errMsg;
};

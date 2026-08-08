export const formatErrorMessage = (error: any, defaultMessage: string = "Something went wrong."): string => {
  let errMsg = error?.data?.message || error?.message || defaultMessage;
  
  if (typeof errMsg === "string") {
    if (errMsg.includes("Incorrect API key") || errMsg.includes("invalid_api_key")) {
      return "AI service is temporarily unavailable due to an invalid API key configuration. Please contact support.";
    }
    if (errMsg.includes("insufficient_quota") || errMsg.includes("billing")) {
      return "AI service is temporarily unavailable due to insufficient balance/quota. Please check billing status.";
    }
    if (errMsg.includes("Rate limit") || errMsg.includes("rate_limit")) {
      return "AI service limit reached. Please try again after some time.";
    }

    if (errMsg.startsWith("[") && errMsg.endsWith("]")) {
      try {
        const parsed = JSON.parse(errMsg);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any) => item.message).join(", ");
        }
      } catch (e) {
        // ignore parsing error
      }
    }
  }
  
  return errMsg;
};

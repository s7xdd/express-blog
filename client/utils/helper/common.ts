
export const stringCompare = (a: any, b: any): number => {
  const stringA = (a || "").toString().toLowerCase();
  const stringB = (b || "").toString().toLowerCase();
  return stringA.localeCompare(stringB);
};

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return day + "th";
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  };

  return `${getDayWithSuffix(day)} ${month} ${year}`;
};

export const getStatusStyles = (status: STATUS_ENUM) => {
  switch (status) {
    case STATUS_ENUM.ACTIVE:
      return "text-green-500 bg-green-500/10";
    case STATUS_ENUM.INACTIVE:
      return "text-gray-500 bg-gray-500/10";

  }
}

export const getImageOrVideoUrl = (url: string) => {
  if (typeof url !== "string") return "";

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  return url.startsWith("http") ? url : `${baseURL}${url.startsWith("/") ? "" : "/"}${url}`;
};


export function prepareSubmission(data: any): any {
  const preparedData: any = {};
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (Array.isArray(value)) {
      preparedData[key] = value.filter((item: any) => !item?.isServer);
    } else {
      preparedData[key] = value;
    }
  });
  return preparedData;
}
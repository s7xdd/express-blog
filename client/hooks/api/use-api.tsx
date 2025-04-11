"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { ParamsProps } from "../../types/common";
import { handleApiRequest } from "../../config/wrapper/api-wrapper";

const useApi = (
  endpoint: string,
  method: "get" | "post" | "delete",
  options: {
    defaultParams?: ParamsProps;
    autoFetch?: boolean;
    isStatusChange?: boolean;
    toastSuccess?: boolean;
    toastError?: boolean;
  } = {},
) => {
  const { defaultParams = {}, autoFetch = false, toastSuccess = false, toastError = true } = options;

  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");

  const [params, setParams] = useState<ParamsProps>({
    ...defaultParams,
    page_size: 1,
    ...Object.fromEntries(searchParams.entries()),
  });

  const [shouldFetch, setShouldFetch] = useState(autoFetch);
  const isInitialMount = useRef(true);

  const fetchData = useCallback(
    async (overrideParams?: ParamsProps) => {
      setStatus("loading");
      setError(null);

      try {
        const finalParams = overrideParams ?? params;

        const { data: responseData, error: responseError } = await handleApiRequest(endpoint, method, {
          data: finalParams,
          params: finalParams,
          toastSuccess,
          toastError,
        });

        if (responseError || responseData?.error) {
          throw responseError || responseData?.error;
        }

        setData(responseData);
        setStatus("success");
        return responseData;
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
        setStatus("error");
        return null;
      }
    },
    [endpoint, method, params, toastSuccess, toastError],
  );

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
      setShouldFetch(false);
    }
  }, [shouldFetch, fetchData]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const newParams = {
      ...defaultParams,
      page_size: params.page_size,
      ...Object.fromEntries(searchParams.entries()),
    };

    setParams(newParams);
    fetchData(newParams);
  }, [searchParamsString]);

  const triggerRequest = (newParams?: ParamsProps) => {
    if (newParams) {
      setParams((prev) => ({ ...prev, ...newParams }));
    }
    setShouldFetch(true);
  };

  return {
    data,
    error,
    status,
    triggerRequest,
    params,
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
  };
};

export default useApi;

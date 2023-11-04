import { useState, useEffect } from "react";
import { MicroserviceErrorType, MicroserviceResponseType } from "../types/api_response";

const DATA_API_NOOP: fetchState = {
    myUrl: "",
    myParams: {},
};

export type fetchState = {
    myUrl: string;
    myParams: RequestInit;
};

function useMicroservice<T>(initialFetchState: fetchState, initialData: T, isStreaming: boolean = false) {
    const [microserviceResponse, setMicroserviceResponse] =
        useState<MicroserviceResponseType<T>>({ response: initialData });
    const [data, setData] = useState<T>(initialData);
    const [fetchState, setFetchState] = useState(initialFetchState);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<Partial<MicroserviceErrorType>>({
        code: null,
        message: "",
        details: [],
    });
    const [forceReFetchTrigger, setForceReFetchTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    function process_streamed_results(text_response: string): T {
        const data = text_response
            .split(/\n/)
            .filter((m) => !!m)
            .map((json) => {
                try {
                    return JSON.parse(json);
                } catch (jsonParseError) {
                    /* eslint-disable-next-line */
                    console.warn("Failed to parse response as JSON. Error:", jsonParseError, json);
                    return null;
                }
            });
        let final_output: unknown[] = [];
        data.forEach(function (one_result) {
            final_output.push(one_result.result);
        });
        return final_output as T;
    }

    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            if (!fetchState.myUrl) {
                console.warn("Received an empty fetch_via_microservice request");
                return;
            }
            setIsLoading(true);
            try {
                const serverResponse = await fetch(fetchState.myUrl, {
                    ...fetchState.myParams,
                    headers: {
                        "content-type": "application/json",
                    },
                });
                if (mounted && serverResponse.status !== 200) {
                    setError({
                        ...error,
                        message: serverResponse.statusText,
                    });
                    setIsLoaded(false);
                    setIsLoading(false);
                }
                let myResponse: T = {} as T;
                if (isStreaming) {
                    const text_response = await serverResponse.text();
                    myResponse = process_streamed_results(text_response);
                } else {
                    myResponse = await serverResponse.json();
                }
                if (mounted) {
                    const ms_response: Partial<MicroserviceResponseType<T>> = {
                        response: myResponse,
                    };
                    setMicroserviceResponse(ms_response);
                    setData(myResponse);
                    setIsLoaded(true);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("ERROR IS", error);
                if (mounted) {
                    setError(error);
                    setIsLoaded(false);
                    setIsLoading(false);
                }
            }
        };
        fetchData().then(() => {});
        //cleanup function
        return () => {
            mounted = false;
        };
    }, [fetchState, forceReFetchTrigger]);

    return {
        microserviceResponse,
        data,
        isLoaded,
        error,
        fetchState,
        setFetchState,
        setForceReFetchTrigger,
        forceReFetchTrigger,
        isLoading,
    };
}

export { DATA_API_NOOP, useMicroservice };
export default useMicroservice;

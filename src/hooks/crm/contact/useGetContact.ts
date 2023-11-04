import { useEffect } from "react";
import { DATA_API_NOOP, useMicroservice } from "../../useMicroservice";
import { get_contact_request, get_contact_response } from "../../../types/contact_requests";

function useGetContact(request: get_contact_request): get_contact_response {

    const initialData: get_contact_response = {
        contact: {}, 
        isLoading: true, 
    };

    const fetch_results = useMicroservice<get_contact_response>(DATA_API_NOOP, initialData);

    useEffect(() => {
        fetch_results.setFetchState({
            myUrl: "/v1/bff/acme/crmContact/get/" + request.guid,
            myParams: {
                method: "GET",
                headers: new Headers({ "content-type": "application/json" }),
                mode: "cors",
            },
        });
    }, [request.guid]);

    return {
        contact:
            fetch_results.microserviceResponse.response &&
            fetch_results.microserviceResponse.response.contact,
        isLoading: fetch_results.isLoading,
    };
}

export default useGetContact;

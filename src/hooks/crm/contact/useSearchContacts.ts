import { useEffect, useState } from "react";
import { DATA_API_NOOP, useMicroservice } from "../../useMicroservice";
import { search_contacts_request, search_contacts_response } from "../../../types/contact_requests";

function useSearchContacts(request: search_contacts_request): any {

   const initialData: search_contacts_response = {
        result: {
            contact: {},
        },
        isLoading: true, 
        error: {}, 
    };

    const fetch_results = useMicroservice<search_contacts_response>(DATA_API_NOOP, initialData, true);

    const [skip, set_skip] = useState(request.skip_initial_call);

    const options: RequestInit = {
        method: "post",
        headers: new Headers({ "content-type": "application/json" }),
        mode: "cors",
        body: JSON.stringify(request.entire_search),
    };
    useEffect(() => {
        if (skip) {
            set_skip(false);
        } else {
            fetch_results.setFetchState({
                myUrl: "/v1/bff/acme/crmContact/search",
                myParams: options,
            });
        }
    }, []);

    return {
        contacts: fetch_results.microserviceResponse && fetch_results.microserviceResponse.response,
        isLoading: fetch_results.isLoading,
    };
}

export default useSearchContacts;

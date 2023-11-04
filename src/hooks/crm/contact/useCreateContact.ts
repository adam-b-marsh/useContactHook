import { useEffect } from "react";
import { DATA_API_NOOP, useMicroservice } from "../../useMicroservice";
import { Contact } from "../../../types/contact";
import { create_contact_request, create_contact_response } from "../../../types/contact_requests";

function useCreateContact(request: create_contact_request): Partial<Contact> {

    const initialData: create_contact_response = {
        contact: {}, 
        isLoading: true, 
    };

    const fetch_results = useMicroservice<create_contact_response>(DATA_API_NOOP, initialData);

    useEffect(() => {
        fetch_results.setFetchState({
            myUrl: "/v1/bff/acme/crmContact/create",
            myParams: {
                method: "POST",
                headers: new Headers({ "content-type": "application/json" }),
                mode: "cors",
                body: JSON.stringify(request),
            },
        });
    }, []);
    return fetch_results.microserviceResponse.response && fetch_results.microserviceResponse.response.contact;
}

export default useCreateContact;

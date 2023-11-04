import { useEffect } from "react";
import { DATA_API_NOOP, useMicroservice } from "../../useMicroservice";
import { update_contact_request, update_contact_response } from "../../../types/contact_requests";
import useGetContact from "./useGetContact";

function useUpdateContact(request: update_contact_request): update_contact_response {

    const initialData: update_contact_response = {
        contact: {}, 
        isLoading: true, 
    };

    const fetch_results = useMicroservice<update_contact_response>(DATA_API_NOOP, initialData);
    //get the contact to load is current values
    let contact_to_update;
    if (request.contact.id) {
        contact_to_update = useGetContact({ guid: request.contact.id.value });
    }
    //over-write any new values that were passed in from the request onto the contact..except the id
    contact_to_update = {
        ...contact_to_update,
        ...request.contact,
    };

    const contact_request = {
        contact: contact_to_update,
    };

    useEffect(() => {
        fetch_results.setFetchState({
            myUrl: "/v1/bff/acme/crmContact/update",
            myParams: {
                method: "POST",
                headers: new Headers({ "content-type": "application/json" }),
                mode: "cors",
                body: JSON.stringify(contact_request),
            },
        });
    }, []);
    return {
        contact:
            fetch_results.microserviceResponse.response &&
            fetch_results.microserviceResponse.response.contact,
        isLoading: fetch_results.isLoading,
    };
}

export default useUpdateContact;

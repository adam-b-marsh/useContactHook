import { Contact } from "./contact";
import { crm_midtier_search } from "./crm_search_types";
import { MicroserviceErrorType } from "./api_response";

export type get_contact_request = {
    guid: string;
};
export type update_contact_request = {
    contact: Partial<Contact>;
};
export type create_contact_request = {
    contact: Partial<Contact>;
};
export type search_contacts_request = {
    entire_search: Partial<crm_midtier_search>;
    skip_initial_call: boolean;
};

export type get_contact_response = {
    contact: Partial<Contact>;
    isLoading?: boolean;
};
export type update_contact_response = {
    contact: Partial<Contact>;
    isLoading?: boolean;
};
export type create_contact_response = {
    contact: Partial<Contact>;
    isLoading?: boolean;
};
export type search_contacts_response = {
    result: {
        contact: Partial<Contact>;
    };
    isLoading?: boolean;
    error: MicroserviceErrorType;
};

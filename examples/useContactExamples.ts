import {
    get_contact_request,
    search_contacts_request,
} from "../src/types/contact_requests";
import useGetContact from "../src/hooks/crm/contact/useGetContact";
import { Match } from "../src/types/crm_search_types";
import useSearchContacts from "../src/hooks/crm/contact/useSearchContacts";
import { Contact, ContactType } from "../src/types/contact";
import useUpdateContact from "../src/hooks/crm/contact/useUpdateContact";
import useCreateContact from "../src/hooks/crm/contact/useCreateContact";

//GET
let my_get_request: get_contact_request = {guid: "48a6cb0e-62be-eb11-9113-005056a3e7eb"};
let a_contact = useGetContact(my_get_request)
console.log("GET result is", a_contact);

//SEARCH
let search_contact_request: search_contacts_request = { 
    entire_search: {
        search: {
            crm_entity_type: "contacts",
            search: [{
                criterion: [
                        {
                        match: Match.MATCH_EQUAL,
                        field_name: "firstname",
                        field_value: "john",
                    },
                ]
            }],
            return_all: true,
            limit: "5",
        },
    },
    skip_initial_call: false,
};

let contacts = useSearchContacts(search_contact_request);
console.log("SEARCH result is", contacts);

//UPDATE
let contact_to_update: Partial<Contact> = {
    id: {
        value: "48a6cb0e-62be-eb11-9113-005056a3e7eb",
        formatted_value: "",
    },
    first_name: "Obi-Wan",
};
let updated_contact = useUpdateContact({ contact: contact_to_update });
console.log("updated:", updated_contact);

//CREATE
let contact_to_create: Partial<Contact> = {
    first_name: "Darth",
    last_name: "Vader",
    email: "blah@blah.com",
    contact_type: {
        type: ContactType.TYPE_VENDOR_CONTACT,
        formatted_value: "",
    },
    owner_id: {
        value: "5733F073-6B09-EA11-90F9-005056A393E6",
        formatted_value: "",
    },
};
const created_contact = useCreateContact({ contact: contact_to_create });
console.log("created:", created_contact);


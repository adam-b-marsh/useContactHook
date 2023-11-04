import { FormattedGuid } from "./proto_formatted_types";

export enum ContactType {
    TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
    TYPE_ACCOUNT_CONTACT = "TYPE_ACCOUNT_CONTACT",
    TYPE_LOCAL_CONTACT = "TYPE_LOCAL_CONTACT",
    TYPE_SYSTEM_CONTACT = "TYPE_SYSTEM_CONTACT",
    TYPE_VENDOR_CONTACT = "TYPE_VENDOR_CONTACT",
    TYPE_BOOKABLE_RESOURCE = "TYPE_BOOKABLE_RESOURCE",
}

export enum ContactStatus {
    STATUS_UNSPECIFIED = "STATUS_UNSPECIFIED",
    STATUS_ACTIVE = "STATUS_ACTIVE",
    STATUS_INACTIVE = "STATUS_INACTIVE",
}
export type Contact = {
    id: FormattedGuid;
    vendor_id: FormattedGuid;
    account_id: FormattedGuid;
    first_name: string;
    last_name: string;
    mobile_phone: string;
    email: string;
    job_title?: string;
    business_phone_1?: string;
    business_phone_2?: string;
    home_phone?: string;
    contact_type: {
        type: ContactType;
        formatted_value: string;
    };
    contact_status: {
        status: ContactStatus;
        formatted_value: string;
    };
    owner_id: {
        value: string;
        formatted_value: string;
    };
    send_accessLog_receipt?: boolean;
};

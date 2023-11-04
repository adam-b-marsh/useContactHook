export type crm_midtier_search = {
    search?: Partial<{
        crm_entity_type: string;
        search: [Partial<criterion_object>];
        return_all?: boolean;
        fields_to_return?: {
            fields_to_return: string[];
        };
        limit: string;
    }>;
};

export type criterion_object = {
    criterion?: Partial<Array<one_crm_search_criterion>>;
};

export enum Match {
    MATCH_UNSPECIFIED = "MATCH_UNSPECIFIED",
    MATCH_EQUAL = "MATCH_EQUAL",
    MATCH_CONTAINS = "MATCH_CONTAINS",
    MATCH_DOES_NOT_CONTAIN = "MATCH_DOES_NOT_CONTAIN",
    MATCH_GREATER_THAN = "MATCH_GREATER_THAN",
    MATCH_LESS_THAN = "MATCH_LESS_THAN",
    MATCH_GREAT_THAN_OR_EQUAL = "MATCH_GREATER_THAN_OR_EQUAL",
    MATCH_LESS_THAN_OR_EQUAL = "MATCH_LESS_THAN_OR_EQUAL",
    MATCH_STARTS_WITH = "MATCH_STARTS_WITH",
    MATCH_ENDS_WITH = "MATCH_ENDS_WITH",
    MATCH_REGEX = "MATCH_REGEX",
    MATCH_NOT_EQUAL = "MATCH_NOT_EQUAL",
}

export type one_crm_search_criterion = {
    match?: Match;
    field_name?: string;
    field_value?: string;
};

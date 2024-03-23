/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A ModelSerializer that takes an additional `fields` argument that
 * controls which fields should be displayed.
 */
export type PatchedMember = {
    readonly id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    readonly full_name?: string;
    readonly short_name?: string;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username?: string;
    readonly real_name?: string;
    nickname?: string;
    birth_date?: string | null;
    liu_id?: string;
    pronouns?: string;
    street_address?: string;
    postal_code?: string;
    postal_town?: string;
    postal_country?: string;
    phone_number_1?: string;
    phone_number_2?: string;
    phone_number_3?: string;
    arbitrary_text?: string;
    national_id?: string;
    profile_picture?: string;
    readonly active_period?: string;
    readonly memberships?: Array<Record<string, any>>;
    readonly engagements?: Array<Record<string, any>>;
    readonly complete_adress?: string;
};


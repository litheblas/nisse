/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A ModelSerializer that takes an additional `fields` argument that
 * controls which fields should be displayed.
 */
export type Member = {
    readonly id: string;
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
    readonly active_period: string;
};

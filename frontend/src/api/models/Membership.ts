/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * A ModelSerializer that takes an additional `fields` argument that
 * controls which fields should be displayed.
 */
export type Membership = {
    readonly id: string;
    readonly membershipType: Record<string, any>;
    readonly member: Record<string, any>;
    start: string;
    end?: string | null;
    is_trial: boolean;
};

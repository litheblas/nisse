/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Attendee } from './Attendee';
import type { EventTypeEnum } from './EventTypeEnum';
/**
 * A ModelSerializer that takes an additional `fields` argument that
 * controls which fields should be displayed.
 */
export type PatchedEvent = {
    readonly attendees?: Array<Attendee>;
    readonly creator?: string;
    description?: string;
    end_time?: string;
    readonly id?: string;
    location?: string;
    full_day?: boolean;
    name?: string;
    start_time?: string;
    event_type?: EventTypeEnum;
};


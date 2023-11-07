/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventTypeEnum } from './EventTypeEnum';

export type PatchedEvent = {
    attendees?: Array<string>;
    creator?: string | null;
    description?: string;
    end_time?: string;
    readonly id?: string;
    location?: string;
    name?: string;
    start_time?: string;
    event_type?: EventTypeEnum;
};

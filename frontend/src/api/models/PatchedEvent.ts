/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Attendee } from './Attendee';
import type { EventTypeEnum } from './EventTypeEnum';

/**
 * attendees = serializers.SlugRelatedField(
     * many=True,
     * read_only=True,
     * slug_field="full_name",  # TODO: Change this to another field containing both profile_picture and full_name
     * )
     */
    export type PatchedEvent = {
        readonly attendees?: Array<Attendee>;
        creator?: string | null;
        description?: string;
        end_time?: string;
        readonly id?: string;
        location?: string;
        name?: string;
        start_time?: string;
        event_type?: EventTypeEnum;
    };

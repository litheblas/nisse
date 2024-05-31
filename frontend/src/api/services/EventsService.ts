/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Event } from '../models/Event';
import type { PatchedEvent } from '../models/PatchedEvent';
import type { StringList } from '../models/StringList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EventsService {
    /**
     * @returns Event
     * @throws ApiError
     */
    public static eventsList(): CancelablePromise<Array<Event>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/events/',
        });
    }
    /**
     * @param requestBody
     * @returns Event
     * @throws ApiError
     */
    public static eventsCreate(
        requestBody: Event,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/events/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A UUID string identifying this event.
     * @returns Event
     * @throws ApiError
     */
    public static eventsRetrieve(
        id: string,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/events/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A UUID string identifying this event.
     * @param requestBody
     * @returns Event
     * @throws ApiError
     */
    public static eventsUpdate(
        id: string,
        requestBody: Event,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/events/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A UUID string identifying this event.
     * @param requestBody
     * @returns Event
     * @throws ApiError
     */
    public static eventsPartialUpdate(
        id: string,
        requestBody?: PatchedEvent,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/events/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A UUID string identifying this event.
     * @returns void
     * @throws ApiError
     */
    public static eventsDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/events/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A UUID string identifying this event.
     * @param memberId
     * @returns boolean
     * @throws ApiError
     */
    public static eventsIsAttendingRetrieve(
        id: string,
        memberId?: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/events/{id}/is_attending/',
            path: {
                'id': id,
            },
            query: {
                'member_id': memberId,
            },
        });
    }
    /**
     * Register attendees for the event.
     * @param id A UUID string identifying this event.
     * @param requestBody
     * @returns Event
     * @throws ApiError
     */
    public static eventsRegisterAttendeesCreate(
        id: string,
        requestBody: StringList,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/events/{id}/register_attendees/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Unregister attendees for the event.
     * @param id A UUID string identifying this event.
     * @param requestBody
     * @returns Event
     * @throws ApiError
     */
    public static eventsUnregisterAttendeesCreate(
        id: string,
        requestBody: StringList,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/events/{id}/unregister_attendees/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Event
     * @throws ApiError
     */
    public static eventsListUpcomingList(): CancelablePromise<Array<Event>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/events/list_upcoming/',
        });
    }
}

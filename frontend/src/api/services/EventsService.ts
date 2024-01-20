/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Event } from '../models/Event';
import type { PatchedEvent } from '../models/PatchedEvent';

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
     * @param requestBody
     * @returns Event
     * @throws ApiError
     */
    public static eventsRegisterCreate(
        requestBody: Event,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/events/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns Event
     * @throws ApiError
     */
    public static eventsUnregisterCreate(
        requestBody: Event,
    ): CancelablePromise<Event> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/events/unregister',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}

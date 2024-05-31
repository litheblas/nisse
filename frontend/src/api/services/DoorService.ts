/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DoorService {

    /**
     * Sends a HTTP-request through a reverse ssh-tunnel to lådan lådan in Blåsrummet to open the door
     * @returns any No response body
     * @throws ApiError
     */
    public static doorCreate(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/door/',
        });
    }

}

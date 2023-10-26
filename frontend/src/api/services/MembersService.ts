/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Member } from '../models/Member';
import type { PatchedMember } from '../models/PatchedMember';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MembersService {

    /**
     * @returns Member
     * @throws ApiError
     */
    public static membersList(): CancelablePromise<Array<Member>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/',
        });
    }

    /**
     * @param requestBody
     * @returns Member
     * @throws ApiError
     */
    public static membersCreate(
        requestBody?: Member,
    ): CancelablePromise<Member> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/members/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id A UUID string identifying this member.
     * @returns Member
     * @throws ApiError
     */
    public static membersRetrieve(
        id: string,
    ): CancelablePromise<Member> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/{id}/',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id A UUID string identifying this member.
     * @param requestBody
     * @returns Member
     * @throws ApiError
     */
    public static membersUpdate(
        id: string,
        requestBody?: Member,
    ): CancelablePromise<Member> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/members/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id A UUID string identifying this member.
     * @param requestBody
     * @returns Member
     * @throws ApiError
     */
    public static membersPartialUpdate(
        id: string,
        requestBody?: PatchedMember,
    ): CancelablePromise<Member> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/members/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id A UUID string identifying this member.
     * @returns void
     * @throws ApiError
     */
    public static membersDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/members/{id}/',
            path: {
                'id': id,
            },
        });
    }

}

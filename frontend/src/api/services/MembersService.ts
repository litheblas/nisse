/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Engagement } from '../models/Engagement';
import type { EngagementType } from '../models/EngagementType';
import type { Member } from '../models/Member';
import type { Membership } from '../models/Membership';
import type { MembershipType } from '../models/MembershipType';
import type { PatchedEngagement } from '../models/PatchedEngagement';
import type { PatchedEngagementType } from '../models/PatchedEngagementType';
import type { PatchedMember } from '../models/PatchedMember';
import type { PatchedMembership } from '../models/PatchedMembership';
import type { PatchedMembershipType } from '../models/PatchedMembershipType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MembersService {
    /**
     * @param fields
     * @returns Member
     * @throws ApiError
     */
    public static membersList(
        fields?: string,
    ): CancelablePromise<Array<Member>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/',
            query: {
                'fields': fields,
            },
        });
    }
    /**
     * @param formData
     * @returns Member
     * @throws ApiError
     */
    public static membersCreate(
        formData: Member,
    ): CancelablePromise<Member> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/members/',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this member.
     * @param fields
     * @returns Member
     * @throws ApiError
     */
    public static membersRetrieve(
        id: string,
        fields?: string,
    ): CancelablePromise<Member> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/{id}/',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
        });
    }
    /**
     * @param id A UUID string identifying this member.
     * @param formData
     * @returns Member
     * @throws ApiError
     */
    public static membersUpdate(
        id: string,
        formData: Member,
    ): CancelablePromise<Member> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/members/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this member.
     * @param formData
     * @returns Member
     * @throws ApiError
     */
    public static membersPartialUpdate(
        id: string,
        formData?: PatchedMember,
    ): CancelablePromise<Member> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/members/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
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
    /**
     * @param fields
     * @returns Engagement
     * @throws ApiError
     */
    public static membersEngagementList(
        fields?: string,
    ): CancelablePromise<Array<Engagement>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/engagement/',
            query: {
                'fields': fields,
            },
        });
    }
    /**
     * @param formData
     * @returns Engagement
     * @throws ApiError
     */
    public static membersEngagementCreate(
        formData: Engagement,
    ): CancelablePromise<Engagement> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/members/engagement/',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this engagement.
     * @param fields
     * @returns Engagement
     * @throws ApiError
     */
    public static membersEngagementRetrieve(
        id: string,
        fields?: string,
    ): CancelablePromise<Engagement> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/engagement/{id}/',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
        });
    }
    /**
     * @param id A UUID string identifying this engagement.
     * @param formData
     * @returns Engagement
     * @throws ApiError
     */
    public static membersEngagementUpdate(
        id: string,
        formData: Engagement,
    ): CancelablePromise<Engagement> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/members/engagement/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this engagement.
     * @param formData
     * @returns Engagement
     * @throws ApiError
     */
    public static membersEngagementPartialUpdate(
        id: string,
        formData?: PatchedEngagement,
    ): CancelablePromise<Engagement> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/members/engagement/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this engagement.
     * @returns void
     * @throws ApiError
     */
    public static membersEngagementDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/members/engagement/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param fields
     * @returns EngagementType
     * @throws ApiError
     */
    public static membersEngagementtypeList(
        fields?: string,
    ): CancelablePromise<Array<EngagementType>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/engagementtype/',
            query: {
                'fields': fields,
            },
        });
    }
    /**
     * @param formData
     * @returns EngagementType
     * @throws ApiError
     */
    public static membersEngagementtypeCreate(
        formData: EngagementType,
    ): CancelablePromise<EngagementType> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/members/engagementtype/',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this engagement type.
     * @param fields
     * @returns EngagementType
     * @throws ApiError
     */
    public static membersEngagementtypeRetrieve(
        id: string,
        fields?: string,
    ): CancelablePromise<EngagementType> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/engagementtype/{id}/',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
        });
    }
    /**
     * @param id A UUID string identifying this engagement type.
     * @param formData
     * @returns EngagementType
     * @throws ApiError
     */
    public static membersEngagementtypeUpdate(
        id: string,
        formData: EngagementType,
    ): CancelablePromise<EngagementType> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/members/engagementtype/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this engagement type.
     * @param formData
     * @returns EngagementType
     * @throws ApiError
     */
    public static membersEngagementtypePartialUpdate(
        id: string,
        formData?: PatchedEngagementType,
    ): CancelablePromise<EngagementType> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/members/engagementtype/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this engagement type.
     * @returns void
     * @throws ApiError
     */
    public static membersEngagementtypeDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/members/engagementtype/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param fields
     * @returns Membership
     * @throws ApiError
     */
    public static membersMembershipList(
        fields?: string,
    ): CancelablePromise<Array<Membership>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/membership/',
            query: {
                'fields': fields,
            },
        });
    }
    /**
     * @param formData
     * @returns Membership
     * @throws ApiError
     */
    public static membersMembershipCreate(
        formData: Membership,
    ): CancelablePromise<Membership> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/members/membership/',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this membership.
     * @param fields
     * @returns Membership
     * @throws ApiError
     */
    public static membersMembershipRetrieve(
        id: string,
        fields?: string,
    ): CancelablePromise<Membership> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/membership/{id}/',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
        });
    }
    /**
     * @param id A UUID string identifying this membership.
     * @param formData
     * @returns Membership
     * @throws ApiError
     */
    public static membersMembershipUpdate(
        id: string,
        formData: Membership,
    ): CancelablePromise<Membership> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/members/membership/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this membership.
     * @param formData
     * @returns Membership
     * @throws ApiError
     */
    public static membersMembershipPartialUpdate(
        id: string,
        formData?: PatchedMembership,
    ): CancelablePromise<Membership> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/members/membership/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this membership.
     * @returns void
     * @throws ApiError
     */
    public static membersMembershipDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/members/membership/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param fields
     * @returns MembershipType
     * @throws ApiError
     */
    public static membersMembershiptypeList(
        fields?: string,
    ): CancelablePromise<Array<MembershipType>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/membershiptype/',
            query: {
                'fields': fields,
            },
        });
    }
    /**
     * @param formData
     * @returns MembershipType
     * @throws ApiError
     */
    public static membersMembershiptypeCreate(
        formData: MembershipType,
    ): CancelablePromise<MembershipType> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/members/membershiptype/',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this membership type.
     * @param fields
     * @returns MembershipType
     * @throws ApiError
     */
    public static membersMembershiptypeRetrieve(
        id: string,
        fields?: string,
    ): CancelablePromise<MembershipType> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/members/membershiptype/{id}/',
            path: {
                'id': id,
            },
            query: {
                'fields': fields,
            },
        });
    }
    /**
     * @param id A UUID string identifying this membership type.
     * @param formData
     * @returns MembershipType
     * @throws ApiError
     */
    public static membersMembershiptypeUpdate(
        id: string,
        formData: MembershipType,
    ): CancelablePromise<MembershipType> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/members/membershiptype/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this membership type.
     * @param formData
     * @returns MembershipType
     * @throws ApiError
     */
    public static membersMembershiptypePartialUpdate(
        id: string,
        formData?: PatchedMembershipType,
    ): CancelablePromise<MembershipType> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/members/membershiptype/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A UUID string identifying this membership type.
     * @returns void
     * @throws ApiError
     */
    public static membersMembershiptypeDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/members/membershiptype/{id}/',
            path: {
                'id': id,
            },
        });
    }
}

/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime'
import { fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime'
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OauthController } from './router/routes/oauth/controller'
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HealthcheckController } from './router/routes/healthcheck/controller'
import type {
    Request as ExRequest,
    Response as ExResponse,
    RequestHandler,
    Router,
} from 'express'

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    LoginURL: {
        dataType: 'refAlias',
        type: {
            dataType: 'nestedObjectLiteral',
            nestedProperties: { url: { dataType: 'string', required: true } },
            validators: {},
        },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    LoginBody: {
        dataType: 'refAlias',
        type: {
            dataType: 'nestedObjectLiteral',
            nestedProperties: {
                handle: { dataType: 'string', required: true },
            },
            validators: {},
        },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    LogoutResponse: {
        dataType: 'refAlias',
        type: {
            dataType: 'nestedObjectLiteral',
            nestedProperties: {
                message: { dataType: 'string', required: true },
            },
            validators: {},
        },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    ProfileAssociatedChat: {
        dataType: 'refObject',
        properties: {
            allowIncoming: {
                dataType: 'union',
                subSchemas: [
                    { dataType: 'enum', enums: ['all'] },
                    { dataType: 'enum', enums: ['none'] },
                    { dataType: 'enum', enums: ['following'] },
                    {
                        dataType: 'intersection',
                        subSchemas: [
                            { dataType: 'string' },
                            {
                                dataType: 'nestedObjectLiteral',
                                nestedProperties: {},
                            },
                        ],
                    },
                ],
                required: true,
            },
        },
        additionalProperties: { dataType: 'any' },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    ProfileAssociated: {
        dataType: 'refObject',
        properties: {
            lists: { dataType: 'double' },
            feedgens: { dataType: 'double' },
            starterPacks: { dataType: 'double' },
            labeler: { dataType: 'boolean' },
            chat: { ref: 'ProfileAssociatedChat' },
        },
        additionalProperties: { dataType: 'any' },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    ListPurpose: {
        dataType: 'refAlias',
        type: {
            dataType: 'union',
            subSchemas: [
                { dataType: 'enum', enums: ['app.bsky.graph.defs#modlist'] },
                { dataType: 'enum', enums: ['app.bsky.graph.defs#curatelist'] },
                {
                    dataType: 'enum',
                    enums: ['app.bsky.graph.defs#referencelist'],
                },
                {
                    dataType: 'intersection',
                    subSchemas: [
                        { dataType: 'string' },
                        {
                            dataType: 'nestedObjectLiteral',
                            nestedProperties: {},
                        },
                    ],
                },
            ],
            validators: {},
        },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    Uint8Array: {
        dataType: 'refObject',
        properties: {},
        additionalProperties: false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    Label: {
        dataType: 'refObject',
        properties: {
            ver: { dataType: 'double' },
            src: { dataType: 'string', required: true },
            uri: { dataType: 'string', required: true },
            cid: { dataType: 'string' },
            val: { dataType: 'string', required: true },
            neg: { dataType: 'boolean' },
            cts: { dataType: 'string', required: true },
            exp: { dataType: 'string' },
            sig: { ref: 'Uint8Array' },
        },
        additionalProperties: { dataType: 'any' },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    ListViewerState: {
        dataType: 'refObject',
        properties: {
            muted: { dataType: 'boolean' },
            blocked: { dataType: 'string' },
        },
        additionalProperties: { dataType: 'any' },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    ListViewBasic: {
        dataType: 'refObject',
        properties: {
            uri: { dataType: 'string', required: true },
            cid: { dataType: 'string', required: true },
            name: { dataType: 'string', required: true },
            purpose: { ref: 'ListPurpose', required: true },
            avatar: { dataType: 'string' },
            listItemCount: { dataType: 'double' },
            labels: {
                dataType: 'array',
                array: { dataType: 'refObject', ref: 'Label' },
            },
            viewer: { ref: 'ListViewerState' },
            indexedAt: { dataType: 'string' },
        },
        additionalProperties: { dataType: 'any' },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    ProfileViewBasic: {
        dataType: 'refObject',
        properties: {
            did: { dataType: 'string', required: true },
            handle: { dataType: 'string', required: true },
            displayName: { dataType: 'string' },
            avatar: { dataType: 'string' },
            associated: { ref: 'ProfileAssociated' },
            viewer: { ref: 'ViewerState' },
            labels: {
                dataType: 'array',
                array: { dataType: 'refObject', ref: 'Label' },
            },
            createdAt: { dataType: 'string' },
        },
        additionalProperties: { dataType: 'any' },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    KnownFollowers: {
        dataType: 'refObject',
        properties: {
            count: { dataType: 'double', required: true },
            followers: {
                dataType: 'array',
                array: { dataType: 'refObject', ref: 'ProfileViewBasic' },
                required: true,
            },
        },
        additionalProperties: { dataType: 'any' },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    ViewerState: {
        dataType: 'refObject',
        properties: {
            muted: { dataType: 'boolean' },
            mutedByList: { ref: 'ListViewBasic' },
            blockedBy: { dataType: 'boolean' },
            blocking: { dataType: 'string' },
            blockingByList: { ref: 'ListViewBasic' },
            following: { dataType: 'string' },
            followedBy: { dataType: 'string' },
            knownFollowers: { ref: 'KnownFollowers' },
        },
        additionalProperties: { dataType: 'any' },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    StarterPackViewBasic: {
        dataType: 'refObject',
        properties: {
            uri: { dataType: 'string', required: true },
            cid: { dataType: 'string', required: true },
            record: {
                dataType: 'nestedObjectLiteral',
                nestedProperties: {},
                required: true,
            },
            creator: { ref: 'ProfileViewBasic', required: true },
            listItemCount: { dataType: 'double' },
            joinedWeekCount: { dataType: 'double' },
            joinedAllTimeCount: { dataType: 'double' },
            labels: {
                dataType: 'array',
                array: { dataType: 'refObject', ref: 'Label' },
            },
            indexedAt: { dataType: 'string', required: true },
        },
        additionalProperties: { dataType: 'any' },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    Main: {
        dataType: 'refObject',
        properties: {
            uri: { dataType: 'string', required: true },
            cid: { dataType: 'string', required: true },
        },
        additionalProperties: { dataType: 'any' },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    ProfileViewDetailed: {
        dataType: 'refObject',
        properties: {
            did: { dataType: 'string', required: true },
            handle: { dataType: 'string', required: true },
            displayName: { dataType: 'string' },
            description: { dataType: 'string' },
            avatar: { dataType: 'string' },
            banner: { dataType: 'string' },
            followersCount: { dataType: 'double' },
            followsCount: { dataType: 'double' },
            postsCount: { dataType: 'double' },
            associated: { ref: 'ProfileAssociated' },
            joinedViaStarterPack: { ref: 'StarterPackViewBasic' },
            indexedAt: { dataType: 'string' },
            createdAt: { dataType: 'string' },
            viewer: { ref: 'ViewerState' },
            labels: {
                dataType: 'array',
                array: { dataType: 'refObject', ref: 'Label' },
            },
            pinnedPost: { ref: 'Main' },
        },
        additionalProperties: { dataType: 'any' },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    UserInfo: {
        dataType: 'refAlias',
        type: { ref: 'ProfileViewDetailed', validators: {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
const templateService = new ExpressTemplateService(models, {
    noImplicitAdditionalProperties: 'throw-on-extras',
    bodyCoercion: true,
})

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################

    const argsOauthController_login: Record<string, TsoaRoute.ParameterSchema> =
        {
            req: {
                in: 'request',
                name: 'req',
                required: true,
                dataType: 'object',
            },
            undefined: { in: 'body', required: true, ref: 'LoginBody' },
        }
    app.post(
        '/oauth/login',
        ...fetchMiddlewares<RequestHandler>(OauthController),
        ...fetchMiddlewares<RequestHandler>(OauthController.prototype.login),

        async function OauthController_login(
            request: ExRequest,
            response: ExResponse,
            next: any
        ) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = templateService.getValidatedArgs({
                    args: argsOauthController_login,
                    request,
                    response,
                })

                const controller = new OauthController()

                await templateService.apiHandler({
                    methodName: 'login',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                })
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsOauthController_callback: Record<
        string,
        TsoaRoute.ParameterSchema
    > = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
        redirect: {
            in: 'res',
            name: '302',
            required: true,
            dataType: 'nestedObjectLiteral',
            nestedProperties: {
                Location: { dataType: 'string', required: true },
            },
        },
    }
    app.get(
        '/oauth/callback',
        ...fetchMiddlewares<RequestHandler>(OauthController),
        ...fetchMiddlewares<RequestHandler>(OauthController.prototype.callback),

        async function OauthController_callback(
            request: ExRequest,
            response: ExResponse,
            next: any
        ) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = templateService.getValidatedArgs({
                    args: argsOauthController_callback,
                    request,
                    response,
                })

                const controller = new OauthController()

                await templateService.apiHandler({
                    methodName: 'callback',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 302,
                })
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsOauthController_logout: Record<
        string,
        TsoaRoute.ParameterSchema
    > = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    }
    app.post(
        '/oauth/logout',
        ...fetchMiddlewares<RequestHandler>(OauthController),
        ...fetchMiddlewares<RequestHandler>(OauthController.prototype.logout),

        async function OauthController_logout(
            request: ExRequest,
            response: ExResponse,
            next: any
        ) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = templateService.getValidatedArgs({
                    args: argsOauthController_logout,
                    request,
                    response,
                })

                const controller = new OauthController()

                await templateService.apiHandler({
                    methodName: 'logout',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                })
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsOauthController_userinfo: Record<
        string,
        TsoaRoute.ParameterSchema
    > = {
        req: { in: 'request', name: 'req', required: true, dataType: 'object' },
    }
    app.get(
        '/oauth/userinfo',
        ...fetchMiddlewares<RequestHandler>(OauthController),
        ...fetchMiddlewares<RequestHandler>(OauthController.prototype.userinfo),

        async function OauthController_userinfo(
            request: ExRequest,
            response: ExResponse,
            next: any
        ) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = templateService.getValidatedArgs({
                    args: argsOauthController_userinfo,
                    request,
                    response,
                })

                const controller = new OauthController()

                await templateService.apiHandler({
                    methodName: 'userinfo',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                })
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsHealthcheckController_healthcheck: Record<
        string,
        TsoaRoute.ParameterSchema
    > = {}
    app.get(
        '/healthcheck',
        ...fetchMiddlewares<RequestHandler>(HealthcheckController),
        ...fetchMiddlewares<RequestHandler>(
            HealthcheckController.prototype.healthcheck
        ),

        async function HealthcheckController_healthcheck(
            request: ExRequest,
            response: ExResponse,
            next: any
        ) {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = []
            try {
                validatedArgs = templateService.getValidatedArgs({
                    args: argsHealthcheckController_healthcheck,
                    request,
                    response,
                })

                const controller = new HealthcheckController()

                await templateService.apiHandler({
                    methodName: 'healthcheck',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 200,
                })
            } catch (err) {
                return next(err)
            }
        }
    )
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

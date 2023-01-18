export declare type AppRole = 'role_user' | 'role_admin' | 'role_uk' | 'role_nonuk';

export declare type AppScope = 'scope_customer:read' | 'scope_customer:write'

export interface Permission {
    id: string
    code: string
    description?: string
}

export interface Role {
    id: string
    code: string,
    description?: string,
    roles?: Array<Role>,
    permissions?: Array<Permission>
}

export interface AccessMapping {
    role: AppRole,
    permissions: Array<AppScope>
}

export interface AccessDetails {
    details: Array<AccessMapping>
}
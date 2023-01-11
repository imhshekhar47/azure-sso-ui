
export interface UserProfile {
    id: string,
    displayName: string,
    givenName: string,
    jobTitle: string,
    mail: string,
    officeLocation?: string,
    userPrincipalName?: string
}

export const UndefinedUserProfile: UserProfile = { id: "", displayName: "Anonymous", givenName: "anonymous", jobTitle: "", mail: "" };

export declare type AppRole = 'role_user' | 'role_admin' | 'role_uk' | 'role_nonuk';

export declare type AppScope = 
    'scope_customer:read' | 'scope_customer:write'

export class AppUser {

    constructor(
        public username: string,
        public profile?: UserProfile,
        private roles?: Array<AppRole>,
        private permissions?: Array<AppScope>) { }

    
    isValid(): boolean {
        return this != UndefinedUser;
    }

    hasRole(role: AppRole): boolean {
        return (this.roles?.indexOf(role) != -1) || false ;
    }

    private hasAnyRoleIn(roles: Array<AppRole>): boolean {
        const intersect: Array<AppRole> = roles.filter((e) => this.roles?.includes(e))
        return intersect.length > 0;
    }

    private hasAllRolesIn(roles: Array<AppRole>): boolean {
        for (let role of roles) {
            if (this.roles?.indexOf(role) == -1) {
                //console.log(`role ${role} is missing`);
                return false;
            }
        }

        return true;
    }

    hasPermission(scope: AppScope): boolean {
        return (this.permissions?.indexOf(scope) != -1) || false;
    }

    private hasAnyPermissionIn(permissions: Array<AppScope>): boolean {
        const intersect: Array<AppScope> = permissions.filter((e) => this.permissions?.includes(e))
        return intersect.length > 0;
    }

    private hasAllPermissionsIn(permissions: Array<AppScope>): boolean {
        for (let permission of permissions) {
            if (this.permissions?.indexOf(permission) == -1) {
                return false;
            }
        }

        return true;
    }

    hasAuthority(authority: Array<AppRole | AppScope>): boolean {
        let expected_roles: Array<AppRole> = [];
        let expected_scopes: Array<AppScope> = [];

        authority.forEach((item) => {
            if(item.startsWith('role_')) {
                expected_roles = [...expected_roles, item as AppRole];
            }
            else if(item.startsWith('scope_')) {
                expected_scopes = [...expected_scopes, item as AppScope];
            }
        });

    
        return (expected_roles.length > 0 ? this.hasAllRolesIn(expected_roles) : true) 
            && (expected_scopes.length > 0 ? this.hasAllPermissionsIn(expected_scopes) : true);
    }

    hasAnyAuthority(authority: Array<AppRole | AppScope>): boolean {
        let expected_roles: Array<AppRole> = [];
        let expected_scopes: Array<AppScope> = [];

        authority.forEach((item) => {
            if(item.startsWith('role_')) {
                expected_roles = [...expected_roles, item as AppRole];
            }
            else if(item.startsWith('scope_')) {
                expected_scopes = [...expected_scopes, item as AppScope];
            }
        });

    
        return (expected_roles.length > 0 ? this.hasAnyRoleIn(expected_roles) : true) 
            && (expected_scopes.length > 0 ? this.hasAnyPermissionIn(expected_scopes) : true);
    }

}

export const UndefinedUser: AppUser = new AppUser('anonymous'); 
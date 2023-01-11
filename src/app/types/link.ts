import { AppRole, AppScope } from "./user";

export declare type AppLinkCriteria = 'hasAny' | 'hasAll';

export interface AppLink {
    label: string,
    icons?: string,
    isGroup?: boolean,
    path?: string,
    hasAuthority?: Array<AppRole | AppScope>,
    hasAnyAuthority?: Array<AppRole | AppScope>,
    children?: Array<AppLink>,
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../types/user';




@Injectable({providedIn: 'root'})
export class GraphApiService {

    private _baseUrl: string;

    constructor(private httpClient: HttpClient) { 
        this._baseUrl =  "https://graph.microsoft.com/v1.0";
    }

    private _getUrl(apiPath: string): string {
        return `${this._baseUrl}${apiPath}`
    }
    
    getProfile(): Observable<UserProfile> {
        return this.httpClient.get<UserProfile>(this._getUrl("/me"));
    }
}
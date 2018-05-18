import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { localUser } from "../models/local_user";
import { StorageService } from "./storage.services";

@Injectable()
export class AuthService{
 
    constructor(public http: HttpClient, public storage : StorageService) {

    }
    authenticate (creds : CredenciaisDTO){
        return this.http.post( 
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
    successfulLogin(authorizationValue : String) {
        let tok = authorizationValue.substring(7);
        let user : localUser = {
            token : tok
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
    }
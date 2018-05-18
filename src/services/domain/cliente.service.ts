import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClienteDTO } from "../../models/clinte.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.services";


@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storage: StorageService) {

    }

    findByEmail(email: string) : Observable<ClienteDTO> {
            
              return this.http.get<ClienteDTO>(
                  `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
          }
          getImageFromBucket(id : string) : Observable<any> {
                    let url = `${API_CONFIG.buckectBaseUrl}/cp${id}.jpg`
                    return this.http.get(url, {responseType : 'blob'});
            }
}
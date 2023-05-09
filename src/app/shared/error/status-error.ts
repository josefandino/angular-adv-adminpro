import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GetServerErrorMessage {
  
    constructor(
  ) { }
  
  statusError(error: HttpErrorResponse): string {
    console.log(error);

    const status = error.status;
    
    switch (status) {
      case 0: { return `Hable con el Equipo de Soporte: ${error.message}`; }
      case 400: { return `Bad Reques: ${error.message}`; }
      case 401: { return `Access Denied: ${error.message}`; }
      case 403: { return `Access Denied: ${error.message}`; }
      case 404: { return `Not Found: ${error.message}`; }
      case 500: { return `Internal Server Error: ${error.message}`; }
      default: { return `Unknown Server Error: ${error.message}`; }
    }
  }
  
 
}
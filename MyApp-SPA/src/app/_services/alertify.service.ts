import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

// tslint:disable-next-line: typedef
confirm(message: string, okCallback: () => any )
{
  alertify.confirm(message, (e: any) => {
    if (e)
    {
      okCallback();
    }
    else {}
  });
}

// tslint:disable-next-line: typedef
success(message: any){
  alertify.success(message);
}
// tslint:disable-next-line: typedef
error(message: any){
  alertify.error(message);
}

// tslint:disable-next-line: typedef
warning(message: any){
  alertify.warning(message);
}

// tslint:disable-next-line: typedef
message(message: any){
  alertify.message(message);
}

}

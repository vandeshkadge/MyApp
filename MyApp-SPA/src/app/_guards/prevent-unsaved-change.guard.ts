import { Injectable } from '@angular/core';
import {  CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { MemberEditComponent } from '../members/member-edit/member-edit.component';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable({providedIn: 'root'})
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    // tslint:disable-next-line: typedef
    canDeactivate(component: MemberEditComponent){
        if (component.editForm.dirty)
        {
            return confirm('Are you sure you want to go back? any unsaved data will be lost');
        }
        return true;
    }
}

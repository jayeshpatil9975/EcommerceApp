import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class Crossfielderrormatcher implements ErrorStateMatcher {
    isErrorState(control:FormControl|null,form:FormGroupDirective|NgForm|null):boolean{
        return control.dirty && form.invalid;
    }
}

import { FormControl, FormGroup } from "@angular/forms";

export default class ValidateForm {
    static validateAllFormFields(FormGroup:FormGroup){
        Object.keys(FormGroup.controls).forEach(field=>{
          const control = FormGroup.get(field);
    
          if(control instanceof FormControl){
            control.markAsDirty({ onlySelf:true })
          } 
          else{
            this.validateAllFormFields(FormGroup)
          }
        })
      }
}
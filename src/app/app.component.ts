import {Component, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    em {
      float: right;
      color: #E05C65;
      padding-left: 10px; }
    .error input, .error select, .error textarea {background-color: #E3C3C5}
    .error ::-webkit-input-placeholder { color: #999}
    .error ::-moz-placeholder { color: #999}
    .error :-moz-placeholder { color: #999 }
    .error ::-webkit-input-placeholder { color: #999 }
  `]
})
export class AppComponent implements OnInit{
  newInscriptionForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  address: FormControl;
  birthday: FormControl;
  sex: FormControl;
  password: FormControl;
  pwd_confirm: FormControl;
  startDate = new Date();
  imageUrl: string;
  errorsLength = 0;
  showImage = true;

  ngOnInit() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.required);
    this.birthday = new FormControl(this.startDate, Validators.required);
    this.sex = new FormControl('', Validators.required);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.pwd_confirm = new FormControl('', []);
    this.newInscriptionForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      birthday: this.birthday,
      sex: this.sex,
      password: this.password,
      pwd_confirm: this.pwd_confirm
    });
  }
  submit(values) {
    for (const property in values) {
      if (values.hasOwnProperty(property)) {
        if (values[property] === '') {
          this.errorsLength++;
          this.newInscriptionForm.controls[property].markAsTouched();
        }
      }
    }
    this.changeImgSrcWithFormInteractions(this.errorsLength);

  }

  changeImgSrcWithFormInteractions(errorsLength: number) {
    if (errorsLength >= 5) {
      setTimeout(() => {
        this.imageUrl = '';
      }, 4000);
      this.imageUrl = './assets/image/danger.gif';
    } else if (errorsLength >= 3) {
      setTimeout(() => {
        this.imageUrl = '';
      }, 4000);
      this.imageUrl = './assets/image/moyen.gif';
    } else if (errorsLength >= 1 ) {
      setTimeout(() => {
        this.imageUrl = '';
      }, 4000);
      this.imageUrl = './assets/image/presque.png';
    } else if ( errorsLength === 0) {
      console.log(errorsLength);
      this.imageUrl = './assets/image/bonvoyage.gif';
    }
  }

}

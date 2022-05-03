import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  langs = ['en', 'fr'];
  selected = 'en';
  constructor(public translate: TranslateService) {
    translate.addLangs(this.langs);
    translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|fr/) ? browserLang : 'en');
  }
  OnSelect(langSelect: MatSelectChange) {
    console.log(langSelect.value);
    
    this.translate.use(langSelect.value);
  }
}

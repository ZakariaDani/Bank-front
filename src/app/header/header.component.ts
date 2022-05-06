import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Option } from '../models/option.model';
import { ThemeService } from '../services/theme.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{


  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  langs = ['en', 'fr'];
  selected = 'en';
  constructor(public translate: TranslateService, private readonly themeService: ThemeService) {
    translate.addLangs(this.langs);
    translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|fr/) ? browserLang : 'en');
  }
  ngOnInit() {
    this.themeService.setTheme("deeppurple-amber");
  }
  themeChangeHandler(themeToSet: string) {
    this.themeService.setTheme(themeToSet);
  }
  OnSelect(langSelect: MatSelectChange) {
    console.log(langSelect.value);

    this.translate.use(langSelect.value);
  }
}

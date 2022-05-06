import { Component, EventEmitter, Input, Output } from "@angular/core";

import { ThemeService } from "../services/theme.service";

@Component({
  selector: "app-menu-theme",
  templateUrl: "./menu-theme.component.html",
  styleUrls: ["./menu-theme.component.css"]
})
export class MenuThemeComponent {
  @Input() options:any;
  
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemeService) {}

  changeTheme(themeToSet: string) {
    localStorage.setItem('theme', themeToSet);
    this.themeChange.emit(themeToSet);
  }
}

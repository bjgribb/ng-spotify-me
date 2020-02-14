import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { LoginComponent } from "./../login/login.component";

@Component({
  template: ""
})
export class DialogLoginComponent {
  constructor(public dialog: MatDialog) {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "250px",
      height: "250px"
    });
  }
}

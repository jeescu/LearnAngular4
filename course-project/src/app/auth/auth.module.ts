import { NgModule } from "@angular/core";
import { SignupComponent } from "app/auth/signup/signup.component";
import { SigninComponent } from "app/auth/signin/signin.component";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "app/auth/auth-routing.module";

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
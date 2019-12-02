import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'principal', component: PrincipalComponent  },
    { path: '**', pathMatch:'full', redirectTo: 'login' }
];

export const appRouting = RouterModule.forRoot(routes);
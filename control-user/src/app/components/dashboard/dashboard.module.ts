import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuloComponent } from './modulo/modulo.component';
import { ModuloUsuarioComponent } from './modulo-usuario/modulo-usuario.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UserUnitComponent } from './user-unit/user-unit.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AplicacionComponent,
    UsuarioComponent,
    NavbarComponent,
    ModuloComponent,
    ModuloUsuarioComponent,
    EmpresaComponent,
    UserUnitComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }

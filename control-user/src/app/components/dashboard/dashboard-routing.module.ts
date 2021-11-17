import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AplicacionComponent } from './aplicacion/aplicacion.component';
import { DashboardComponent } from './dashboard.component';
import { ModuloUsuarioComponent } from './modulo-usuario/modulo-usuario.component';
import { ModuloComponent } from './modulo/modulo.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UnidadComponent } from './unidad/unidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserUnitComponent } from './user-unit/user-unit.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children:[
    {path: '', component: AplicacionComponent},
    {path: 'usuario', component: UsuarioComponent},
    {path: 'modulo/:id/:name', component: ModuloComponent},
    {path: 'empresa/:id/:name', component: EmpresaComponent},
    {path: 'unidad/:aplication/:id/:name', component: UnidadComponent},
    {path: 'modulo-usuario/:aplication/:id/:name', component: ModuloUsuarioComponent},
    {path: 'userUniti/:empresa/:id/:name', component: UserUnitComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule,ReactiveFormsModule],
  declarations: [UnidadComponent],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

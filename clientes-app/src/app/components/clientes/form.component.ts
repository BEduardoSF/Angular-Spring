import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router'
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public titulo: String = "Crear Cliente";
  private cliente: Cliente = new Cliente();
  private errores: string[];

  constructor(public clienteService: ClienteService,
  private router: Router,
private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activedRoute.params.subscribe(params =>{
      let id = params['id'];
      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        )
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito!`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
      }
    )
  }

  update():void {
    this.clienteService.update(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente Actualizado', `${response.mensaje} ${response.cliente.nombre}`, 'success');
      }
    )
  }
}

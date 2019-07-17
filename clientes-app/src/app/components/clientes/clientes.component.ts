import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { tap } from 'rxjs/operators';
import { ClienteService } from 'src/app/services/cliente.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginador:any;
  constructor(private clienteService: ClienteService, private activedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.clienteService.getClientes(page).pipe(
        tap(response => {
          console.log('ClienteComponent: tap 3');
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
          })
        })
      ).subscribe(response => {
         this.clientes = response.content as Cliente[];
         this.paginador = response;
      });
    });

  }

  delete(cliente: Cliente): void {
        const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swal.fire('Cliente Eliminado!',`Cliente ${cliente.nombre} eliminado con exito`, 'success' );
          }
        )
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swal.fire('Operación cancelada','La operación se ha cancelado', 'error' );
      }
    })

  }

}

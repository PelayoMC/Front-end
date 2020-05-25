import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TagsService, UsersService, ModalTagService, SwalService } from '../../service/service.index';
import { EtiquetaDecorator } from '../../models/decorators/tag-decorator.model';
import Swal from 'sweetalert2';
import { Etiqueta } from 'src/app/models/etiqueta.model';
import { Filtros } from 'src/app/models/filtros.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit {

  @ViewChild('input', { static: true }) busqueda: ElementRef;
  etiquetas: EtiquetaDecorator[] = [];

  cargando = true;
  from = 0;
  limit = 7;
  total: number;

  constructor(public tagsService: TagsService, public userService: UsersService,
              public modalService: ModalTagService, public swal: SwalService) { }

  ngOnInit() {
    this.cargando = true;
    if (this.busqueda.nativeElement.value.length === 0) {
      this.cargarEtiquetas();
    } else {
      this.buscarEtiquetas(this.busqueda.nativeElement.value);
    }
  }

  cargarEtiquetas() {
    this.cargando = true;
    this.etiquetas = [];
    this.tagsService.obtenerTagsFT(this.from, this.limit).subscribe((resp: any) => {
      const ar: EtiquetaDecorator[] = [];
      for (const et of resp.etiquetas) {
        ar.push(new EtiquetaDecorator(et, false));
      }
      this.etiquetas = ar;
      this.total = resp.total;
      this.cargando = false;
    });
  }

  buscarEtiquetas(termino: string) {
    this.cargando = true;
    this.from = 0;
    this.etiquetas = [];
    this.tagsService.buscarEtiquetas(termino, this.from, this.limit).subscribe(
      (resp: any) => {
        const ar: EtiquetaDecorator[] = [];
        for (const et of resp.coleccion) {
          ar.push(new EtiquetaDecorator(et, false));
        }
        this.etiquetas = ar;
        this.total = resp.total;
        this.cargando = false;
        this.busqueda.nativeElement.select();
      }
    );
  }

  actualizarEtiqueta(etiqueta: Etiqueta) {
    this.tagsService.modificarEtiquetaIngsInto(etiqueta._id, etiqueta.nombre).subscribe(resp => {
      this.tagsService.modificarEtiqueta(etiqueta).subscribe(resp => {
        this.cargarEtiquetas();
      });
    });
  }

  borrarEtiqueta(etiqueta: any) {
    this.swal.crearSwalBorrar('comun.alertas.borrado.etiqueta',
    () => {
      this.tagsService.borrarEtiqueta(etiqueta).subscribe(resp => {
        if (resp.nombre === etiqueta.nombre) {
          this.swal.crearSwal('comun.alertas.exito.borrarEtiqueta', 'success');
          this.cargarEtiquetas();
        } else {
          this.swal.crearSwal('comun.alertas.errores.borrarEtiqueta', 'error');
        }
      });
    });
  }

  cambiarDesde(valor: number) {
    const value = this.from + valor;
    this.from = value;
    this.cargarEtiquetas();
  }

  mostrarModal() {
    this.modalService.mostrarModal();
  }

}

import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { ReplaySubject } from 'rxjs';
import { UploadService } from '../services/upload.service';
import { Mintel } from '../models/mintel';
import { Documentos } from '../models/documentos';
import { Resnombres } from '../models/resnombres';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [MessageService, UploadService]
})

export class UploadComponent {
  ids: Resnombres[] = [];
  val: any[] = [];
  nombres: any[] = [];
  uploadedFiles: any[] = [];
  mintel=new Mintel();
  archivos:Documentos[]= [];
  documento:string ="";
  botonHabilitado: boolean = false;
  cedula: String= "";

  Oninit(){

  }

  constructor(private messageService: MessageService,private service:UploadService) {}

  onUpload(event:FileUploadEvent) {
      this.pdftobase64(event);
  }

  pdftobase64(event: FileUploadEvent) {
    const filePromises: Promise<string>[] = [];
  
    for (let file of event.files) {
      const promise = new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => {
          const base64 = btoa(event.target!.result!.toString());
          resolve(base64);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
  
      filePromises.push(promise);
    }
  
    Promise.all(filePromises).then((base64Array) => {
      base64Array.forEach((base64, index) => {
        let doc = new Documentos();
        doc.documento = base64;
        doc.nombre = event.files[index].name;
        this.archivos.push(doc);
        this.nombres.push(event.files[index].name);
      });
  
      // Resto de la lógica que depende de la información transformada a base64
      console.log("Archivos:", this.archivos);
      this.cargaMintel();
      this.obtenerToken();
      this.habilitarBoton();
    });
  }
  
  

  habilitarBoton(): void {
    this.botonHabilitado = true;
  }

  descargar(){
    this.obtenerIds();
   // this.descargarPDF();
  }

  cargaMintel(){
    this.mintel.documentos=this.archivos;
    this.mintel.cedula=this.cedula;
    this.mintel.sistema="iess";
    console.log(this.mintel);
  }

  obtenerToken(){
     this.service.getToken(this.mintel).subscribe(data=>{
              let token= data;
              console.log(token);
              window.open('firmaec://iess/firmar?token='+token+'&tipo_certificado=2&llx=222&lly=85&estampado=QR&razon=firmaEC&url=http%3A%2F%2F192.168.111.52%3A8080%2Fapi' , '_blank');
            });
      }

  obtenerIds(){
    console.log("nombres: "+this.nombres.length);
    this.service.getID(this.nombres,this.mintel.cedula).subscribe(data=>{
      this.ids=data;
      for (let id of this.ids){
        this.val.push(id.idDoc);
      }
      this.descargarPDF();
    })
  }

  descargarPDF(): void {
    console.log("val_ids: "+this.val.length);
    if (this.val.length <= 1){
    this.service.getDocuments(this.val,this.mintel.cedula).subscribe((data2: any) => {
      const blob = new Blob([data2], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = ""+this.mintel.documentos[0].nombre; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  } else{
    this.service.getDocuments(this.val,this.mintel.cedula).subscribe((data2: any) => {
      const blob = new Blob([data2], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "documentos_firmados_IESS.zip"; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
   this.setaerValores();
  }

  setaerValores(){
    this.val=[];
    this.nombres=[];
    this.botonHabilitado = false;
    this.cedula="";
    this.ids= [];
    this.archivos=[];
  }

}

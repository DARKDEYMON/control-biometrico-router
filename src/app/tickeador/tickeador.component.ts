import '../core/modules/WebSdk';
import { Component, ChangeDetectorRef, Input, OnInit, OnDestroy, ViewChild, SimpleChange, SimpleChanges } from '@angular/core';

import { 
  FingerprintReader,
  SampleFormat,
  DeviceConnected,
  DeviceDisconnected,
  SamplesAcquired,
  AcquisitionStarted,
  AcquisitionStopped
} from "@digitalpersona/devices";
import { RequestsService } from '../requests/requests.service';

@Component({
  selector: 'app-tickeador',
  templateUrl: './tickeador.component.html',
  styleUrls: ['./tickeador.component.css']
})
export class TickeadorComponent implements OnInit, OnDestroy {
  
  private reader: FingerprintReader;
  CurrentImageFinger: string;
  currentDate: string;
  UserIdentifi:any;
  constructor(private requests: RequestsService){
    this.reader = new FingerprintReader();
    this.CurrentImageFinger = "./assets/blanco.jpg"
    this.currentDate = this.muestraReloj();
    this.UserIdentifi = null;
    setInterval(()=>{
      this.currentDate = this.muestraReloj()
    }, 1000);
  }

  muestraReloj(){
    var fechaHora = new Date();
    var horas = fechaHora.getHours();
    var minutos = fechaHora.getMinutes();
    var segundos = fechaHora.getSeconds();
    var horaactual="";
    horas < 10 ? horaactual = horaactual + '0' + horas +":" : horaactual = horaactual + horas + ":";
    minutos < 10 ? horaactual = horaactual + '0' + minutos +":" : horaactual = horaactual + minutos + ":";
    segundos < 10 ? horaactual = horaactual + '0' + segundos : horaactual = horaactual + segundos;
    return horaactual;
  }

  private onDeviceConnect = (event: DeviceConnected)=>{console.log("conectado")};
  private onDeviceDisconnect = (event: DeviceDisconnected)=>{console.log("desconectado")};

  private onAcquisitionStarted = (event: AcquisitionStarted)=>{
    console.log("1");
    console.log(event);
  };

  private onAcquisitionStopped = (event: AcquisitionStopped)=>{
    console.log("2");
    console.log(event);
  };

  private onSamplesAcquired = (event: SamplesAcquired)=>{
    console.log("3");
    console.log(event);
    this.CurrentImageFinger = "data:image/png;base64," + this.fn_fixFormatImageBase64(event.samples[0]);
    this.requests.posFingerPrint(this.dataURLtoFile(this.CurrentImageFinger, "fingerimage.png")).subscribe(res=>{
      console.log(res);
      if(Object.keys(res).length!==0)
        this.UserIdentifi = res;
      else
        this.UserIdentifi = undefined;
    },err=>{
      console.log(err);
    });
  };

  ngOnInit(){
    this.reader = new FingerprintReader();
    this.reader.on("DeviceConnected",this.onDeviceConnect);
    this.reader.on("DeviceDisconnected",this.onDeviceDisconnect);
    this.reader.on("AcquisitionStarted",this.onAcquisitionStarted);
    this.reader.on("AcquisitionStopped",this.onAcquisitionStopped);
    this.reader.on("SamplesAcquired",this.onSamplesAcquired);
    this.fn_ListaDipositivos();
  }

  ngOnDestroy(){
    this.reader.off("DeviceConnected",this.onDeviceConnect);
    this.reader.off("DeviceDisconnected",this.onDeviceDisconnect);
    this.reader.off("AcquisitionStarted",this.onAcquisitionStarted);
    this.reader.off("AcquisitionStopped",this.onAcquisitionStopped);
    this.reader.off("SamplesAcquired",this.onSamplesAcquired);
    this.reader.stopAcquisition()
  }
  fn_ListaDipositivos(){
    return Promise.all([
      this.reader.enumerateDevices()
    ]).then(results=>{
      console.log(results);
      this.fn_DeviceInfo(results[0]);
    }).catch(error=>{
      console.log(error);
    });
  }

  fn_DeviceInfo(device:any){
    Promise.all([
      this.reader.getDeviceInfo(device[0])
    ]).then(result=>{
      console.log(result);
      this.fn_StarCaptureFp(result[0]);
    }).catch(error=>{
      console.log(error);
    });
  }

  fn_StarCaptureFp(deviceId: any){
    console.log(deviceId)
    Promise.all([
      this.reader.startAcquisition(SampleFormat.PngImage , deviceId['DeviceID'])
    ])
    .then((response)=>{
      console.log(response);
    }).catch((error)=>{
      console.log(error);
    });
  }

  fn_fixFormatImageBase64(prm_imagebase:any){
    var str_image = "";
      str_image = prm_imagebase;
      str_image = str_image.replace(/_/g,"/");
      str_image = str_image.replace(/-/g,"+");
    return str_image;
  }

  dataURLtoFile(dataurl: any, filename:string) {
    var arr = dataurl.split(','), 
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length, 
    u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
  }
}

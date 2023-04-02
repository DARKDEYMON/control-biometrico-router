import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../requests/requests.service';

import { 
  FingerprintReader,
  SampleFormat,
  DeviceConnected,
  DeviceDisconnected,
  SamplesAcquired,
  AcquisitionStarted,
  AcquisitionStopped
} from "@digitalpersona/devices";

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css']
})
export class MetricasComponent implements OnInit, OnDestroy  {
  private reader: FingerprintReader;
  CurrentImageFinger: string;
  params: any;
  constructor(private route: ActivatedRoute, private request: RequestsService) {
    this.reader = new FingerprintReader();
    this.CurrentImageFinger = "./assets/blanco.jpg"
    this.route.params.subscribe(params=>{
      this.params = params
    });
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
    this.request.posMetricas( String(this.params.id),  this.dataURLtoFile(this.CurrentImageFinger, new Date().toString()+".png")).subscribe(res=>{
      console.log(res)
    }, err=>{
      console.log(err)
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

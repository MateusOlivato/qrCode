import { Component } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

public corpoPagina: HTMLElement;
public img: HTMLElement;

public scanner : any;

  constructor(private qrScanner: QRScanner, private dialogs: Dialogs, public platform: Platform) {
    this.platform.backButton.subscribeWithPriority(0, ()=>{

      this.corpoPagina.style.opacity = "1";
      this.img.style.opacity = "1";

      this.qrScanner.hide();
      this.scanner.unsubscribe(); 

    });
  }

  public lerQrCode(){
    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
      
          this.qrScanner.show();

          this.corpoPagina = document.getElementsByTagName('ion-content')[0] as HTMLElement;
          this.corpoPagina.style.opacity = "0";

          this.img = document.getElementById('logo') as HTMLElement;
          this.img.style.opacity = "0"

     
       this.scanner = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         this.dialogs.alert('Resultado da leitura ' + text);

         this.corpoPagina.style.opacity = "1";
         this.img.style.opacity = "1";

         this.qrScanner.hide(); 
         this.scanner.unsubscribe();
       });

     } else if (status.denied) {
       
     } else {
       
     }
  })
  .catch((e: any) => console.log('Error is', e));

  }

}

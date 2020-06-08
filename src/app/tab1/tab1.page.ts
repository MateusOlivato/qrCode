import { Component } from '@angular/core';
import {Dialogs} from '@ionic-native/dialogs';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  qrScan:any;
  constructor(public platform:Platform, public dialog:Dialogs, public qr:QRScanner) {

    this.platform.backButton.subscribeWithPriority(0,()=>{
      document.getElementsByTagName("body")[0].style.opacity="1";
    })

  }


  StartScanning()
  {
    this.qr.prepare().then((status:QRScannerStatus)=>{
      if(status.authorized)
      {
        this.qr.show();
        document.getElementsByTagName("body")[0].style.opacity = "0"; 
       this.qrScan = this.qr.scan().subscribe((textFound)=>{
         document.getElementsByTagName("body")[0].style.opacity = "1";
         this.qrScan.unsubscribe();
         this.dialog.alert(textFound);

        },(err)=>{
          this.dialog.alert(JSON.stringify(err));
        })
      }

      else if (status.denied)
      {

      }

      else{

      }

    })
  }

}

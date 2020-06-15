import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { BackendResponseMessageDTO } from 'src/app/EntityDTO/MessageDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  dataSource: BackendResponseMessageDTO[] = [];
  dataSource2: BackendResponseMessageDTO[] = [];

  constructor(private theMessageService: MessageService) { }

  ngOnInit(): void {

    this.findAllMessage();
  }

  findAllMessage() {

    this.theMessageService.findByUsername().subscribe(
      data => {
        this.dataSource = data.body;
      },
      err => {
        Swal.fire({
          'title': 'Opps',
          'icon': 'error',
          'text': err.error,
          showCancelButton: false,
          showConfirmButton: true
        });
      }
    );
  }

  delete(message) {

    this.theMessageService.delete(message).subscribe(
      data => {

        this.findAllMessage();
      },
      err => {
        Swal.fire({
          'title': 'Opps',
          'icon': 'error',
          'text': err.error,
          showCancelButton: false,
          showConfirmButton: true
        });
      }
    );
  }

  displayedColumns: string[] = ['personName', 'personEmail', 'personImage'];
}
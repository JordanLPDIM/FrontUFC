import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fighter } from '../../models/fighter';

@Component({
  selector: 'app-fighter-card',
  templateUrl: './fighter-card.component.html',
  styleUrls: ['./fighter-card.component.scss']
})
export class fighterCardComponent implements OnInit {
  
  @Input() selectedfighter: Fighter; 
  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  ngOnInit(): void {

      this.received.emit(true);
    
  }
  
}

import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Hero} from '../../interfaces/hero.interface';

@Component({
  selector: 'atc-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  @Input() public hero: Hero;
  @Output() public delete: EventEmitter<null> = new EventEmitter<null>();

  public onDeleteClick($event: Event): void {
    $event.stopPropagation();
    this.delete.next();
  }
}

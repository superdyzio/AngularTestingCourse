import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {MessageService} from '../../services/message.service';

import {MessagesComponent} from './messages.component';

describe('MessagesComponent', () => {
  let fixture: ComponentFixture<MessagesComponent>;
  let component: MessagesComponent;
  let messageService: MessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      providers: [MessageService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    messageService = TestBed.get(MessageService);
    fixture.detectChanges();
  });

  it('should not render anything when messages list is empty', () => {
    messageService.clear();

    expect(fixture.debugElement.query(By.css('h2'))).toBeFalsy();
  });

  it('should render title and two messages when messages list contains two messages', () => {
    const message1: string = 'message1';
    const message2: string = 'message2';
    messageService.add(message1);
    messageService.add(message2);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toContain('Messages');
    expect(fixture.debugElement.queryAll(By.css('div')).length).toEqual(3);
    expect(fixture.debugElement.queryAll(By.css('div'))[1].nativeElement.textContent).toEqual(` ${message1} `);
    expect(fixture.debugElement.queryAll(By.css('div'))[2].nativeElement.textContent).toEqual(` ${message2} `);
  });
});

import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title in h1 tag', () => {
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain(component.title);
  });

  it('should contain two router links', () => {
    const expectedLinks: string[] = ['/dashboard', '/heroes'];

    expect(fixture.debugElement.queryAll(By.css('a')).length).toEqual(2);
    expect(fixture.debugElement.queryAll(By.css('a')).map((a: DebugElement) => a.attributes.routerLink))
      .toEqual(expectedLinks);
  });
});

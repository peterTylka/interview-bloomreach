import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelFormComponent } from './funnel-form.component';

describe('FunnelFormComponent', () => {
  let component: FunnelFormComponent;
  let fixture: ComponentFixture<FunnelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunnelFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunnelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

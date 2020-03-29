import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AuthorPage } from './author.page';

describe('Tab3Page', () => {
  let component: AuthorPage;
  let fixture: ComponentFixture<AuthorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

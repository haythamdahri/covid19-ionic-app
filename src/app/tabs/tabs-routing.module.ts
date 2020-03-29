import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'countries',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../countries/countries.module').then(m => m.CountriesPageModule)
          }
        ]
      },
      {
        path: 'author',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../author/author.module').then(m => m.AuthorPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

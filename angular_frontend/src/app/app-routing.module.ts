import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tabs/tab1/travelers', loadChildren: './travelers/travelers.module#TravelersPageModule' },
  { path: 'trips', loadChildren: './trips/trips.module#TripsPageModule' },
  { path: 'tabs/tab1/travelers/edit-traveler', loadChildren: './edit-traveler/edit-traveler.module#EditTravelerPageModule' },
  { path: 'tabs/tab1/add-traveler', loadChildren: './add-traveler/add-traveler.module#AddTravelerPageModule' },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

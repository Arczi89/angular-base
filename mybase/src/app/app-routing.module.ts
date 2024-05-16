import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardGamesComponent } from './board-games/board-games.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'bg', component: BoardGamesComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
	},
	{
		path: 'info',
		loadChildren: () => import('./info/info.module').then(m => m.InfoPageModule),
	},
	{
		path: 'new',
		loadChildren: () => import('./new/new.module').then(m => m.NewPageModule),
	},
];
@NgModule({
	imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
	exports: [RouterModule],
})
export class AppRoutingModule {}

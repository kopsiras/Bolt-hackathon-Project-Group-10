import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FileDataIngestionComponent } from './components/file-data-ingestion/file-data-ingestion.component';
import { KnowledgeExtractionComponent } from './components/knowledge-extraction/knowledge-extraction.component';
import { FileDataDigestionComponent } from './components/file-data-digestion/file-data-digestion.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'file-data-ingestion', component: FileDataIngestionComponent },
  { path: 'knowledge-extraction', component: KnowledgeExtractionComponent },
  { path: 'file-data-digestion', component: FileDataDigestionComponent }
];
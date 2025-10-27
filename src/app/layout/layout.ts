import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  menuItems = [
    { label: 'Usuários', route: '/users', icon: 'people' },
    { label: 'Treinos', route: '/treinos', icon: 'fitness_center' },
    { label: 'Exercícios', route: '/exercicios', icon: 'sports_gymnastics' },
    { label: 'Histórico', route: '/historico', icon: 'history' }
  ];
}

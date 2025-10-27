import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UsuarioService } from '../../services/api';
import { UsuariorDTO } from '../../components/usuario-model';

@Component({
  selector: 'app-users',
  imports: [MatCardModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  usuarios: UsuariorDTO[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  private loadUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (resp) => {
        if (resp.success)
          this.usuarios = resp.data;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  createUsuario() {
    const novoUsuario: UsuariorDTO = {
      nome: 'João Silva',
      email: 'joao@example.com',
      id: 2
    };

    this.usuarioService.createUsuario(novoUsuario).subscribe({
      next: (usuario) => {
        this.loadUsuarios(); // Recarrega a lista
      },
      error: (error) => {
        console.error('Erro ao criar usuário:', error);
      }
    });
  }
}

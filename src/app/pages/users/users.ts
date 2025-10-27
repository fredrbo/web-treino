import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/api';
import { UsuariorDTO, CreateUsuarioDTO } from '../../components/usuario-model';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  usuarios: UsuariorDTO[] = [];
  loading = false;
  error: string | null = null;
  
  // Form data
  showCreateForm = false;
  newUser: CreateUsuarioDTO = {
    nome: '',
    email: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.loading = true;
    this.error = null;
    
    this.usuarioService.getAllUsuarios().subscribe({
      next: (resp: any) => {
        this.loading = false;
        console.log('📋 Resposta da API:', resp);
        
        // Verifica se é uma resposta com success/data ou diretamente um array
        if (Array.isArray(resp)) {
          this.usuarios = resp;
        } else if (resp.success && resp.data) {
          this.usuarios = resp.data;
        } else if (resp.data) {
          this.usuarios = resp.data;
        } else {
          this.usuarios = [];
          this.error = 'Formato de resposta inesperado';
        }
        
        this.showMessage(`${this.usuarios.length} usuários carregados`);
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Erro ao carregar usuários';
        console.error('❌ Erro ao carregar usuários:', error);
        this.showMessage('Erro ao carregar usuários', true);
      }
    });
  }

  createUsuario() {
    this.showCreateForm = true;
    this.newUser = {
      nome: '',
      email: ''
    };
  }

  submitCreateUser() {
    if (!this.newUser.nome.trim() || !this.newUser.email.trim()) {
      this.showMessage('Por favor, preencha todos os campos', true);
      return;
    }

    console.log('📝 Enviando para criação:', this.newUser);

    this.usuarioService.createUsuario(this.newUser).subscribe({
      next: (usuario) => {
        console.log('✅ Usuário criado:', usuario);
        this.showMessage('Usuário criado com sucesso!');
        this.showCreateForm = false;
        this.loadUsuarios(); // Recarrega a lista
      },
      error: (error) => {
        console.error('❌ Erro ao criar usuário:', error);
        this.showMessage('Erro ao criar usuário', true);
      }
    });
  }

  cancelCreate() {
    this.showCreateForm = false;
    this.newUser = {
      nome: '',
      email: ''
    };
  }

  editUsuario(usuario: UsuariorDTO) {
    console.log('✏️ Editar usuário:', usuario);
    // TODO: Implementar edição
    this.showMessage('Função de edição em desenvolvimento');
  }

  deleteUsuario(usuario: UsuariorDTO) {
    if (confirm(`Deseja realmente excluir o usuário ${usuario.nome}?`)) {
      this.usuarioService.deleteUsuario(usuario.id).subscribe({
        next: () => {
          this.showMessage('Usuário excluído com sucesso!');
          this.loadUsuarios(); // Recarrega a lista
        },
        error: (error) => {
          console.error('❌ Erro ao excluir usuário:', error);
          this.showMessage('Erro ao excluir usuário', true);
        }
      });
    }
  }

  private showMessage(message: string, isError = false) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar']
    });
  }

  trackByUserId(index: number, usuario: UsuariorDTO): number {
    return usuario.id;
  }
}

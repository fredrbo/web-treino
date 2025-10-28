import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/api';
import { UsuariorDTO, CreateUsuarioDTO } from '../../components/usuario-model';
import { DeleteUserDialogComponent } from './components/delete-user-dialog.component';
import { UserFormDialogComponent } from './components/user-form-dialog.component';

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

  constructor(
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.loading = true;
    this.error = null;
    
    this.usuarioService.getAllUsuarios().subscribe({
      next: (resp: any) => {
        this.loading = false;
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
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      disableClose: true,
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleCreateUser(result);
      }
    });
  }

  private handleCreateUser(userData: CreateUsuarioDTO) {
    console.log('📝 Enviando para criação:', userData);

    this.usuarioService.createUsuario(userData).subscribe({
      next: (usuario) => {
        console.log('✅ Usuário criado:', usuario);
        this.showMessage('Usuário criado com sucesso!');
        this.loadUsuarios(); // Recarrega a lista
      },
      error: (error) => {
        console.error('❌ Erro ao criar usuário:', error);
        this.showMessage('Erro ao criar usuário', true);
      }
    });
  }

  editUsuario(usuario: UsuariorDTO) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '500px',
      maxWidth: '90vw',
      disableClose: true,
      data: { user: usuario, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleUpdateUser(result);
      }
    });
  }

  private handleUpdateUser(userData: UsuariorDTO) {
    console.log('📝 Enviando para atualização:', userData);

    this.usuarioService.updateUsuario(userData).subscribe({
      next: (usuario) => {
        console.log('✅ Usuário atualizado:', usuario);
        this.showMessage('Usuário atualizado com sucesso!');
        this.loadUsuarios(); // Recarrega a lista
      },
      error: (error) => {
        console.error('❌ Erro ao atualizar usuário:', error);
        this.showMessage('Erro ao atualizar usuário', true);
      }
    });
  }

  deleteUsuario(usuario: UsuariorDTO) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '450px',
      maxWidth: '90vw',
      disableClose: true,
      data: { user: usuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.handleDeleteUser(usuario);
      }
    });
  }

  private handleDeleteUser(usuario: UsuariorDTO) {
    console.log('🗑️ Excluindo usuário:', usuario);

    this.usuarioService.deleteUsuario(usuario.id).subscribe({
      next: (response) => {
        console.log('✅ Usuário excluído:', response);
        this.showMessage('Usuário excluído com sucesso!');
        this.loadUsuarios(); // Recarrega a lista
      },
      error: (error) => {
        console.error('❌ Erro ao excluir usuário:', error);
        this.showMessage('Erro ao excluir usuário', true);
      }
    });
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

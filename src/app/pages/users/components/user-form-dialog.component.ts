import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuariorDTO, CreateUsuarioDTO } from '../../../components/usuario-model';

export interface UserFormDialogData {
  user?: UsuariorDTO;
  isEdit: boolean;
}

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="user-form-dialog">
      <div class="dialog-header">
        <mat-icon [class]="data.isEdit ? 'edit-icon' : 'add-icon'">
          {{ data.isEdit ? 'edit' : 'person_add' }}
        </mat-icon>
        <h2 mat-dialog-title>
          {{ data.isEdit ? 'Editar Usuário' : 'Novo Usuário' }}
        </h2>
      </div>
      
      <mat-dialog-content class="dialog-content">
        <form [formGroup]="userForm" class="user-form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Nome completo</mat-label>
            <input matInput 
                   formControlName="nome"
                   placeholder="Digite o nome completo"
                   [class.error]="userForm.get('nome')?.invalid && userForm.get('nome')?.touched">
            <mat-icon matSuffix>person</mat-icon>
            <mat-error *ngIf="userForm.get('nome')?.hasError('required') && userForm.get('nome')?.touched">
              Nome é obrigatório
            </mat-error>
            <mat-error *ngIf="userForm.get('nome')?.hasError('minlength') && userForm.get('nome')?.touched">
              Nome deve ter pelo menos 2 caracteres
            </mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>E-mail</mat-label>
            <input matInput 
                   formControlName="email"
                   type="email"
                   placeholder="Digite o e-mail"
                   [class.error]="userForm.get('email')?.invalid && userForm.get('email')?.touched">
            <mat-icon matSuffix>email</mat-icon>
            <mat-error *ngIf="userForm.get('email')?.hasError('required') && userForm.get('email')?.touched">
              E-mail é obrigatório
            </mat-error>
            <mat-error *ngIf="userForm.get('email')?.hasError('email') && userForm.get('email')?.touched">
              E-mail deve ter um formato válido
            </mat-error>
          </mat-form-field>
        </form>
        
        <div class="form-info" *ngIf="!data.isEdit">
          <mat-icon>info</mat-icon>
          <span>Preencha todos os campos obrigatórios para criar o usuário.</span>
        </div>
      </mat-dialog-content>
      
      <mat-dialog-actions>
        <button mat-button (click)="onCancel()" [disabled]="saving">
          <mat-icon>close</mat-icon>
          Cancelar
        </button>
        <button mat-raised-button 
                color="primary" 
                (click)="onSave()"
                [disabled]="!userForm.valid || saving">
          <mat-icon *ngIf="!saving">{{ data.isEdit ? 'save' : 'person_add' }}</mat-icon>
          <mat-spinner *ngIf="saving" diameter="16"></mat-spinner>
          {{ saving ? 'Salvando...' : (data.isEdit ? 'Salvar Alterações' : 'Criar Usuário') }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .user-form-dialog {
      min-width: 450px;
      max-width: 600px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;

      .add-icon {
        color: #1976d2;
        font-size: 28px;
        width: 28px;
        height: 28px;
      }

      .edit-icon {
        color: #ff9800;
        font-size: 28px;
        width: 28px;
        height: 28px;
      }

      h2 {
        margin: 0;
        font-weight: 500;
      }
    }

    .dialog-content {
      padding: 0 0 24px 0;

      .user-form {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .full-width {
          width: 100%;
        }

        mat-form-field {
          .mat-mdc-form-field-icon-suffix {
            color: #666;
          }

          input.error {
            border-color: #f44336;
          }
        }
      }

      .form-info {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        color: #1976d2;
        font-size: 14px;
        margin-top: 16px;
        padding: 12px;
        background-color: #f3f9ff;
        border-radius: 8px;
        border-left: 4px solid #1976d2;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
          margin-top: 1px;
        }

        span {
          line-height: 1.4;
        }
      }
    }

    mat-dialog-actions {
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 0 0 0;
      margin: 0;

      button {
        min-width: 140px;

        mat-icon, mat-spinner {
          margin-right: 8px;
        }

        mat-spinner {
          display: inline-block;
        }
      }
    }

    @media (max-width: 600px) {
      .user-form-dialog {
        min-width: 300px;
        max-width: 95vw;
      }

      .dialog-header h2 {
        font-size: 18px;
      }

      .dialog-content .user-form {
        gap: 16px;
      }

      mat-dialog-actions {
        flex-direction: column;
        gap: 8px;

        button {
          width: 100%;
          min-width: auto;
        }
      }
    }
  `]
})
export class UserFormDialogComponent implements OnInit {
  userForm: FormGroup;
  saving = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserFormDialogData
  ) {
    this.userForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.data.isEdit && this.data.user) {
      this.userForm.patchValue({
        nome: this.data.user.nome,
        email: this.data.user.email
      });
    }
  }

  onCancel(): void {
    if (!this.saving) {
      this.dialogRef.close(null);
    }
  }

  onSave(): void {
    if (this.userForm.valid && !this.saving) {
      this.saving = true;
      const formValue = this.userForm.value;
      
      const result = this.data.isEdit && this.data.user 
        ? { ...this.data.user, ...formValue }
        : formValue as CreateUsuarioDTO;
      
      this.dialogRef.close(result);
    }
  }
}
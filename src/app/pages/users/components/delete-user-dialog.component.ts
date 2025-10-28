import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuariorDTO } from '../../../components/usuario-model';

export interface DeleteUserDialogData {
  user: UsuariorDTO;
}

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="delete-dialog">
      <div class="dialog-header">
        <mat-icon class="warning-icon">warning</mat-icon>
        <h2 mat-dialog-title>Confirmar Exclusão</h2>
      </div>
      
      <mat-dialog-content class="dialog-content">
        <p class="delete-message">
          Tem certeza de que deseja excluir o usuário 
          <strong>{{ data.user.nome }}</strong>?
        </p>
        
        <div class="user-info">
          <div class="info-row">
            <mat-icon>person</mat-icon>
            <span>{{ data.user.nome }}</span>
          </div>
          <div class="info-row">
            <mat-icon>email</mat-icon>
            <span>{{ data.user.email }}</span>
          </div>
        </div>
        
        <div class="warning-notice">
          <mat-icon>info</mat-icon>
          <span>Esta ação não pode ser desfeita.</span>
        </div>
      </mat-dialog-content>
      
      <mat-dialog-actions>
        <button mat-button (click)="onCancel()" [disabled]="deleting">
          <mat-icon>close</mat-icon>
          Cancelar
        </button>
        <button mat-raised-button 
                color="warn" 
                (click)="onConfirm()"
                [disabled]="deleting">
          <mat-icon *ngIf="!deleting">delete</mat-icon>
          <mat-spinner *ngIf="deleting" diameter="16"></mat-spinner>
          {{ deleting ? 'Excluindo...' : 'Confirmar Exclusão' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .delete-dialog {
      min-width: 400px;
      max-width: 500px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;

      .warning-icon {
        color: #f44336;
        font-size: 28px;
        width: 28px;
        height: 28px;
      }

      h2 {
        margin: 0;
        color: #f44336;
        font-weight: 500;
      }
    }

    .dialog-content {
      padding: 0 0 24px 0;

      .delete-message {
        font-size: 16px;
        color: #333;
        margin-bottom: 20px;
        line-height: 1.5;

        strong {
          color: #f44336;
          font-weight: 600;
        }
      }

      .user-info {
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;

        .info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;

          &:last-child {
            margin-bottom: 0;
          }

          mat-icon {
            font-size: 20px;
            width: 20px;
            height: 20px;
            color: #666;
          }

          span {
            font-size: 14px;
            color: #333;
          }
        }
      }

      .warning-notice {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #ff9800;
        font-size: 14px;
        font-style: italic;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }
    }

    mat-dialog-actions {
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 0 0 0;
      margin: 0;

      button {
        min-width: 120px;

        mat-icon, mat-spinner {
          margin-right: 8px;
        }

        mat-spinner {
          display: inline-block;
        }
      }
    }

    @media (max-width: 600px) {
      .delete-dialog {
        min-width: 280px;
        max-width: 90vw;
      }

      .dialog-header h2 {
        font-size: 18px;
      }

      .dialog-content .delete-message {
        font-size: 14px;
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
export class DeleteUserDialogComponent {
  deleting = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteUserDialogData
  ) {}

  onCancel(): void {
    if (!this.deleting) {
      this.dialogRef.close(false);
    }
  }

  onConfirm(): void {
    this.deleting = true;
    this.dialogRef.close(true);
  }
}
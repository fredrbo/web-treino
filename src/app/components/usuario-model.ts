export interface UsuariorDTO {
    id: number,
    nome: string,
    email: string
}

// Interface para criação de usuário (sem ID)
export interface CreateUsuarioDTO {
    nome: string,
    email: string
}
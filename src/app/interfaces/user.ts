export interface User {
  fullName: { type: string, required: true },
  username: { type: string, required: true, unique: true },
  email: { type: string, required: true, unique: true },
  password: { type: string }, // Puede ser opcional si se registra con Google OAuth
  googleId: { type: string }, // Para guardar el ID de Google OAuth2
}

export interface User {
  fullName?: string,
  username?: string,
  email?: string,
  password?: string, // Puede ser opcional si se registra con Google OAuth
  googleId?: string, // Para guardar el ID de Google OAuth2
  credentials?: string
}

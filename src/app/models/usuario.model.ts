
class Usuario {

  constructor(
    public nombre: string,
    public apellidos: string,
    public email: string,
    public estado: number = 0,
    public password?: string,
    public role?: string,
    public img?: string,
    public google?: boolean,
    public uid?: string,
  ) { }
}

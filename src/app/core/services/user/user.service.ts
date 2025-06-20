import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user/user.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Get the API URL from the environment configuration
  private readonly apiUrl = environment.apiUrl;

  // Inject the HttpClient service to make HTTP requests
  private readonly http = inject(HttpClient);

  /**
   * This method inserts a new user into the system.
   * It sends a POST request to the API endpoint with the user data.
   * @param user User object to be inserted.
   * @returns 
   */
  insertUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/api/Usuario/InsertUsuario`, user)
      // Pipie channel the response and try to catch any errors
      .pipe(catchError(this.handleError));
  }


  /**
   * This method updates an existing user in the system.
   * It sends a PUT request to the API endpoint with the updated user data.
   * @param user User object to be updated.
   * @returns 
   */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/api/Usuario/UpdateUsuario`, user)
      .pipe(catchError(this.handleError));
  }

  /**
   * This methods retrieves a list of all users from the system.
   * It sends a GET request to the API endpoint to fetch the user data.
   * @returns A array of User objects.
   */
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/api/Usuario/GetUsuarios`)
    .pipe(catchError(this.handleError));
  }

  /**
   * This method retrieves a user by their ID.
   * It sends a GET request to the API endpoint with the specified user ID.
   * @param id The ID of the user to be retrieved.
   * @returns One User object with the specified ID.
   */
  getUserById(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/api/Usuario/${id}`)
    .pipe(catchError(this.handleError));
  }

  /**
   * This method deletes a user by their ID.
   * It sends a DELETE request to the API endpoint with the specified user ID.
   * @param id The ID of the user to be deleted.
   * @returns 
   */
  deleteUser(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/api/Usuario/DeleteUsuario/${id}`)
    .pipe(catchError(this.handleError));
  }

  /**
  * Error handler for HTTP requests.
  * @param error The HttpErrorResponse object containing error details.
  */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Dados inválidos';
          break;
        case 404:
          errorMessage = 'Usuário não encontrado';
          break;
        case 500:
          errorMessage = error.error || 'Erro interno do servidor';
          break;
        default:
          errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
      }
    }
    
    console.error('Erro no UsuarioService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  
}

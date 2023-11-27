import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    private apiUrl = 'http://localhost:5000'; 

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private router: Router,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials : {email: string, password: string}): Observable<any> {
        const body = {
          email: credentials.email,
          password: credentials.password,
        };
    
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
    
        return this._httpClient.post(`${this.apiUrl}/signin`, body, { headers: headers }).pipe(
            catchError(() =>
                of(false)
            ),
            switchMap((response: any) => {

                this.accessToken = response.accessToken;

                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;
                return of(response);
            }));
      }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if ( response.accessToken )
                {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; teleNum: string; address: string }): Observable<any> {
        const body = {
          name: user.name,
          email: user.email,
          password: user.password,
          teleNum: user.teleNum,
          address: user.address
        };
      
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
      
        return this._httpClient.post(`${this.apiUrl}/signup`, body, { headers: headers }).pipe(
          tap((response: any) => {
            if (response.message == 'Signup success') {
              this.router.navigate(['/sign-in']);
            }
          }),
          catchError((error: any) => {
            // Handle the error here, e.g., log it or show a user-friendly error message
            console.error('Signup failed:', error);
            // You can rethrow the error to propagate it further if needed
            return throwError(error);
          })
        );
      }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private firebAuth: AngularFireAuth) {} 
    //Login Base para distintos providers (Que necesiten POPUP)
      private baseLogin (authProvider: firebase.default.auth.AuthProvider): Promise<firebase.default.auth.UserCredential> {
        return this.firebAuth.signInWithPopup(authProvider);
      }
    // Google Auth

      public googleLogin():Promise<void>{ 
          return this.baseLogin(new firebase.default.auth.GoogleAuthProvider()).then((response) =>{
            if (response) {
              localStorage.setItem("currentUser",JSON.stringify(response));
            }
          }).catch((ERR) =>{
              console.log(ERR);
          })
      }

    // Email and Password

      public emailSignup(userData: {email: string, password:string, displayName: string}): Promise<void>
      { return new Promise((resolve,reject) => {
        this.firebAuth.createUserWithEmailAndPassword(userData.email,userData.password).then((response) => {
          if(response){
            response.user.updateProfile({displayName: userData.displayName,photoURL: 'src/assets/icons8-customer-Darkened.svg'}).then(() =>{
            localStorage.setItem('currentUser',JSON.stringify(response.user));
            }).catch((ERR) => {
              console.log(ERR);
              reject(ERR);
            })
            
            resolve(response as any);
          }
        }).catch((ERR) =>{
          console.log(ERR);
          reject(ERR);
        })
      })

      }

      public emailLogin(userData:{email: string, password: string}) : Promise<void>{
          return new Promise((resolve,reject) =>{
            this.firebAuth.signInWithEmailAndPassword(userData.email,userData.password).then((response) =>{
              if (response){
                localStorage.setItem('currentUser',JSON.stringify(response));
                resolve(response as any)
              }
            }).catch((ERR) =>{
              console.log(ERR);
              reject(ERR);
            })
          })
      }

    // Authentication Validation
      public isAuthenticated(): Boolean{
        return localStorage.getItem('currentUser') != null;
      }

    // Actual getter for the Current User

      public getCurrentUser(): Observable<firebase.default.User>{
        return this.firebAuth.authState;
      }
    
    // Logout methods
      public loginOut(): Promise<void>{
          return this.firebAuth.signOut().then((response) => {
            localStorage.removeItem('currentUser');

          }).catch((ERR) => {
            console.log(ERR);
          })
      }
}

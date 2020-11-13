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
            response.user.updateProfile({displayName: userData.displayName,photoURL: 'https://firebasestorage.googleapis.com/v0/b/proyecto-c-c5053.appspot.com/o/icons8-customer-Darkened.svg?alt=media&token=e6d93a77-2e2d-4e1a-93d5-183d6292fe2c'}).then(() =>{
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
      public isAuthenticated(): boolean{
        return localStorage.getItem('currentUser') != null;
      }

    // Actual getter for the Current User

      public getCurrentUser(): Observable<firebase.default.User>{
        return this.firebAuth.authState;
      }

      public isAdmin(): boolean {  
        const adminArr: Array<string> = ['30258079@correo.unimet.edu.ve', 'alberto.carrillo@correo.unimet.edu.ve' , 'gomez.manuel@correo.unimet.edu.ve']
        console.log(JSON.parse(localStorage.getItem('currentUser'))['user']['email'])
        return adminArr.includes(JSON.parse(localStorage.getItem('currentUser'))['user']['email'])
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

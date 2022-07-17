import { Firestore, getDocs, query, QueryConstraint, where } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Repository } from './repository';
import { FirestoreCollectionName } from '../enums/firestore-collection-name';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService extends Repository<User> {

  constructor(protected firestore: Firestore) {
    super(firestore, FirestoreCollectionName.USERS);
  }

  public async getUser(email: string, password: string) {
    const queryCs: QueryConstraint[] = [
      where('email','==',email),
      where('password', '==',password)
    ];

    const q = query(this.collection(),...queryCs);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => this.toObject(doc));
  }

  public async checkUser(email: string) {
    const q = query(this.collection(), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !!querySnapshot.docs.length;
  }


}

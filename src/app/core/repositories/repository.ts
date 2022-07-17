import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentSnapshot, Firestore, getDoc, getDocs } from "@angular/fire/firestore";
import { serverTimestamp, updateDoc } from "@firebase/firestore";
import { DocumentNotFoundError } from "../exceptions/document-not-found-error";
import { BaseModel } from "../model/base-model";
import { cloneObject } from "../utils/clone-object";
import { timestampToDate } from "../utils/timestamp-to-date";

type AugmentedRequired<T extends BaseModel, K extends keyof T = keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;

export type AddDocument<T extends BaseModel> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'active'>;
export type UpdateDocument<T extends BaseModel> = Omit<AugmentedRequired<T, 'id'>, 'createdAt' | 'updatedAt'>;


export abstract class Repository<T extends BaseModel> {

  constructor(protected firestore: Firestore, protected collectionName: string, protected controlTimeStamp: boolean = true, protected hasTimestamp: boolean = true) {}

  protected collection() {
    return collection(this.firestore, this.collectionName)
  }

  public async add(data: AddDocument<T>): Promise<string> {
    const doc = cloneObject(data);

    if(this.controlTimeStamp) {
      doc.createdAt = serverTimestamp();
      doc.updatedAt = null;
    }

    delete doc.id;

    const { id } = await addDoc(this.collection(), doc);

    return id;
  }

  public update(data: UpdateDocument<T>): Promise<void>{
    const clonedData = cloneObject(data);

    if (this.controlTimeStamp) {
      clonedData.updatedAt = serverTimestamp();
    }

    delete clonedData.id;

    const docRef = doc(this.collection(), data.id);

    return updateDoc(docRef, clonedData)
  }

  public async save(item: T): Promise<void | string> {
    if (!item.id) {
      return this.add(item);
    }
    await this.update(item);
  }

  public delete(id: string): Promise<void> {
    return deleteDoc(doc(this.collection(), id));
  }

  public async getById(id: string): Promise<T> {
    const docSnap = await getDoc(doc(this.collection(), id));

    if (!docSnap.exists) {
      throw new DocumentNotFoundError(id);
    }

    return this.toObject(docSnap);
  }

  public async getAll(): Promise<T[]> {
    const { docs } = await getDocs(this.collection());
    return docs.map(doc => this.toObject(doc));
  }

  protected toObject(document: DocumentSnapshot<DocumentData>): T {
    let data = {
      id: document.id,
      ...document.data()
    } as T;

    if (this.hasTimestamp) {
      data = timestampToDate(data);
    }

    return data;
  }

}

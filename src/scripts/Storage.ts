import firebase from 'firebase/app';
import 'firebase/storage';

export default class Storage {

    private root: firebase.storage.Reference;

    constructor(storage: firebase.storage.Storage) {
        this.root = storage.ref();
    }

    uploadFile(ref: string, file: File) {
        this.root.child(ref).put(file);
    }

    async getFileUrl(ref: string): Promise<string> {

        let url = "";

        try {
            url = await this.root.child(ref).getDownloadURL();
        } catch(err) {
            console.log(err.code, err.message);
        }

        return url;
    }

    async deleteFile(ref: string) {

        try {
            await this.root.child(ref).delete();
        } catch(err) {
            console.log(err.code, err.message);
        }
    }
}
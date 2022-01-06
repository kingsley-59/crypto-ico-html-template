
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js'
// // If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
// import { analytics } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js'
// // Add Firebase products that you want to use
// import { auth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js'
import { getFirestore, collection, doc, addDoc, getDocs, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


//Fatal Database
// const firebaseConfig = {
//     apiKey: "AIzaSyCEWN32BxrLn_ErmZ1Wc8gViYuTDf7Zv0c",
//     authDomain: "kayswap-1c41f.firebaseapp.com",
//     projectId: "kayswap-1c41f",
//     storageBucket: "kayswap-1c41f.appspot.com",
//     messagingSenderId: "821762328329",
//     appId: "1:821762328329:web:a51254ca3e84a8c0f4f5d8",
//     measurementId: "G-90EPF2WQ9M"
// };



//working 
const firebaseConfig = {
    apiKey: "AIzaSyAlZuUSV9gnGKEdsywTc4Bq5Aipo44ZofA",
    authDomain: "kayswap-d388c.firebaseapp.com",
    projectId: "kayswap-d388c",
    storageBucket: "kayswap-d388c.appspot.com",
    messagingSenderId: "363273479895",
    appId: "1:363273479895:web:324c1f7af8390271bb7292",
    measurementId: "G-6TNTHZJQ03"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
// const analytics = getAnalytics(app);


//---------- Database details --------// 
//  collection : wallet_credentials
/*  
Schema: {
    email: String
    passphrase: String
}

wallet_credentials: []

*/
console.log(db);
// reference the collection
//const reference = db.colllection("wallet_credentials");

//get data from collection
// reference.get().then((snapshot) => {
//     const data = snapshot.docs.map((doc) => ({
//         email: doc.email,
//         passphrase: doc.passphrase,
//         ...doc.data()
//     }));
//     console.log("Data from the collection: ", data);
// });

export class Wallet {
    collectionName = 'wallet_credentials'
    //walletRef = db.colllection('wallet_credentials');
    walletRef = '';

    async addWallet(email, passphrase) {
        let wallet = {email, passphrase};
        console.log('Contacting firebase to add details...');

        try{
            const docRef = await addDoc(collection(db, this.collectionName), wallet);
            console.log('Document written with ID: ', docRef.id);
            wallet.id = docRef.id;

        } catch (error) {
            console.error('Error adding document: ', error);
        }

        return wallet;
    }

    async getAllWallets() {
        const wallets = [];

        try {
            const snapshot = await getDocs(collection(db, this.collectionName));
            snapshot.forEach(doc => wallets.push({id: doc.id, ...doc.data()}));
            console.log(wallets);
        } catch (error) {
            console.error('getAllWallets error: ', error);
        }

        return wallets;
    }

    async get(id) {
        let wallet;

        try {
            let doc = await this.userRef.doc(id).get();

            if(doc.exists){
                wallet = {id: doc.id, ...doc.data()};
            }else{
                console.log('No document found with id: ', id);
            }
        } catch (error) {
            console.error('error in getting wallet :', error);
        }

        return wallet;
    }

    async update(id) {
        // create an initial document to update
        let walletRef = doc(db, this.collectionName, id);

        try {
            // update the passphrase field
            let update = await updateDoc(walletRef, {
                passphrase: 'some updated text'
            });
            console.log('Updated data with id: ', id);
        } catch (error) {
            console.error('Error updating data with ID: ', id)
        }
    }

    async delete(id) {
        try {
            //await this.walletRef.doc(id).delete();
            await deleteDoc(doc(db, this.collectionName, id))
            console.log('Deleted user with id: ', id);
        } catch (error) {
            console.error('error in deleting wallet :', error)
        }
    }
}

var Demo = new Wallet();

//Demo.addWallet('example@gmail.com', " some phrases to add");
Demo.getAllWallets();

//module.exports = Wallet;
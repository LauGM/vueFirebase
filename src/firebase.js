// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore,collection, query,getDocs,setDoc,doc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhmvXIhJHYbUuSeP2rTBckdMGSuLg_fSg",
  authDomain: "vue2022-44a83.firebaseapp.com",
  projectId: "vue2022-44a83",
  storageBucket: "vue2022-44a83.appspot.com",
  messagingSenderId: "111691745292",
  appId: "1:111691745292:web:0df0c3a850101d6fd04629"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)

const db = getFirestore(app);
// const auth = getAuth();
const usuarios= collection(db,'users');
const q=query(collection(db,'users'));


export async function getUsers(){
    const querySnapshot = await getDocs(q);
    const listaUsus=[];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        if(doc.data().usuario!=undefined){
            listaUsus.push(doc.data().usuario);
        }
    });
    return listaUsus;
}

export async function postUser(usuario){
    await setDoc(doc(usuarios), {usuario});
}

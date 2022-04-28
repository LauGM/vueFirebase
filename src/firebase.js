// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore,collection, query,getDocs,setDoc,doc, updateDoc, deleteDoc} from 'firebase/firestore';

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
const pedidos= collection(db,'pedidos');
const productos=collection(db,'products');
const q=query(collection(db,'users'));
const qPedidos=query(collection(db,'pedidos'));
const qProds=query(collection(db,'products'));


export async function getUsers(){
    const querySnapshot = await getDocs(q);
    const listaUsus=[];
    console.log("👇Ids de usuarios en BD")
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // if(doc.data().usuario!=undefined){
        //     listaUsus.push(doc.data().usuario);
        // }
        console.log(doc.id);
        listaUsus.push(doc.data().usuario);
    });
    return listaUsus;
}

export async function postUser(usuario){
    try {
        await setDoc(doc(usuarios), {usuario});
        alert("Registro exitoso");
    } catch (error) {
        console.log("Error "+error);
    }
}

export async function updateProd(id,prod){
    let exito=false;
    try {
        await updateDoc(doc(db,'products',id),prod);
        exito=true;      
    } catch (error) {
        console.log("Error "+error);
    }
    return exito;
}

export async function deleteProd(id){
    let exito=false;
    try {
        await deleteDoc(doc(db,'products',id));
        exito=true;      
    } catch (error) {
        console.log("Error "+error);
    }
    return exito;
}

//paso propiedad a propiedad para que firebase no cree el objeto product como tal
export async function postProd(product){
    let exito=false;
    try {
        await setDoc(doc(productos), 
        {
            imagen:product.imagen,
            info:product.info,
            marca:product.marca,
            nombre:product.nombre,
            precio:product.precio
        }
        );
        exito=true;
    } catch (error) {
        console.log("Error "+error);
    }
    return exito;
}

export async function getProducts(){
    const querySnapshot = await getDocs(qProds);
    const listaIds=[];
    const listaProds=[];
    console.log("👇Productos en BD:")
    querySnapshot.forEach((doc) => {
        listaIds.push(doc.id);
        listaProds.push(doc.data());
    });
    return [listaIds,listaProds];
}

export async function postPedido(pedido){
    try {
        await setDoc(doc(pedidos), {pedido});
    } catch (error) {
        console.log("Error "+error);
    }
}

export async function getPedidos(){
    const querySnapshot = await getDocs(qPedidos);
    const listaIdsPedidos=[]
    const listaPedidos=[];
    console.log("👇Pedidos en BD");
    querySnapshot.forEach((doc) => {
        listaIdsPedidos.push(doc.id);
        listaPedidos.push(doc.data().pedido);
    });
    console.log(listaPedidos)
    return [listaIdsPedidos,listaPedidos];
}

export async function deletePedido(id){
    let exito=false;
    try {
        await deleteDoc(doc(db,'pedidos',id));
        exito=true;      
    } catch (error) {
        console.log("Error "+error);
    }
    return exito;
}
import { initializeApp } from "firebase/app";
import { collection, doc, query, where, getDocs, getDoc, addDoc, getFirestore} from "firebase/firestore";
import products from './products';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FS_APIKEY,
  authDomain: import.meta.env.VITE_FS_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FS_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FS_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FS_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FS_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export async function getProducts() {
  const productsRef = collection(db, "products");

  const productsSnapshot = await getDocs(productsRef);

  const documents = productsSnapshot.docs;

  const dataDocs = documents.map ( item => {
    return {id: item.id, ...item.data()}
  })

  return dataDocs
}

export async function getProductById(idParam) {
  const docRef = doc(db, "products", idParam);
  const docSnapshot = await getDoc(docRef)
  const docData = docSnapshot.data();
  docData.id = docSnapshot.id

  return docData;
  
}

// Funcion para obtener los productos segun su categoria

export async function getProductsByCateg(categParam) {
  const productsRef = collection(db,"products");

  const queryCategory = query(productsRef, where ("category", "==", categParam));
  const productsSnapshot = await getDocs(queryCategory);


  const documents = productsSnapshot.docs;
  const dataDocs = documents.map( item => {
    return {id: item.id, ...item.data()}
  })

  return dataDocs
}

//Funcion para crear orden de compra en Firebase

export async function createOrder( orderData){
    const ordersRef = collection(db, "orders");
    const newDoc = await addDoc(ordersRef, orderData)   
    return newDoc;
}

// Funcion para exportar los productos a firebase

export async function exportProductsData(){
    const productsRef = collection(db, "products")  
    for( let item of products ){
      delete item.id;
      const docCreated = await addDoc(productsRef,item)
      console.log("Document created", docCreated.id)
    }
}

//Funcion para carrusel de sugerencias (ItemDetailContainer)

export async function getRelatedProducts(currentProductId, limit = 4) {
    const productsRef = collection(db, "products");

    const productsSnapshot = await getDocs(productsRef);
    const documents = productsSnapshot.docs;
    
    const allProducts = documents.map(item => ({
        id: item.id,
        ...item.data()
    }));

    const filteredProducts = allProducts.filter(p => p.id !== currentProductId);
    for (let i = filteredProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredProducts[i], filteredProducts[j]] = [filteredProducts[j], filteredProducts[i]];
    }

    return filteredProducts.slice(0, limit);
}

export default app;
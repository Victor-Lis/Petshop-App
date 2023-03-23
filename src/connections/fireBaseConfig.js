import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDNMC76YIjgMa526ylX-jhYRuJrVs0AAho",
    authDomain: "petshop-app-4f42e.firebaseapp.com",
    databaseURL: "https://petshop-app-4f42e-default-rtdb.firebaseio.com",
    projectId: "petshop-app-4f42e",
    storageBucket: "petshop-app-4f42e.appspot.com",
    messagingSenderId: "129281608246",
    appId: "1:129281608246:web:b524e5dddf96ed49a1e697",
    measurementId: "G-1EEXWWQ0N5"
};

if(!firebase.apps.length){
    const app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
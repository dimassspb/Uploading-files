import './theme.css'
import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from './upload.js'

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyBQcvXIkhAWhj4qU8zKBrrKYPr-TFoNAAQ",
    authDomain: "frontend-upload-6220b.firebaseapp.com",
    projectId: "frontend-upload-6220b",
    storageBucket: "frontend-upload-6220b.appspot.com",
    messagingSenderId: "71365847039",
    appId: "1:71365847039:web:d560b3dd5f83cb537da9ca"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage()


upload('#file', {
    multi: true,
    accept: ['.png', '.jpeg', '.jpg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => { //для прогресса
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage
            }, error => {
                console.log(error);
            }, () => {
task.snapshot.ref.getDownloadURL().then(url => {
    console.log('Download URL:', url);
})
            })
        });
    }
})
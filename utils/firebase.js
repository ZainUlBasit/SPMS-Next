// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-BjPfrTbys8qjEzy_elGVx6BvnQiy9RM",
  authDomain: "spms-91c73.firebaseapp.com",
  projectId: "spms-91c73",
  storageBucket: "spms-91c73.appspot.com",
  messagingSenderId: "334855873944",
  appId: "1:334855873944:web:dc61d839809dfc405a77ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create a root reference
const storage = getStorage();

// Create a reference to 'mountains.jpg'
// While the file names are the same, the references point to different files

const uploadCompanyLogoFile = async (fileName, file) => {
  const pdfReportRef = ref(storage, `/company/${fileName}`);
  try {
    const url = await firestoreUploadFile(pdfReportRef, file);
    return url;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const firestoreUploadFile = async (storageRef, file) => {
  await uploadBytes(storageRef, file);
  const fileUrl = await getDownloadURL(storageRef);
  return fileUrl;
};

const updateCompanyLogo = async (fileName, file) => {
  try {
    // Upload the logo file and get the URL
    const logoUrl = await uploadCompanyLogoFile(fileName, file);

    // Update the logo URL in Firestore (or your preferred database)
    const companyRef = doc(firestore, "company", fileName); // Adjust the path as needed
    await updateDoc(companyRef, {
      logoUrl: logoUrl,
    });

    console.log("Company logo updated successfully");
    return logoUrl;
  } catch (error) {
    console.log("Error updating company logo:", error);
    return error;
  }
};

module.exports = {
  updateCompanyLogo,
  uploadCompanyLogoFile,
};

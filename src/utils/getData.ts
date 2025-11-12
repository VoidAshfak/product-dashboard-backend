import db from "../db/firebaseConfig.js";


const getProductsData = async () => {
    try {
        const querySnapshot = await db.collection("dashboard").get();
        // const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(querySnapshot.docs[0]?.data());
        
    } catch (error) {
        console.log(error);
    }
        
}


export {
    getProductsData
}
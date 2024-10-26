import axios from 'axios'
// const token =localStorage.getItem('werkenDeIn_user_token')
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from './firebase'
import imageCompression from 'browser-image-compression';
import { isValidFileType } from './isValidType';
import { message } from 'antd';

export const uploadFile = async (file, general = false) => {
    try {
        const check = isValidFileType(file)
        if (!check && !general) {
            message.error('!Invalid file type. Please upload a valid image file. you can only select the jpg, jpeg, png, svg')
            return
        }
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        const compressedFile = general ? file : await imageCompression(file, options);
        const formData = new FormData();
        formData.append("image", compressedFile);
        const response = await axios.post(global.BASEURL+"/image/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-auth-token": global.TOKEN
            },
        });
        // console.log(response.data, "res");
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error.response.data);
        throw error;
    }
}
export const uploadCertificate = async (file, token) => {
    try {
        const check = isValidFileType(file)
        if (!check) {
            message.error('!Invalid file type. Please upload a valid image file. you can only select the jpg, jpeg, png, svg')
            return
        }
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const formData = new FormData();
        formData.append("image", compressedFile);
        const response = await axios.post(global.BASEURL+"/image/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-auth-token": token
            },
        });
        // console.log(response.data, "res");
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error.response.data);
        throw error;
    }
}
export const uploadDoc = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(global.BASEURL + "/pdf/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-auth-token": global.TOKEN
            },
        });
        // console.log(response.data, "res");
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error.response.data);
        throw error;
    }
}
export const uploadProfile = async (file) => {
    try {
        const check = isValidFileType(file)
        if (!check) {
            message.error('!Invalid file type. Please upload a valid image file. you can only select the jpg, jpeg, png, svg')
            return
        }
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const formData = new FormData();
        formData.append("image", compressedFile);

        const response = await axios.post(global.BASEURL+"/image/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-auth-token": "33344qrstu77700088"
            },
        });
        // console.log(response.data, "res");
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error.response.data);
        throw error;
    }
}
export const uploadPdf = async ({ storePdf, setPDF }) => {
    if (!storePdf) return;
    const check = isValidFileType(storePdf, ['doc', 'docx', 'pdf'])
    if (!check) {
        message.error('!Invalid file type. Please upload a valid image file. you can only select the doc, docx, pdf')
        return
    }
    const currentDate = new Date();
    const uniqueFileName = `${currentDate.getTime()}_${storePdf?.name}`;
    const imageRef = ref(storage, `storePdf/files/${uniqueFileName}`);
    await uploadBytesResumable(imageRef, storePdf).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            setPDF(url)
        });
    });
};
export const downloadFile = async ({ filePath, fileName }) => {
    try {
        const storageRef = ref(storage, filePath);
        const url = await getDownloadURL(storageRef);
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            const blob = xhr.response;
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        };
        xhr.open('GET', url);
        xhr.send();
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};
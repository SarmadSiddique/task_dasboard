const isValidFileType = (file, type=['jpg', 'jpeg', 'png', 'svg']) => {
    const allowedExtensions = type;
    const fileExtension = getFileExtension(file.name).toLowerCase();

    return allowedExtensions.includes(fileExtension);
};

const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};
export { isValidFileType };

import DataUriParser from "datauri/parser.js";
import path from "path";


const convertFileToDataUri = (file) => {
    const dataUriParser = new DataUriParser();

    const fileExtension = path.extname(file.originalname).toString();

    return dataUriParser.format(fileExtension, file.buffer);
};

export default convertFileToDataUri;

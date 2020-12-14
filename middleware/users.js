const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

export default saveImage = (user, imgEncoded)=> {
    // CHECKING FOR IMAGE IS ALREADY ENCODED OR NOT
    if (imgEncoded == null) return;
    console.log(imgEncoded)
    // ENCODING IMAGE BY JSON PARSE
    // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
    const img = JSON.parse(imgEncoded);


    // CHECKING FOR JSON ENCODED IMAGE NOT NULL 
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
    // AND HAVE VALID IMAGE TYPES WITH IMAGE MIME TYPES
    if (img != null && imageMimeTypes.includes(img.type)) {

        // https://nodejs.org/api/buffer.html
        // The Buffer class in Node.js is designed to handle raw binary data. 
        // SETTING IMAGE AS BINARY DATA
        user.image = new Buffer.from(img.data, "base64");
        user.imgType = img.type;
    }
}
const generate_key=(n)=>{
    const characters ='ABC%DEFGHI#JKLMN@OPQRSTUV!WXYZabcdefghijklmnopqr-stuvwxy=z0123456789'
    let result='';
    for (let i=0;i<n;i++){
     result+=characters.charAt(Math.floor(Math.random()*characters.length))
    }
    return result;
}

export default generate_key;
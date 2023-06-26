function generatePassword() {
    var length = 10; // Minimum length of the password
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var password = "";
    
    for (var i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    console.log(password);
    return password;
  }
  
 module.exports=generatePassword
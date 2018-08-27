import axios from "axios";
///to get the url go to google https://firebase.google.com/docs/reference/rest/auth/

const instance = axios.create({
  baseURL:
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCdQU9tdij7QHG3mM8r_RDLs0UCf2wUq_8"
});
export default instance;

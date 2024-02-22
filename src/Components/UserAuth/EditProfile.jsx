import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const EditProfile = () => {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const userDetails = {
      FullName,
      Email,
      Password,
    };

    const getToken = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:4000/Api/User/editProfile",
        userDetails,
        {
          headers: {
            "Authorization": `Bearer ${getToken}`,
          },
        }
      );
      console.log(response);

      console.log("Received response", response.data);
      if (response.data.status === "success") {
        alert(response.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error making post request", error);
      alert("Error updating profile, try again later");
    }
  };

  return ( 
    <div>
      <h1 className="text-primary fs-2 text-center">Edit Profile</h1>
      <div className="col-10 col-md-8 col-lg-6 mx-auto">
        <form onSubmit={handleSubmit} className="shadow p-4" style={{ width: "500px" }}>
          <input
            onChange={(ev) => setFullName(ev.target.value)}
            type="text"
            placeholder="Enter Full Name"
            className="form-control my-2"
            value={FullName}
          />
          <input
            onChange={(ev) => setEmail(ev.target.value)}
            type="email"
            placeholder="Enter Email"
            className="form-control my-2"
            value={Email}
          />
          <input
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            placeholder="Enter Password"
            className="form-control my-2"
            value={Password}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

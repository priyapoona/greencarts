import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';


const Login = () => {

const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

     const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event)=>{

      try {
         event.preventDefault();
         const {data} = await axios.post(`/api/user/${state}`,{
          name, email, password
         });
         if (data.success){
          navigate('/')
          setUser(data.user)
            setShowUserLogin(false)
  
         }else{
          toast.error(data.message)
         }   
      } catch (error) {
        toast.error(error.message)
      }
       
    }

  return (
    <div onClick={()=> setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50'>
          
          <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-primary hover:bg-primary transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login

// import React, { useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const Login = () => {
//   const { axios, setShowUserLogin, setUser } = useAppContext();

//   const [state, setState] = useState("login"); // "login" | "register"
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       let response;

//       if (state === "login") {
//         response = await axios.post("/api/user/login", { email, password });
//       } else {
//         response = await axios.post("/api/user/register", {
//           name,
//           email,
//           password,
//         });
//       }

//       if (response.data.success) {
//         setUser(response.data.user); // context me user save
//         toast.success(
//           state === "login" ? "Login Successful 🎉" : "Account Created 🎉"
//         );
//         setShowUserLogin(false); // modal close
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong. Try again.");
//     }
//   };

//   return (
//     <div
//       onClick={() => setShowUserLogin(false)}
//       className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
//     >
//       <form
//         onSubmit={onSubmitHandler}
//         onClick={(e) => e.stopPropagation()}
//         className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
//       >
//         <p className="text-2xl font-medium m-auto">
//           <span className="text-primary">User</span>{" "}
//           {state === "login" ? "Login" : "Sign Up"}
//         </p>

//         {state === "register" && (
//           <div className="w-full">
//             <p>Name</p>
//             <input
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               placeholder="Type here"
//               className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
//               type="text"
//               required
//             />
//           </div>
//         )}

//         <div className="w-full ">
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             placeholder="Type here"
//             className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
//             type="email"
//             required
//           />
//         </div>

//         <div className="w-full ">
//           <p>Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             placeholder="Type here"
//             className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
//             type="password"
//             required
//           />
//         </div>

//         {state === "register" ? (
//           <p>
//             Already have account?{" "}
//             <span
//               onClick={() => setState("login")}
//               className="text-primary cursor-pointer"
//             >
//               Click here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Create an account?{" "}
//             <span
//               onClick={() => setState("register")}
//               className="text-primary cursor-pointer"
//             >
//               Click here
//             </span>
//           </p>
//         )}

//         <button className="bg-primary hover:bg-primary transition-all text-white w-full py-2 rounded-md cursor-pointer">
//           {state === "register" ? "Create Account" : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const Login = () => {
//   const { axios, setShowUserLogin, setUser } = useAppContext();

//   const [state, setState] = useState("login"); // "login" or "register"
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       let response;

//       if (state === "login") {
//         response = await axios.post(
//           "/api/user/login",
//           { email, password },
//           { withCredentials: true }
//         );
//       } else {
//         response = await axios.post(
//           "/api/user/register",
//           { name, email, password },
//           { withCredentials: true }
//         );
//       }

//       console.log("Backend Response:", response.data);

//       if (response.data.success) {
//         setUser(response.data.user);
//         toast.success(
//           state === "login" ? "Login Successful 🎉" : "Account Created 🎉"
//         );
//         setShowUserLogin(false);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong. Try again.");
//     }
//   };

//   return (
//     <div
//       onClick={() => setShowUserLogin(false)}
//       className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
//     >
//       <form
//         onSubmit={onSubmitHandler}
//         onClick={(e) => e.stopPropagation()}
//         className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
//       >
//         <p className="text-2xl font-medium m-auto">
//           <span className="text-primary">User</span>{" "}
//           {state === "login" ? "Login" : "Sign Up"}
//         </p>

//         {state === "register" && (
//           <div className="w-full">
//             <p>Name</p>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Type here"
//               className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
//               type="text"
//               required
//             />
//           </div>
//         )}

//         <div className="w-full">
//           <p>Email</p>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Type here"
//             className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
//             type="email"
//             required
//           />
//         </div>

//         <div className="w-full">
//           <p>Password</p>
//           <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Type here"
//             className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
//             type="password"
//             required
//           />
//         </div>

//         <p>
//           {state === "register"
//             ? "Already have account? "
//             : "Create an account? "}
//           <span
//             onClick={() => setState(state === "login" ? "register" : "login")}
//             className="text-primary cursor-pointer"
//           >
//             Click here
//           </span>
//         </p>

//         <button className="bg-primary hover:bg-primary transition-all text-white w-full py-2 rounded-md cursor-pointer">
//           {state === "register" ? "Create Account" : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

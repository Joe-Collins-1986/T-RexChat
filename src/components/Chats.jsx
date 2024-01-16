import React, { useEffect, useState, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../config/firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const chatList = Object.entries(chats);
  console.log(chatList);

  return (
    <div className="chats">
      {chatList?.map((chat) => (
        <div key={chat[0]} className="userChat">
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>
              {chat[1].userInfo.lastMessage
                ? chat[1].userInfo.lastMessage.text
                : "No messages"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// return (
//   <div className="chats">
//     <div className="userChat">
//       <img
//         src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2352&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt=""
//       />
//       <div className="userChatInfo">
//         <span>Jane</span>
//         <p>Hello ...</p>
//       </div>
//     </div>
//   </div>
// );
// };

export default Chats;

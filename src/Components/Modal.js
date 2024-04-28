// import React from "react";

// function Modal({ isOpen, onClose }) {
//   return (
//     <div
//       className={`modal ${isOpen ? "show" : ""}`}
//       tabIndex="-1"
//       role="dialog"
//       style={{ display: isOpen ? "block" : "none" }}
//     >
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">New Message</h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={onClose}
//             ></button>
//           </div>
//           <div className="modal-body">
//             <form>
//               <div className="mb-3">
//                 <label htmlFor="recipient-name" className="col-form-label">
//                   Name:
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="recipient-name"
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="message-text" className="col-form-label">
//                   Message:
//                 </label>
//                 <textarea className="form-control" id="message-text"></textarea>
//               </div>
//             </form>
//           </div>
//           <div className="modal-footer">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               onClick={onClose}
//             >
//               Close
//             </button>
//             <button type="button" className="btn btn-primary">
//               Send Message
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Modal;

// //REACT
// import Layout from "../components/layout";
// import React, { useEffect, useState } from "react";
// //NEXT
// import Image from "next/image";
// import Head from "next/head";
// //FONTAWESOME
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
// //FRAMER
// import { AnimatePresence, motion } from "framer-motion";
// //API
// import getAssistanceCenterInfo from "../api/assistanceCenter";
// import AnimatedPage from "../components/animated-page";
//
// const AssistanceCenter = ({ assistanceCenterInfo }) => {
//   //STATE
//   const [accordion, setAccordion] = useState({});
//   assistanceCenterInfo = assistanceCenterInfo.data.allAssistanceCenters[0];
//
//   //FUNCTIONS
//   const toggleAccordion = menuTitle => {
//     menuTitle = menuTitle.toLowerCase().replaceAll(" ", "-");
//     setAccordion({ ...accordion, [menuTitle]: !accordion[menuTitle] });
//   };
//
//   //EFFECT
//   useEffect(() => {
//     if (assistanceCenterInfo.collapsableMenu) {
//       assistanceCenterInfo.collapsableMenu.map(menu => {
//         const key = menu.title.toLowerCase().replaceAll(" ", "-");
//         setAccordion({ ...accordion, [key]: false });
//       });
//     }
//   }, [assistanceCenterInfo]);
//   return (
//     <>
//       <Layout>
//         <Head>
//           <title>sunglassesandframes - Assistance Center</title>
//           <meta name="description" content="Assistance Center" />
//         </Head>
//         <AnimatedPage margins={true}>
//           <div className="page-container">
//             <div className="header-container">
//               <div className="header-image-container">
//                 <Image
//                   fill="true"
//                   sizes="100%"
//                   priority={true}
//                   placeholder="blur"
//                   blurDataURL={assistanceCenterInfo.headerImage.blurUpThumb}
//                   style={{ objectFit: "cover" }}
//                   src={assistanceCenterInfo.headerImage.url}
//                   alt="assistance-center"
//                 />
//               </div>
//               <div
//                 className="header-description-container"
//                 dangerouslySetInnerHTML={{
//                   __html: assistanceCenterInfo.description,
//                 }}
//               />
//             </div>
//             <div className="container-accordions">
//               {assistanceCenterInfo.collapsableMenu.map(menu => (
//                 <div key={menu.id}>
//                   <div
//                     className="container-accordion"
//                     onClick={() => toggleAccordion(menu.title)}
//                   >
//                     <span className="icon">
//                       {accordion[
//                         menu.title.toLowerCase().replaceAll(" ", "-")
//                       ] ? (
//                         <FontAwesomeIcon icon={faMinus} width={10} />
//                       ) : (
//                         <FontAwesomeIcon icon={faPlus} width={10} />
//                       )}
//                     </span>
//                     <div className="font-bold uppercase text-sm">
//                       {menu.title}
//                     </div>
//                   </div>
//                   <AnimatePresence>
//                     {accordion[
//                       menu.title.toLowerCase().replaceAll(" ", "-")
//                     ] && (
//                       <motion.div
//                         layout
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                       >
//                         <div
//                           className="text-xs mt-2"
//                           dangerouslySetInnerHTML={{
//                             __html: menu.description,
//                           }}
//                         />
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </AnimatedPage>
//       </Layout>
//       <style jsx="true">{`
//         .page-container {
//           margin-top: 50px;
//           margin-bottom: 20px;
//         }
//         .header-container {
//           display: flex;
//           flex-direction: column;
//         }
//         .header-image-container {
//           position: relative;
//           width: 100%;
//           height: 200px;
//           border-radius: 10px;
//           overflow: hidden;
//         }
//         .header-description-container {
//           margin-top: 20px;
//         }
//         .container-accordions {
//           margin-top: 40px;
//         }
//         .container-accordion {
//           display: flex;
//           gap: 10px;
//           align-items: center;
//         }
//         .icon {
//           cursor: pointer;
//         }
//         @media (min-width: 768px) {
//           .page-container {
//             margin-top: 20px;
//           }
//           .header-container {
//             display: flex;
//             flex-direction: row;
//             gap: 10px;
//           }
//           .header-image-container {
//             width: 50%;
//           }
//           .header-description-container {
//             width: 50%;
//           }
//         }
//       `}</style>
//     </>
//   );
// };
//
// export async function getStaticProps() {
//   const assistanceCenterInfo = await getAssistanceCenterInfo();
//   return {
//     props: { assistanceCenterInfo },
//   };
// }
//
// export default AssistanceCenter;

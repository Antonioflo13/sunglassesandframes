//REACT
import Layout from "../../components/layout";
import React, { useEffect } from "react";
//HOOKS
import createHandle from "../../hooks/createHandle";
//NEXT
import Image from "next/image";
import Head from "next/head";
//API
import getAssistanceCenterInfo from "../../api/assistanceCenter";
//COMPONENTS
import AnimatedPage from "../../components/animated-page";

const Index = ({ assistanceCenterInfo, selectedMenu }) => {
  assistanceCenterInfo = assistanceCenterInfo.data.allAssistanceCenters[0];

  //FUNCTIONS
  const executeScroll = menu => {
    const menuID = document.getElementById(menu).offsetTop;
    const container = document.getElementById("container");
    container.scrollTo({
      top: menuID - 450,
      behavior: "smooth",
    });
  };

  //EFFECT
  useEffect(() => {
    if (selectedMenu && assistanceCenterInfo.collapsableMenu) {
      const menuID = assistanceCenterInfo.collapsableMenu.find(
        menu => selectedMenu === createHandle(menu.title)
      )?.id;
      executeScroll(menuID);
    }
  }, [assistanceCenterInfo]);
  return (
    <>
      <Layout>
        <Head>
          <title>Sunglassesandframes - Assistance Center</title>
          <meta name="description" content="Assistance Center" />
        </Head>
        <AnimatedPage margins={true}>
          <div className="page-container">
            <div className="header-container">
              <div className="header-image-container">
                <Image
                  fill="true"
                  sizes="100%"
                  priority={true}
                  placeholder="blur"
                  blurDataURL={assistanceCenterInfo.headerImage.blurUpThumb}
                  style={{ objectFit: "cover" }}
                  src={assistanceCenterInfo.headerImage.url}
                  alt="assistance-center"
                />
              </div>
              <div
                className="header-description-container"
                dangerouslySetInnerHTML={{
                  __html: assistanceCenterInfo.description,
                }}
              />
              <iframe
                title="Contact Form"
                src={`https://plugins.crisp.chat/urn:crisp.im:contact-form:0/contact/${process.env.NEXT_PUBLIC_CRISP_ID_SITE}&locale=en`}
                referrerPolicy="origin"
                sandbox="allow-forms allow-popups allow-scripts"
                width="100%"
                height="600px"
                frameBorder="0"
              />
            </div>
            <div className="container-descriptions-assistance">
              <div className="container-menu-titles">
                {assistanceCenterInfo.collapsableMenu.map(menu => (
                  <div key={menu.id}>
                    <button
                      className="container-accordion"
                      onClick={() => executeScroll(menu.id)}
                    >
                      <div className="font-bold uppercase text-sm">
                        {menu.title}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
              <div
                id="container"
                className="container-menu-titles-descriptions"
              >
                {assistanceCenterInfo.collapsableMenu.map(menu => (
                  <div id={menu.id} key={menu.id}>
                    <div className="font-bold uppercase text-sm">
                      {menu.title}
                    </div>
                    {menu.description.includes("https") ? (
                      <div className="">
                        <iframe
                          className="w-full"
                          height="700"
                          scrolling="no"
                          src={menu.description}
                        />
                      </div>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: menu.description,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedPage>
      </Layout>
      <style jsx="true">{`
        .page-container {
          margin-top: 50px;
          margin-bottom: 20px;
        }
        .header-container {
          display: flex;
          flex-direction: column;
        }
        .header-image-container {
          position: relative;
          width: 100%;
          height: 300px;
          border-radius: 10px;
          overflow: hidden;
        }
        .container-descriptions-assistance {
          display: flex;
          margin-top: 40px;
        }
        .container-menu-titles {
          width: 20%;
        }
        .container-menu-titles-descriptions {
          width: 80%;
          height: 300px;
          overflow-y: scroll;
          -ms-overflow-style: none;
          scrollbar-width: none;
          text-align: center;
        }
        .container-menu-titles-descriptions::-webkit-scrollbar {
          display: none;
        }
        .container-accordion {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .icon {
          cursor: pointer;
        }
        @media (min-width: 768px) {
          .page-container {
            margin-top: 20px;
          }
          .header-container {
            display: flex;
            flex-direction: row;
            gap: 10px;
          }
          .header-image-container {
            width: 50%;
          }
          .header-description-container {
            width: 50%;
          }
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const assistanceCenterInfo = await getAssistanceCenterInfo();
  return {
    props: { assistanceCenterInfo, selectedMenu: query.menu || null },
  };
}

export default Index;

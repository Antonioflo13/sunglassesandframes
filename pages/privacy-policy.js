import React from "react";
import Head from "next/head";
import AnimatedPage from "../components/animated-page";
import Layout from "../components/layout";

const Policy = () => {
  return (
    <Layout>
      <Head>
        <title>Sunglassesandframes - Privacy Policy</title>
        <meta name="description" content="Privacy Policy" />
      </Head>
      <AnimatedPage margins={true}>
        <iframe
          className="w-full"
          height="800"
          src="https://www.iubenda.com/privacy-policy/22164738"
        />
      </AnimatedPage>
    </Layout>
  );
};

export default Policy;

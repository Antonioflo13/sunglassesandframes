import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <meta name="description" content="sunglassesandframes" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/reset-min.css"
        integrity="sha256-QlHlZdbSVxaYkUHxhMFhAj/L3pJiW1LuomSCONXBWms="
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
        integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc="
        crossOrigin="anonymous"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

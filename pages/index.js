import Head from 'next/head'

import Sidebar from "../components/Sidebar.js";
//index.js points to our home directory - localhost::/3000
//yarn dev allows up to fast reload/fast refresh
//next is sitting on top of react 
//css modules - styled componenets
export default function Home() {
  return (
    <div>
      <Head>
        <title>Buzz Bulletin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Sidebar/>
  
     
    </div>
  )
}

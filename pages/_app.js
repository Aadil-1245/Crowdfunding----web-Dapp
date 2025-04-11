import "../styles/globals.css";

//INTERNAL IMPORT 
import {NavBar , Footer } from "../Components";
import {CrowdfundingProvider} from "../Context/CrowdFunding";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CrowdfundingProvider>
   
      <NavBar />

      <Component {...pageProps} />
      <Footer />
      </CrowdfundingProvider>
    </>
    
  );
}

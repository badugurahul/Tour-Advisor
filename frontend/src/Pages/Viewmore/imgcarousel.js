import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Imgcarousel ({imag}) {
   return (
      <div className="box">
         <Carousel useKeyboardArrows={true}> 
            {imag.map( ( URL, i ) => (
               <div style={{width:"1200px",height:"650px"}}>
                  <img alt="sample_file" src={URL} key={i} />
               </div>
            ) )}
         </Carousel>
      </div>
   );
}
export default Imgcarousel;

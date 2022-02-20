import React from 'react'
import * as Fi from "react-icons/fi"
import * as Ai from "react-icons/ai"
function Contactus() {
    return (
        <div class="container">
			<div class="row">
				<div class="col-sm text-center">
				  <h1 class="div-heading display-4">Contact US</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<form>
					  <div class="form-group">
						  <input type="name" class="form-control" id="exampleInputName" placeholder="Your Full Name..."/>
					  </div>
            <div class="form-group">
						  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Email Address..."/>
					  </div>
					  <div class="form-group">
              <select class="form-control" id="exampleFormControlSelect1" placeholder="Select Services...">
                <option>Corporate</option>
                <option>Wedding</option>
                <option>Pickup</option>
              </select>
					  </div>
            <div class="form-group">
              <textarea class="form-control" aria-label="With textarea"></textarea>
            </div>
					  <button type="submit" class="btn btn-warning btn-lg btn-block">Submit</button>
					</form>
			  </div>
			  <div  class="col-md-6">
          <h5>Address: <small class="text-muted">Venkatadri IT Park, HP Avenue, Konnappana, Electronic city, Bengaluru, Karnataka 560069</small></h5>
          <h5>Email: <small class="text-muted">hire@luxurytaxicab.com</small></h5>
          <h5>Contact: <small class="text-muted">+91 98765 10278 || +91 76589 14244</small></h5>
 <p><iframe width="600" height="450" frameborder="0" 
src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJtcNatvRsrjsRA38LEBPt_78&key=..." allowfullscreen></iframe></p> 
          <div class="text-center">
            <img class="img-fluid contact-image" alt="Responsive image" src="https://csds.qld.edu.au/sdc/resources/images/find-us-map.jpg" class="rounded" alt="..."/>
          </div>
	  		</div>
        
			</div>
		</div>


    )
}

export default Contactus
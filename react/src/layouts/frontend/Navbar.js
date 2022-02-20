import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "../../assets/frontend/Dropdown.css"
import "../../assets/frontend/main.css"

function Navbar() {
	const [isActive, setActive] = useState("home")

	return (
		<>		<nav className="navbar navbar-expand-sm navbar-light sticky-top " style={{ "background": "#2e3138" }}>
			<div className="container-fluid">
				<Link className="navbar-brand" to="#!"><span className='b1' style={{ "fontFamily": "'Lato', sans-serif" }}>Nrj</span>
					<span className='b2'>+</span>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="mynavbar">
					<ul className="navbar-nav ">
						<li className="nav-item">
							<Link className={isActive === "home" ? "nav-link active" : "nav-link"} to="/" onClick={() => setActive("home")}>Home</Link>
						</li>
						<li className="nav-item">
							<Link className={isActive === "blog" ? "nav-link active" : "nav-link"} to="#" onClick={() => setActive("blog")} to="#" >Blog</Link>
						</li>
						<li className=" nav-item dropdownMine" >
							<Link to="/who-are-we" className={isActive === "G3EI" ? "nav-link active dropdownMinebtn" : "nav-link dropdownMinebtn"} to="#" onClick={() => setActive("G3EI")}>G3EI</Link>
							<div className="dropdownMine-content">
								<a href="/who-are-we#ensat" className='nav-item'>La filiere</a>
								<a href="/who-are-we#ade" className='nav-item'>Stage</a>
								<a href="/who-are-we#" className='nav-item'>Marche de travail</a>
								<a href="/who-are-we#" className='nav-item'>Chef de filiere</a>
							</div>
						</li>
						<li className=" nav-item dropdownMine">
							<Link to="/who-are-we" className={isActive === "NRJ" ? "nav-link active dropdownMinebtn" : "nav-link dropdownMinebtn"} to="#" onClick={() => setActive("NRJ")}>NRJ+</Link>
							<div className="dropdownMine-content">
								<a href="#" className='nav-item'>Club Nrj+</a>
								<a href="#" className='nav-item'>Activités</a>
								<a href="#" className='nav-item'>Événements</a>
							</div>
						</li>
						<li className=" nav-item dropdownMine">
							<Link to="/who-are-we" className={isActive === "us" ? "nav-link active dropdownMinebtn" : "nav-link dropdownMinebtn"} to="#" onClick={() => setActive("us")}>About us</Link>
							<div className="dropdownMine-content">
								<a href="/who-are-we#ensat" className='nav-item'>Ensat</a>
								<a href="/who-are-we#ade" className='nav-item'>ADE</a>
								<a href="/who-are-we#" className='nav-item'>Nos valeurs</a>
								<a href="/who-are-we#" className='nav-item'>Fondateur</a>
								<a href="/who-are-we#team" className='nav-item'>Notre equipe</a>
							</div>
						</li>
						<li className="nav-item">
							<Link className={isActive === "docs" ? "nav-link active" : "nav-link"} onClick={() => setActive("docs")} to={localStorage.getItem("auth_name") ? "/delegate": "/login" }>Documents</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		</>

	)
}

export default Navbar
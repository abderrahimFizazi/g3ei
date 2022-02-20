import React from 'react'
import { Link } from 'react-router-dom'
import "../../src/assets/frontend/page404.css"
export default function Page403() {
  return (
    <div className='alo'>
    <section class="notFound ">
    <div className="img">
      <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage" />
      <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly" />
    </div>
    <div class="text2">
      <h1 className='uk'>403</h1>
      <h2 className='uk'>Forbbiden</h2>
      <h3 className='uk'>BACK TO HOME?</h3>
      <Link to="/"className='uk' >YES</Link>
      <a href="https://www.youtube.com/watch?v=G3AfIvJBcGo" className='uk'>NO</a>
    </div>
  </section>
  </div>
  )
}

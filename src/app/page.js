"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import "remixicon/fonts/remixicon.css";
import { ScrollTrigger } from 'gsap/all';

function Page() {
  let [showContent, setShowContent]=useState(false);

  useGSAP(() => {
  gsap.registerPlugin(ScrollTrigger);

  const t2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".main-overlay",
      start: "top 80%",       // when top of element is 80% from top of viewport
      end: "bottom top",      // optional end point
      toggleActions: "play none none reverse", 
      // play → on enter, reverse → on leave back
      markers: true,          // remove later, for debugging
    }
  });

  // Initial state
  t2.set(".main-overlay", { scale: 1.45 });

  // Scale down
  t2.to(".main-overlay", {
    scale: 1,
    duration: 1,
    ease: "power3.out",
  });

  // Background resize
  t2.to(".main-overlay", {
    backgroundSize: "28vh",
    duration: 1.5,
    ease: "power3.out",
  }, "<+=0.2");

}, []);

  useGSAP(()=>{
    const tl= gsap.timeline();
    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin:"50% 50%",

    })
    .to(".vi-mask-group", {
      scale:10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin:"50% 50%",
      opacity: 0,
      onUpdate: function(){
        if(this.progress()>=.9){
          const svgElem = document.querySelector(".svg");
          if (svgElem) {
            svgElem.remove();
            setShowContent(true);
            this.kill();
          }
        }
      }
    });
  });

  useGSAP(()=>{
    if (!showContent) return;

    gsap.to(".main", {
      rotate: 0,
      scale: 1,
      duration: 2,
      delay: -1,
      ease: "Expo.easeInOut",
    });
    gsap.to(".sky", {
      rotate: 0,
      scale: 1,
      duration: 2,
      delay: -.8,
      ease: "Expo.easeInOut",
    });
    gsap.to(".bg", {
      rotate: 0,
      scale: 1,
      duration: 2,
      delay: -.8,
      ease: "Expo.easeInOut",
    });
    

    const main = document.querySelector(".main");
    main?.addEventListener("mousemove",function(e){
      const xMove = (e.clientX/window.innerWidth - .5)*40;
      gsap.to(".imagesdiv .text", {
        x: `${xMove * 0.4}%`,
        // duration: 0.5,
        // ease: "power2.out"
      });
      gsap.to(".sky", {
        x: `${xMove * 0.2}%`,
        // duration: 0.5,
        // ease: "power2.out"
      });
      gsap.to(".bg", {
        x: `${xMove * 0.9}%`,
        // duration: 0.5,
        // ease: "power2.out"
      });
    })
  },[showContent]);



  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          className="absolute w-full h-full"
        >
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="250"
                  fontFamily="Arial Black"
                >
                  PANTHEON
                </text>
              </g>
            </mask>
          </defs>
          <foreignObject width="100%" height="100%" mask="url(#viMask)">
            <div style={{ width: "100%", height: "100%" }}>
              <Image
                src="/bg.png"
                alt="Background"
                fill
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                priority
              />
            </div>
          </foreignObject>
        </svg>
      </div>
      {showContent && (
        <div className="main w-full rotate-[-10deg] scale-[1.7]">
          <div className="landing w-full h-[300vh] bg-black text-white">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10 ">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px] ">
                  <div className="line w-10 h-[3px] bg-white mb-0"></div>
                  <div className="line w-8 h-[3px] bg-white mb-0"></div>
                  <div className="line w-5 h-[3px] bg-white mb-0"></div>
                </div>
                <h3 className="text-4xl mt-[-11px] leading-none">Rockstar</h3>
              </div>
            </div>
            <div className="imagesdiv overflow-hidden relative w-full h-screen ">
              <Image
                src="/sky.png"
                alt="SKY"
                fill
                className="sky scale-[1.5] rotate-[-20deg] absolute top-0 left-0"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                priority
              />
              <Image
                src="/bg.png"
                alt="Background"
                fill
                className="absolute  scale-[1.8] rotate-[-3deg] bg top-0 left-0"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                priority
              />
              <Image
                src="/logo_white.svg"
                alt="Hero Logo"
                className="absolute main-overlay object-none object-[50%_41.7%]" 
                width={1000}
                height={1000}
                style={{
                  width: "1000vw",          // matches background-size: 1000vh
                  height: "100vh",          // matches container height
                  transform: "scale(200.25)", // matches initial transform
                  transformOrigin: "center",
                  paddingBottom: "200px",   // matches pb-[200px]
                  paddingLeft: "250px",      // matches pl-[200px]
                }}
              />

              <div className="text character text-white flex flex-col gap-4 absolute top-8 left-1/2 -translate-x-1/2">
                <h1 className='text-[8rem] -ml-40 leading-none'>Grand</h1>
                <h1 className='text-[8rem] -ml-20 leading-none'>Theft</h1>
                <h1 className='text-[8rem] -ml-40 leading-none'>Auto</h1>
              </div>
              <img
                src="/girlbg.png"
                alt="Background"
                className="absolute -bottom-[63%] scale-[.7] left-1/2 -translate-x-1/2"
                
              />
            </div>
          </div>
          
        </div>
      )}
    </>
  );
}

export default Page

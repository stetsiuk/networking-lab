!function(){"use strict";const e=document.querySelectorAll(".action__toggle"),t=document.querySelector(".action__backoffice-bord"),c=document.querySelector(".action__frontoffice-bord"),o=t.querySelectorAll(".tab"),l=c.querySelectorAll(".tab"),a=t.querySelectorAll(".action__info"),s=c.querySelectorAll(".action__info");document.addEventListener("DOMContentLoaded",(()=>{e.forEach(((o,l)=>{o.addEventListener("click",(()=>{e.forEach((e=>{e.classList.remove("active")})),o.classList.add("active"),0===l?(c.style.display="none",t.style.display="block"):1===l&&(t.style.display="none",c.style.display="block")}))})),o.forEach(((e,t)=>{e.addEventListener("click",(()=>{o.forEach((e=>{e.classList.remove("active")})),e.classList.add("active"),a.forEach((e=>{e.style.display="none"})),a[t].style.display="block"}))})),l.forEach(((e,t)=>{e.addEventListener("click",(()=>{l.forEach((e=>{e.classList.remove("active")})),e.classList.add("active"),s.forEach((e=>{e.style.display="none"})),s[t].style.display="block"}))})),function(){const e=document.querySelector(".promo__btn"),t=document.querySelector(".trial__btn"),c=document.querySelector(".overlay"),o=document.querySelector("#contact"),l=document.querySelector(".modal__close"),a=e=>{e.addEventListener("click",(()=>{c.style.display="block",o.style.display="block"}))};a(e),a(t),l.addEventListener("click",(()=>{c.style.display="none",o.style.display="none"}))}()}))}();
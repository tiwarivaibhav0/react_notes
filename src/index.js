import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const scrollTop = () => {
  window.scroll(0, 0);
};

window.addEventListener('scroll',(event) => {
   if(window.pageYOffset>180 || document.documentElement.scrollTop>180)
  document.getElementById("top").style.bottom="50px";
  else
  document.getElementById("top").style.bottom="-100px";


});
root.render(
  <React.StrictMode>
    <App />
    <div>
        <button onClick={scrollTop} id="top">
        <i class="fa-solid fa-circle-arrow-up"></i>        </button>
      </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

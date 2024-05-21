import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import ReactDOMServer from 'react-dom/server';
import { createContext } from 'react';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function domToString(element){
  return ReactDOMServer.renderToString(element)
}

export function cleanHTML(htmlString){
  htmlString = htmlString.replace(/<img[^>]*>/g, ' [image]');
  htmlString = htmlString.replace(/<[^>]*>/g, ' ');
  htmlString = htmlString.replace(/&lt;/g, '<');
  htmlString = htmlString.replace(/&gt;/g, '>');

  return htmlString;
}



import {compileClasses} from './logic';
import theme from 'tailwindcss/theme.css?raw';
import preflight from 'tailwindcss/preflight.css?raw';
self.onmessage=async(e)=>{try{self.postMessage({css:await compileClasses(e.data,theme,preflight)});}catch(error){self.postMessage({error:(error as Error).message});}};

/**
 * Inline <head> scripts, run during parsing before React hydrates. Kept in a
 * plain module: values exported from a "use client" file reach server
 * components as client references, not strings.
 */

/** Opts the page into scroll reveals before first paint (see RevealObserver). */
export const revealBootScript = `(function(){try{var d=document.documentElement;if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('reveal');setTimeout(function(){if(!window.__revealReady)d.classList.remove('reveal')},4000)}}catch(e){}})();`;

/**
 * Netlify injects an HTML comment (plus a newline) into <head> on production
 * deploys. React hydrates <head>, finds nodes it didn't render, and throws
 * hydration error #418, re-rendering the whole page. Remove just that comment
 * and its whitespace before hydration.
 */
export const hostCommentCleanup = `(function(){try{var h=document.head;if(!h)return;for(var n=h.firstChild;n;){var x=n.nextSibling;if(n.nodeType===8&&/hosted on Netlify/i.test(n.data)){var p=n.previousSibling;if(p&&p.nodeType===3&&!p.data.trim())h.removeChild(p);if(x&&x.nodeType===3&&!x.data.trim()){var y=x.nextSibling;h.removeChild(x);x=y}h.removeChild(n)}n=x}}catch(e){}})();`;

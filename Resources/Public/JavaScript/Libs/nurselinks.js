jQuery(document).ready(function($){
  'use strict';

  function nurseLinks(){
    $('a').each(function(i,e){
      function trySel(sel){
        if($(sel).length > 0){ $(e).attr('href', sel); return true; }
        return false;
      }
      var h = e.hash.toString().match(/^#.+/);
      if(h && h.length && trySel(e.hash.toString())) return;
      var m = e.search.toString().match(/id=(.+)/);
      if(m && m.length && m.length > 1){
        trySel('#p' + m[1]) || trySel('#' + m[1]);
      }
    });
  }
  nurseLinks();

  /* cross browser (IE9+, FF, Webkit) Dom Observer - http://stackoverflow.com/questions/3219758/detect-changes-in-the-dom#answer-14570614 */
  var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver, eventListenerSupported = window.addEventListener;
    return function(obj, callback){
      if( MutationObserver ){
        // define a new observer
        var obs = new MutationObserver(function(mutations, observer){
          if( mutations[0].addedNodes.length || mutations[0].removedNodes.length ) callback();
        });
        // have the observer observe foo for changes in children
        obs.observe( obj, { childList:true, subtree:true });
      }else if( eventListenerSupported ){
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
      }}
  })();

  observeDOM(document.body, nurseLinks);

});
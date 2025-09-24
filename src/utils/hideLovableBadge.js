// Script pour masquer l'élément lovable-badge
(function() {
  'use strict';
  
  // Fonction pour masquer l'élément lovable-badge
  function hideLovableBadge() {
    const lovableBadge = document.getElementById('lovable-badge');
    if (lovableBadge) {
      lovableBadge.style.display = 'none';
      lovableBadge.style.visibility = 'hidden';
      lovableBadge.style.opacity = '0';
      lovableBadge.style.position = 'absolute';
      lovableBadge.style.left = '-9999px';
      lovableBadge.remove(); // Supprime complètement l'élément du DOM
      console.log('Element lovable-badge masqué et supprimé');
    }
  }
  
  // Masquer immédiatement si l'élément existe déjà
  hideLovableBadge();
  
  // Observer les changements dans le DOM pour masquer l'élément s'il apparaît plus tard
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            // Vérifier si le nœud ajouté est l'élément lovable-badge
            if (node.id === 'lovable-badge') {
              hideLovableBadge();
            }
            // Vérifier aussi dans les enfants
            const lovableBadgeChild = node.querySelector && node.querySelector('#lovable-badge');
            if (lovableBadgeChild) {
              hideLovableBadge();
            }
          }
        });
      }
    });
  });
  
  // Commencer à observer les changements dans le DOM
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Masquer périodiquement au cas où l'observateur rate quelque chose
  setInterval(hideLovableBadge, 1000);
  
  // Masquer aussi au chargement de la page
  document.addEventListener('DOMContentLoaded', hideLovableBadge);
  window.addEventListener('load', hideLovableBadge);
  
})();

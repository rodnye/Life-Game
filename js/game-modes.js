// Modos de juego
const GAME_MODES = {
 
  "clasic": {
    name: "Clásico", 
    mode: "23/3",
    type: "complejo",
    info: "Modo de juego clásico."
  },
  
  "dead": {
    name: "Muertes", 
    mode: "245/368",
    type: "estable",
    info: "Muerte, locomotoras y naves celulares."
  },
  
  "range": {
    name: "Columpios", 
    mode: "51/346",
    type: "crecimiento",
    info: "Patrones osciladores."
  },
  
  
  "rug": {
    name: "Alfombras", 
    mode: "245/368",
    type: "crecimiento",
    info: "Patrones de alfombras."
  },
  
  
  "ink": {
    name: "Mancha de Tinta", 
    mode: "235678/3678",
    type: "estable",
    info: "Mancha de tinta que se seca rapidamente."
  },
  
  
  "highlife": {
    name: "HighLife",
    mode: "23/36",
    type: "caótico",
    info: "Similar al clásico, lo que posee replicantes."
  },
  
  
  "sparks": {
    name: "Sparks",
    mode: "/3",
    type: "estable",
    info: "Patrones pequeños que aparecen y desaparecen rápidamente."
  },
  
  
  "diamonds": {
    name: "Diamantes",
    mode: "5678/35678",
    type: "caótico",
    info: "Patrones de diamantes y catástrofes celulares.."
  },
  
  
  "breeder": {
    name: "Breeder",
    mode: "5678/35678",
    type: "crecimiento",
    info: "Se replican a sí mismas, crecen a gran velocidad."
  },
  
  
  "amoeba": {
    name: "Amebas",
    mode: "1357/1357",
    type: "caótico",
    info: "Reino equilibrado de amebas."
  },
  
  
  "diffusion": {
    name: "Difución",
    mode: "2/7",
    type: "caótico",
    info: "Pistolas, naves y trenes."
  }
};
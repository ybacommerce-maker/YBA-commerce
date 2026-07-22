// ==========================================================
//  IMAGENS CONFIAVEIS (curadas)
//  URLs de imagens que sabemos que carregam bem (as mesmas dos
//  produtos). Reaproveitadas nas colagens editoriais da home para
//  garantir que nada apareça como caixa vazia.
//  Para trocar por fotos suas, basta editar as URLs aqui.
// ==========================================================
const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80`;

export const IMG = {
  alface: u("photo-1622206151226-18ca2c9ab4a1"),
  cenoura: u("photo-1598170845058-32b9d6a5da37"),
  tomate: u("photo-1592924357228-91a4daadcfea"),
  banana: u("photo-1603833665858-e61d17a86224"),
  pimenta: u("photo-1583119022894-919a68a3d0e3"),
  beterraba: u("photo-1593105544559-ecb03bf76f82"),
  manga: u("photo-1605027990121-cbae9e0642df"),
  feijao: u("photo-1596040033229-a9821ebd058d"),
  cesta: u("photo-1542838132-92c53300491e"),
  cebola: u("photo-1618512496248-a07fe83aa8cb"),
};

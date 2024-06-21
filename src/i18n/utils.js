import i18n from "i18next";

async function cambiarIdioma(idioma) {
  try {
    return await new Promise((resolve, reject) => {
      i18n.changeLanguage(idioma, (err, t) => {
        if (err) {
          reject(err);
        } else {
          resolve(t);
        }
      });
    });
  } catch (error) {
    throw new Error("Error al cambiar de idioma: " + error.message);
  }
}
export { cambiarIdioma };

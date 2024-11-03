import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
    es: {
        translation: {
            "welcome": ` Genera una Historia Épica con tu Comunidad.  Tu héroe está listo para enfrentar grandes desafíos, pero necesita tu guía. Escoge un personaje y sumérgete en una aventura única, donde cada decisión es tomada por ti y tu comunidad en Twitch. Elige a tu héroe y lánzate a una aventura inolvidable. ¡La acción comienza ahora!`,
            "context": "¿Quieres darle un toque personal a tu aventura? Escribe un breve contexto para comenzar tu historia. Ya sea una tierra misteriosa, una ciudad futurista o un antiguo reino, tu aporte dará forma al mundo que tu héroe explorará. ¿Prefieres no agregar nada ? No hay problema—simplemente omite este paso y deja que la aventura se desarrolle por sí sola."
        }
    },
    en: {
        translation: {
            "welcome": `Your hero is ready to face great challenges, but they need your guidance. \nChoose a character and dive into a unique adventure where every decision is made by you and your Twitch community. Pick your hero and dive into an unforgettable adventure. The action starts now!`,
            "context": "Want to add a personal touch to your adventure? Write a short context to kickstart your story. Whether it's a mysterious land, a futuristic city, or an ancient kingdom, your input shapes the world your hero will explore. Don't feel like adding anything? No problem—just skip and let the adventure unfold on its own!"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "es",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
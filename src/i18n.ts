import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
    es: {
        translation: {
            "welcome": "¡Bienvenidos a una **épica batalla de decisiones**! En esta aventura, un villano misterioso y poderoso es elegido al azar para enfrentarse a tu héroe. Pero no estás solo en esta lucha:\n\n- El **chat de Twitch** decide cada movimiento a través de encuestas, ¡y todos pueden influir en el resultado!\n\n- Usa **puntos del canal** para desbloquear poderosos *power-ups* de defensa y ataque, ya sea para fortalecer a tu héroe o hacer que el villano sea aún más temible.\n\n¿Tienes lo necesario para vencer al enemigo con el apoyo de la comunidad?\n\nSelecciona el héroe que representará a la comunidad en esta batalla épica. ¿Quién liderará la lucha contra el villano?",
            "context": "¿Quieres darle un toque personal a tu aventura? Escribe un breve contexto para comenzar tu historia. Ya sea una tierra misteriosa, una ciudad futurista o un antiguo reino, tu aporte dará forma al mundo que tu héroe explorará. ¿Prefieres no agregar nada ? No hay problema—simplemente omite este paso y deja que la aventura se desarrolle por sí sola.\n\n ",
            "user.login.title": "¡Conecta tu cuenta de Twitch y únete a la batalla!",
            "user.login.description": "Prepárate para una batalla épica junto a la comunidad. Conecta tu cuenta de Twitch y toma el control en cada enfrentamiento decisivo. ¡El destino de tu héroe está en tus manos!",
            "user.login.action": "¡Conectar y entrar en la batalla!",
            "newbattle": "Nueva Batalla"
        }
    },
    en: {
        translation: {
            "welcome": "Welcome to an **epic battle of decisions**! In this adventure, a mysterious and powerful villain is randomly chosen to face off against your hero. But you’re not alone in this fight:\n\n- The **Twitch chat** votes on every move through polls, and everyone can influence the outcome!\n- Use **channel points** to unlock powerful defense and attack *power-ups*—whether to strengthen your hero or make the villain even more formidable.\n\nSelect the hero who will represent the community in this epic battle. Who will lead the charge against the villain?",
            "context": "Want to add a personal touch to your adventure? Write a short context to kickstart your story. Whether it's a mysterious land, a futuristic city, or an ancient kingdom, your input shapes the world your hero will explore. Don't feel like adding anything? No problem—just skip and let the adventure unfold on its own!",
            "user.login.title": "Connect Your Twitch Account and Join the Battle!",
            "user.login.description": "Get ready for an epic battle with the community. Connect your Twitch account and take charge in every decisive showdown. Your hero's fate is in your hands!",
            "user.login.action": "Connect and Enter the Battle!",
            "newbattle": "New Battle"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: window.navigator.language,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
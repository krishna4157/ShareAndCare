
// import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './locale-en';
import ru from './locale-ru';
import fr from './locale-fr';
import ja from './locale-ja';
import es from './locale-sa';

i18n.fallbacks = true;
i18n.translations = { 
    'en-US': en, 
    'ru-RU': ru, 
    'fr-FR': fr, 
    'ja-JP': ja, 
    'es-ES': es };

export default i18n;
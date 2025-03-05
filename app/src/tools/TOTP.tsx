import { NativeModules } from 'react-native'; 
import 'react-native-url-polyfill/auto' 

const { TOTPModule } = NativeModules; 



/////   FONCTION PRINCIPALE   /////
async function generateTOTPFromURL(otpauthUrl: string): Promise<{ otpCode: string, website: string, identifier: string, error: boolean, period: number }> {
    
    try {
        // analyse de l'URL et extraction des paramètres
        const url = new URL(otpauthUrl);
        const params = new URLSearchParams(url.search);

        // extraction de l'identifiant depuis le chemin de l'URL
        const pathParts = url.pathname.split(':'); 
        const identifier = pathParts.length > 1 ? pathParts[1] : 'Unknown';

        // récupération des paramètres du TOTP
        const secret = params.get('secret'); // Clé secrète utilisée pour générer le TOTP
        const algorithm = params.get('algorithm') || 'SHA1'; // Algorithme de hachage (par défaut SHA1)
        const digits = parseInt(params.get('digits') || '6', 10); // Nombre de chiffres du TOTP (par défaut 6)
        const period = parseInt(params.get('period') || '30', 10); // Période de validité en secondes (par défaut 30s)
        const website = params.get('issuer') || 'Unknown'; // Récupération du site web associé (issuer)

        // vérification que la clé secrète est bien présente
        if (!secret) {
            throw new Error('Secret is missing in the URL');        }

        // appel du module natif pour générer le code TOTP
        const otpCode = await TOTPModule.getTOTP(secret, digits, period);
        const error = false;
        
        return { otpCode, website, identifier, error, period}; 
    } catch (error) {
        return { otpCode: "Erreur", website: "Unknown", identifier: "Unknown", error: true, period: 30 };
    }
}

export default generateTOTPFromURL;


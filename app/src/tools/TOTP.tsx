import { NativeModules } from 'react-native';
import 'react-native-url-polyfill/auto'

const { TOTPModule } = NativeModules;

async function generateTOTPFromURL(otpauthUrl: string): Promise<string> {
    try {
        const url = new URL(otpauthUrl);
        const params = new URLSearchParams(url.search);

        const secret = params.get('secret');
        const algorithm = params.get('algorithm') || 'SHA1'; // SHA1 par défaut si non spécifié
        const digits = parseInt(params.get('digits') || '6', 10);
        const period = parseInt(params.get('period') || '30', 10);

        if (!secret) {
            throw new Error('Secret is missing in the URL');
        }
        const otpCode = await TOTPModule.getTOTP(secret, digits, period);
        return otpCode;
    } catch (error) {
        console.error("Erreur lors du calcul du TOTP:", error);
        return "Erreur";
    }
}

export default generateTOTPFromURL;
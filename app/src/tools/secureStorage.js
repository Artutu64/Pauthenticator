import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Stocker une session utilisateur
 */
export async function storeUserSession(data) {
    try {
        await EncryptedStorage.setItem("user_session", JSON.stringify(data));
        console.log("✅ Session utilisateur stockée avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors du stockage :", error);
    }
}

/**
 * Récupérer une session utilisateur
 */
export async function retrieveUserSession() {
    try {
        const session = await EncryptedStorage.getItem("user_session");
        if (session !== undefined) {
            return JSON.parse(session);
        } else {
            console.log("⚠️ Aucune session trouvée !");
            return null;
        }
    } catch (error) {
        console.error("❌ Erreur lors de la récupération :", error);
        return null;
    }
}

/**
 * Supprimer une session utilisateur
 */
export async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user_session");
        console.log("🗑️ Session utilisateur supprimée !");
    } catch (error) {
        console.error("❌ Erreur lors de la suppression :", error);
    }
}

/**
 * Effacer tout le stockage sécurisé
 */
export async function clearStorage() {
    try {
        await EncryptedStorage.clear();
        console.log("🧹 Stockage sécurisé vidé !");
    } catch (error) {
        console.error("❌ Erreur lors du nettoyage :", error);
    }
}

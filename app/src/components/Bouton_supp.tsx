import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

// INCLUSION DU STYLE
import styles from '../styles/bouton_supp_styles';

interface BoutonSuppProps {
  onClear: () => void;
}



/////   FONCTION PRINCIPALE   /////
const BoutonSupp: React.FC<BoutonSuppProps> = ({ onClear }) => {
  
  // fonction pour supprimer tous les QR Codes
  const handleClearStorage = async () => {

    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer tous les QR Codes enregistrés ?",
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Supprimer", 
          style: "destructive", 
          onPress: async () => {
            try {
              await EncryptedStorage.clear();
              onClear(); // Met à jour l'affichage
              Alert.alert("Succès", "Tous les QR Codes ont été supprimés.");
            } catch (error) {
              console.error("❌ Erreur lors du nettoyage :", error);
            }
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleClearStorage}>
        <Text style={styles.buttonText}>Supprimer tous les QR Codes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BoutonSupp;

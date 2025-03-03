import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper'; // Librairie pour la ProgressBar

// INCLUSION DU STYLE
import styles from '../styles/card_styles';
import generateTOTPFromURL from '../tools/TOTP';

// Définition du type des props du composant Card
interface CardProps {
  data: string; // L'URL otpauth:// à traiter
}

/////   FONCTION PRINCIPALE   /////
const Card: React.FC<CardProps> = ({ data }) => {
  
  // État pour stocker les informations du TOTP
  const [totpData, setTotpData] = useState<{ otpCode: string; website: string; identifier: string; period?: number } | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(30); // Temps restant avant mise à jour
  const [totalPeriod, setTotalPeriod] = useState<number>(30); // Durée totale du cycle TOTP

  // Fonction pour récupérer et mettre à jour le code TOTP
  const fetchTOTP = async () => {
    const result = await generateTOTPFromURL(data);
    setTotpData(result);

    // Si `period` est présent dans l'URL, on l'utilise pour le timer (sinon 30s par défaut)
    const period = result.period || 30;
    setTotalPeriod(period); // Stocker la durée totale pour la ProgressBar
    const currentTime = Math.floor(Date.now() / 1000);
    setRemainingTime(period - (currentTime % period));
  };

  // Charger le TOTP une fois le composant monté et le mettre à jour chaque seconde
  useEffect(() => {
    fetchTOTP(); // Charger immédiatement le TOTP

    const interval = setInterval(() => {
      fetchTOTP(); // Rafraîchir le TOTP
    }, 1000);

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage
  }, [data]); // Exécuter cet effet lorsque `data` change

  // Décrémenter le compte à rebours chaque seconde
  useEffect(() => {
    const countdown = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : totalPeriod - 1));
    }, 1000);

    return () => clearInterval(countdown);
  }, [totpData, totalPeriod]);

  // Fonction pour formater le TOTP en groupes de 2 chiffres (et 3 pour un nombre impair)
  const formatTOTP = (otpCode: string) => {
    if (!otpCode) return '';

    const digits = otpCode.split('');
    const groups = [];
    let i = 0;

    while (i < digits.length) {
      if (i + 3 === digits.length) {
        groups.push(digits.slice(i, i + 3).join(''));
        break;
      }
      groups.push(digits.slice(i, i + 2).join(''));
      i += 2;
    }

    return groups.join(' ');
  };

  return (
    <View style={styles.card}>
      {totpData ? (
        <>
          <Text style={styles.text}>🌍 Site: {totpData.website}</Text>
          <Text style={styles.text}>👤 Identifiant: {totpData.identifier}</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
            {formatTOTP(totpData.otpCode)}
          </Text>
          
          {/* Barre de progression qui diminue avec le temps */}
          <ProgressBar 
            progress={remainingTime / totalPeriod} // Valeur entre 0 et 1
            color={remainingTime <= 5 ? 'red' : remainingTime <= 10 ? 'orange' : 'green'}
            style={localStyles.progressBar}
          />
        </>
      ) : (
        <Text style={styles.text}>Chargement...</Text>
      )}
    </View>
  );
};

// Styles spécifiques pour la ProgressBar
const localStyles = StyleSheet.create({
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: 10,
  }
});

export default Card;

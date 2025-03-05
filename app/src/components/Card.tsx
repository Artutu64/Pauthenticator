import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';

// INCLUSION DU STYLE
import styles from '../styles/card_styles';
import generateTOTPFromURL from '../tools/TOTP';

interface CardProps {
  data: string; 
}



/////   FONCTION PRINCIPALE   /////
const Card: React.FC<CardProps> = ({ data }) => {
  
  // état pour stocker les informations du TOTP
  const [totpData, setTotpData] = useState<{ otpCode: string; website: string; identifier: string; period?: number } | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(30); 
  const [totalPeriod, setTotalPeriod] = useState<number>(30); 

  // Fonction pour récupérer et mettre à jour le code TOTP
  const fetchTOTP = async () => {

    const result = await generateTOTPFromURL(data);
    setTotpData(result);

    const period = result.period || 30;
    setTotalPeriod(period); 
    const currentTime = Math.floor(Date.now() / 1000);
    setRemainingTime(period - (currentTime % period));
  };

  // charger le TOTP une fois le composant monté et le mettre à jour chaque seconde
  useEffect(() => {

    fetchTOTP(); 

    const interval = setInterval(() => {
      fetchTOTP(); 
    }, 1000);

    return () => clearInterval(interval);
  }, [data]); 

  // décrémenter le compte à rebours chaque seconde
  useEffect(() => {

    const countdown = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : totalPeriod - 1));
    }, 1000);

    return () => clearInterval(countdown);
  }, [totpData, totalPeriod]);

  // fonction pour formater le TOTP en groupes de 2 chiffres (et 3 pour un nombre impair)
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
          <Text style={styles.otpCode}>
            {formatTOTP(totpData.otpCode)}
          </Text>
          
          <ProgressBar 
            progress={remainingTime / totalPeriod}
            color={remainingTime <= 5 ? 'red' : remainingTime <= 10 ? 'orange' : 'green'}
            style={styles.progressBar}
          />
        </>
      ) : (
        <Text style={styles.text}>Chargement...</Text>
      )}
    </View>
  );
};

export default Card;

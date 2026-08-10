import React, { useState, useEffect } from 'react';
import { Shield, Camera, MapPin, Globe, CheckCircle, AlertTriangle, FileText, Award } from 'lucide-react';

interface CandidateVote {
  number: string;
  name: string;
  party: string;
  votes: string;
}

export default function App() {
  const [buData, BuSetData] = useState({
    zona: '',
    secao: '',
    municipio: '',
    turno: '1º Turno',
    eleicao: 'Eleições Municipais 2024'
  });

  const [candidates, setCandidates] = useState<CandidateVote[]>([
    { number: '12', name: 'Candidato Exemplo A', party: 'PARTIDO A', votes: '' },
    { number: '15', name: 'Candidato Exemplo B', party: 'PARTIDO B', votes: '' }
  ]);

  const [ipInfo, setIpInfo] = useState('Carregando IP...');
  const [gpsInfo, setGpsInfo] = useState('Obtendo localização GPS...');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Buscar IP do usuário
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIpInfo(data.ip))
      .catch(() => setIpInfo('Não foi possível obter o IP'));

    // Obter GPS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsInfo(`Lat: ${pos.coords.latitude.toFixed(4)}, Long: ${pos.coords.longitude.toFixed(4)}`);
        },
        () => {
          setGpsInfo('GPS negado ou indisponível');
        }
      );
    } else {
      setGpsInfo('Geolocalização não suportada');
    }
  }, []);

  const handleCandidateChange = (index: number, field: keyof CandidateVote, value: string) => {
    const newCandidates = [...candidates];
    newCandidates[index][field] = value;

import React, { useState } from 'react';
import { ShieldCheck, Fingerprint, Search, AlertTriangle, FileText, CheckCircle2, UserCheck } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'records' | 'verify'>('scanner');
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);

  const handleScan = () => {
    setScanning(true);
    setScannedData(null);
    setTimeout(() => {
      setScanning(false);
      setScannedData({
        nome: "Carlos Eduardo da Silva",
        cpf: "123.456.789-00",
        rg: "MG-12.345.678",
        status: "Regular",
        biometria: "Validada com Sucesso",
        dataRegistro: "10/08/2026",
        unidade: "Central de Identificação Digital"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Fingerprint className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Impressão Digital</h1>
              <p className="text-xs text-slate-400">Sistema Nacional de Identificação</p>
            </div>
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import logoImg from './1786380638881.png';

interface UrnaApurada {
  id: number;
  secao: string;
  qrCode: string;
  votos: { [key: string]: number };
  assinatura: string;
  ipDispositivo: string;
  dataHora: string;
}

// Componente para o Banner do Google AdSense
function BannerGoogle({ local }: { local: string }) {
  return (
    <div style={{
      backgroundColor: '#1e293b',
      border: '1px dashed #22c55e',
      color: '#94a3b8',
      padding: '12px',
      textAlign: 'center',
      fontSize: '12px',
      borderRadius: '8px',
      margin: '16px 0',
      fontWeight: 'bold'
    }}>
      [ ANÚNCIO GOOGLE ADSENSE - {local} ]
    </div>
  );
}

function App() {
  const [aba, setAba] = useState('inicio');
  
  // Base de dados simulada das urnas apuradas
  const [urnas, setUrnas] = useState<UrnaApurada[]>([
    {
      id: 1,
      secao: 'Seção 01 - Escola Central',
      qrCode: 'QR-URN-001-LA',
      votos: { 'Candidato A': 140, 'Candidato B': 110, 'Candidato C': 50 },
      assinatura: 'Assinatura_Hash_98a7f',
      ipDispositivo: '192.168.1.10 (Tablet)',
      dataHora: '11/08/2026 09:30'
    }
  ]);

  // Estados para registo de nova urna
  const [secao, setSecao] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [votosA, setVotosA] = useState('');
  const [votosB, setVotosB] = useState('');
  const [votosC, setVotosC] = useState('');
  const [assinatura, setAssinatura] = useState('');

  const salvarUrna = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secao || !qrCode) return;

    const novaUrna: UrnaApurada = {
      id: Date.now(),
      secao,
      qrCode,
      votos: {
        'Candidato A': Number(votosA) || 0,
        'Candidato B': Number(votosB) || 0,
        'Candidato C': Number(votosC) || 0
      },
      assinatura: assinatura || 'Assinatura Padrão Validada',
      ipDispositivo: '192.168.1.45 (Dispositivo Atual)',
      dataHora: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setUrnas([novaUrna, ...urnas]);
    setSecao('');
    setQrCode('');
    setVotosA('');
    setVotosB('');
    setVotosC('');
    setAssinatura('');
    setAba('apuracao');
  };

  // Cálculo Geral Consolidado
  const totalGeral = urnas.reduce((acc, curr) => {
    for (const [cand, qtd] of Object.entries(curr.votos)) {
      acc[cand] = (acc[cand] || 0) + qtd;
    }
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Cabeçalho com Logo e Identidade Visual */}
      <header style={{ backgroundColor: '#1e293b', borderBottom: '3px solid #22c55e', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={logoImg} alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #facc15' }} />
          <div>
            <h1 style={{ fontSize: '20px', margin: 0, fontWeight: 'bold', color: '#facc15' }}>Impressão Digital</h1>
            <p style={{ fontSize: '12px', margin: 0, color: '#94a3b8' }}>Módulo de Apuração & Auditoria</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setAba('inicio')} style={{ backgroundColor: aba === 'inicio' ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Início</button>
          <button onClick={() => setAba('registo')} style={{ backgroundColor: aba === 'registo' ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Registar Urna</button>
          <button onClick={() => setAba('apuracao')} style={{ backgroundColor: aba === 'apuracao' ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Apuração (Seções)</button>
          <button onClick={() => setAba('geral')} style={{ backgroundColor: aba === 'geral' ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Placar Geral</button>
        </div>
      </header>

      {/* Conteúdo das Abas */}
      <main style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
        
        {aba === 'inicio' && (
          <div>
            <BannerGoogle local="Topo da Tela Inicial" />
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '6px solid #facc15', marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 8px 0', color: '#facc15' }}>Sistema Operacional Integrado</h2>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>
                Ambiente seguro para leitura de QR Code de urnas, rastreamento de IP do equipamento operador e consolidação transparente de votos.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center' }}>
                <h3 style={{ color: '#22c55e', margin: '0 0 8px 0' }}>Urnas Registadas</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#f8fafc' }}>{urnas.length}</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center' }}>
                <h3 style={{ color: '#facc15', margin: '0 0 8px 0' }}>Status da Rede</h3>
                <p style={{ fontSize: '15px', margin: 0, color: '#22c55e' }}>● Seguro & Criptografado</p>
              </div>
            </div>
          </div>
        )}

        {aba === 'registo' && (
          <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155' }}>
            <BannerGoogle local="Topo da Leitura de QR Code" />
            <h2 style={{ color: '#facc15', marginTop: 0 }}>Leitura de QR Code & Boletim</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>Insira os dados da urna. O IP do seu equipamento será registado automaticamente.</p>
            
            <form onSubmit={salvarUrna} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Nome da Seção / Urna</label>
                <input type="text" value={secao} onChange={(e) => setSecao(e.target.value)} placeholder="Ex: Seção 02 - Escola Primária" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Código QR da Urna</label>
                <input type="text" value={qrCode} onChange={(e) => setQrCode(e.target.value)} placeholder="Ex: QR-URN-002-LA" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} required />
              </div>
              
              <div style={{ borderTop: '1px solid #334155', paddingTop: '12px' }}>
                <p style={{ color: '#22c55e', fontWeight: 'bold', margin: '0 0 10px 0', fontSize: '14px' }}>Contagem de Votos:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#94a3b8' }}>Candidato A</label>
                    <input type="number" value={votosA} onChange={(e) => setVotosA(e.target.value)} placeholder="0" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#94a3b8' }}>Candidato B</label>
                    <input type="number" value={votosB} onChange={(e) => setVotosB(e.target.value)} placeholder="0" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: '#94a3b8' }}>Candidato C</label>
                    <input type="number" value={votosC} onChange={(e) => setVotosC(e.target.value)} placeholder="0" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Assinatura Digital da Urna</label>
                <input type="text" value={assinatura} onChange={(e) => setAssinatura(e.target.value)} placeholder="Hash de segurança" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
              </div>

              <button type="submit" style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '8px' }}>
                Salvar Boletim & Registar IP
              </button>
            </form>
          </div>
        )}

        {aba === 'apuracao' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <BannerGoogle local="Topo da Apuração por Seção" />
            <h2 style={{ color: '#facc15', marginTop: 0, marginBottom: '16px' }}>Apuração por Seção (Urnas)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {urnas.map((u) => (
                <div key={u.id} style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, color: '#22c55e', fontSize: '16px' }}>{u.secao}</h3>
                    <span style={{ fontSize: '12px', color: '#94a3b8', backgroundColor: '#1e293b', padding: '2px 6px', borderRadius: '4px' }}>{u.qrCode}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '0 0 4px 0' }}>Assinatura: <code style={{ color: '#facc15' }}>{u.assinatura}</code></p>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 12px 0' }}>Equipamento/IP: <span style={{ color: '#22c55e' }}>{u.ipDispositivo}</span> ({u.dataHora})</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                    {Object.entries(u.votos).map(([cand, qtd]) => (
                      <div key={cand} style={{ backgroundColor: '#1e293b', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#94a3b8' }}>{cand}</p>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#f8fafc' }}>{qtd} votos</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aba === 'geral' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <BannerGoogle local="Topo do Placar Geral" />
            <h2 style={{ color: '#facc15', marginTop: 0, marginBottom: '8px' }}>Placar Geral Consolidado</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>Soma acumulada de todos os votos apurados nas seções do sistema.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.entries(totalGeral).map(([cand, total]) => (
                <div key={cand} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#f8fafc' }}>{cand}</span>
                  <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px' }}>
                    {total} Votos
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

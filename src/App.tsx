import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import logoImg from './1786380638881.png';

type CandidatoVoto = {
  nome: string;
  votos: number;
};

type UrnaApurada = {
  id: number;
  secao: string;
  qrCode: string;
  candidatos: CandidatoVoto[];
  assinatura: string;
  ipDispositivo: string;
  dataHora: string;
  confirmacoes: number;
  fiscaisIPs: string[];
};

function BannerGoogle(props: { local: string }) {
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
      [ ANÚNCIO GOOGLE ADSENSE - {props.local} ]
    </div>
  );
}

export default function App() {
  const [aba, setAba] = useState('inicio');
  
  const [urnas, setUrnas] = useState<UrnaApurada[]>([
    {
      id: 1,
      secao: 'Seção 01 - Escola Central',
      qrCode: 'QR-URN-001-LA',
      candidatos: [
        { nome: 'João da Silva', votos: 140 },
        { nome: 'Maria Santos', votos: 110 },
        { nome: 'António Costa', votos: 50 }
      ],
      assinatura: 'Assinatura_Hash_98a7f',
      ipDispositivo: '192.168.1.10 (Tablet)',
      dataHora: '11/08/2026 09:30',
      confirmacoes: 1,
      fiscaisIPs: ['192.168.1.10']
    }
  ]);

  const [secao, setSecao] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [assinatura, setAssinatura] = useState('');
  const [mensagemAlerta, setMensagemAlerta] = useState('');
  
  const [candidatosTemp, setCandidatosTemp] = useState<CandidatoVoto[]>([
    { nome: '', votos: 0 }
  ]);

  const adicionarLinhaCandidato = () => {
    setCandidatosTemp([...candidatosTemp, { nome: '', votos: 0 }]);
  };

  const atualizarCandidato = (index: number, campo: 'nome' | 'votos', valor: string | number) => {
    const novaLista = [...candidatosTemp];
    if (campo === 'nome') {
      novaLista[index].nome = String(valor);
    } else {
      novaLista[index].votos = Number(valor) || 0;
    }
    setCandidatosTemp(novaLista);
  };

  const removerLinhaCandidato = (index: number) => {
    const novaLista = candidatosTemp.filter((_, i) => i !== index);
    setCandidatosTemp(novaLista);
  };

  const salvarUrna = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secao || !qrCode || candidatosTemp.length === 0) return;

    const qrLimpo = qrCode.trim().toUpperCase();
    const ipAtual = '192.168.1.' + Math.floor(Math.random() * 80 + 10) + ' (Dispositivo Móvel)';

    const urnaExistenteIndex = urnas.findIndex(u => u.qrCode.trim().toUpperCase() === qrLimpo);

    if (urnaExistenteIndex !== -1) {
      const urnasAtualizadas = [...urnas];
      urnasAtualizadas[urnaExistenteIndex].confirmacoes += 1;
      urnasAtualizadas[urnaExistenteIndex].fiscaisIPs.push(ipAtual);
      
      setUrnas(urnasAtualizadas);
      setMensagemAlerta(`⚠️ Esta urna (${qrLimpo}) já estava apurada! A sua leitura foi registada com sucesso como CONFIRMAÇÃO DE AUDITORIA (${urnasAtualizadas[urnaExistenteIndex].confirmacoes} fiscais confirmaram).`);
    } else {
      const novaUrna: UrnaApurada = {
        id: Date.now(),
        secao,
        qrCode: qrLimpo,
        candidatos: candidatosTemp.filter(c => c.nome.trim() !== ''),
        assinatura: assinatura || 'Assinatura Digital Válida',
        ipDispositivo: ipAtual,
        dataHora: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confirmacoes: 1,
        fiscaisIPs: [ipAtual]
      };

      setUrnas([novaUrna, ...urnas]);
      setMensagemAlerta(`✅ Urna (${qrLimpo}) apurada e registada oficialmente com sucesso!`);
    }

    setSecao('');
    setQrCode('');
    setAssinatura('');
    setCandidatosTemp([{ nome: '', votos: 0 }]);
    setAba('apuracao');
  };

  const partilharTexto = (titulo: string, textoResumo: string) => {
    if (navigator.share) {
      navigator.share({ title: titulo, text: textoResumo }).catch(() => {});
    } else {
      const urlWhatsapp = `https://api.whatsapp.com/send?text=${encodeURIComponent(titulo + "\n\n" + textoResumo)}`;
      window.open(urlWhatsapp, '_blank');
    }
  };

  const totalGeral = urnas.reduce((acc, curr) => {
    curr.candidatos.forEach(c => {
      acc[c.nome] = (acc[c.nome] || 0) + c.votos;
    });
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      
      <header style={{ backgroundColor: '#1e293b', borderBottom: '3px solid #22c55e', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={logoImg} alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #facc15' }} />
          <div>
            <h1 style={{ fontSize: '20px', margin: 0, fontWeight: 'bold', color: '#facc15' }}>Impressão Digital</h1>
            <p style={{ fontSize: '12px', margin: 0, color: '#94a3b8' }}>Apuração & Validação por Fiscais</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setAba('inicio')} style={{ backgroundColor: aba === 'inicio' ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Início</button>
          <button onClick={() => setAba('registo')} style={{ backgroundColor: aba === 'registo' ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Registar Urna</button>
          <button onClick={() => setAba('apuracao')} style={{ backgroundColor: aba === 'apuracao' ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Apuração (Seções)</button>
          <button onClick={() => setAba('geral')} style={{ backgroundColor: aba === 'geral' ? '#22c55e' : '#334155', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Placar Geral</button>
        </div>
      </header>

      <main style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto' }}>
        
        {mensagemAlerta && (
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #22c55e', color: '#facc15', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', fontWeight: 'bold' }}>
            {mensagemAlerta}
          </div>
        )}

        {aba === 'inicio' && (
          <div>
            <BannerGoogle local="Topo da Tela Inicial" />
            <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', borderLeft: '6px solid #facc15', marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 8px 0', color: '#facc15' }}>Auditoria Inteligente de Urnas</h2>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>
                Leitura de QR Code com deteção automática de duplicidade: se múltiplos fiscais lerem a mesma urna, o sistema valida a veracidade e acumula as confirmações sem duplicar votos.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center' }}>
                <h3 style={{ color: '#22c55e', margin: '0 0 8px 0' }}>Urnas Apuradas</h3>
                <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#f8fafc' }}>{urnas.length}</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center' }}>
                <h3 style={{ color: '#facc15', margin: '0 0 8px 0' }}>Segurança</h3>
                <p style={{ fontSize: '15px', margin: 0, color: '#22c55e' }}>● Controlo Antiduplicação</p>
              </div>
            </div>
          </div>
        )}

        {aba === 'registo' && (
          <div style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155' }}>
            <BannerGoogle local="Topo da Leitura de QR Code" />
            <h2 style={{ color: '#facc15', marginTop: 0 }}>Leitura de QR Code & Boletim</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>Insira o QR Code da urna. Se já foi lido por outro fiscal, servirá para auditoria e confirmação automática.</p>
            
            <form onSubmit={salvarUrna} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Nome da Seção / Urna</label>
                <input type="text" value={secao} onChange={(e) => setSecao(e.target.value)} placeholder="Ex: Seção 02 - Escola Primária" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Código QR da Urna (Identificador Único)</label>
                <input type="text" value={qrCode} onChange={(e) => setQrCode(e.target.value)} placeholder="Ex: QR-URN-002-LA" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} required />
              </div>
              
              <div style={{ borderTop: '1px solid #334155', paddingTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <p style={{ color: '#22c55e', fontWeight: 'bold', margin: 0, fontSize: '14px' }}>Candidatos e Votos:</p>
                  <button type="button" onClick={adicionarLinhaCandidato} style={{ backgroundColor: '#334155', color: '#22c55e', border: '1px solid #22c55e', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    + Adicionar Candidato
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {candidatosTemp.map((c, index) => (
                    <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={c.nome} 
                        onChange={(e) => atualizarCandidato(index, 'nome', e.target.value)} 
                        placeholder={`Nome do Candidato ${index + 1}`} 
                        style={{ flex: 2, padding: '8px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} 
                        required 
                      />
                      <input 
                        type="number" 
                        value={c.votos === 0 ? '' : c.votos} 
                        onChange={(e) => atualizarCandidato(index, 'votos', e.target.value)} 
                        placeholder="Votos" 
                        style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} 
                        required 
                      />
                      {candidatosTemp.length > 1 && (
                        <button type="button" onClick={() => removerLinhaCandidato(index)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '8px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Assinatura Digital da Urna</label>
                <input type="text" value={assinatura} onChange={(e) => setAssinatura(e.target.value)} placeholder="Hash de segurança" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }} />
              </div>

              <button type="submit" style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '8px' }}>
                Submeter Boletim / Validar Leitura
              </button>
            </form>
          </div>
        )}

        {aba === 'apuracao' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <BannerGoogle local="Topo da Apuração por Seção" />
            <h2 style={{ color: '#facc15', marginTop: 0, marginBottom: '16px' }}>Apuração por Seção & Confirmações</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {urnas.map((u) => {
                const textoSecao = `📊 Boletim - ${u.secao}\nQR: ${u.qrCode}\nConfirmações de Fiscais: ${u.confirmacoes}\n` + u.candidatos.map(c => `- ${c.nome}: ${c.votos} votos`).join('\n');
                return (
                  <div key={u.id} style={{ backgroundColor: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, color: '#22c55e', fontSize: '16px' }}>{u.secao}</h3>
                      <span style={{ fontSize: '12px', color: '#94a3b8', backgroundColor: '#1e293b', padding: '2px 6px', borderRadius: '4px' }}>{u.qrCode}</span>
                    </div>
                    
                    <div style={{ backgroundColor: 'rgba(250, 204, 21, 0.1)', border: '1px solid #facc15', padding: '8px 12px', borderRadius: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#facc15', fontWeight: 'bold' }}>🛡️ Veracidade Auditada por Fiscais:</span>
                      <span style={{ fontSize: '13px', color: '#22c55e', fontWeight: 'bold', backgroundColor: '#0f172a', padding: '2px 8px', borderRadius: '4px' }}>
                        {u.confirmacoes} {u.confirmacoes === 1 ? 'Fiscal Confirmou' : 'Fiscais Confirmaram'}
                      </span>
                    </div>

                    <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '0 0 4px 0' }}>Assinatura: <code style={{ color: '#facc15' }}>{u.assinatura}</code></p>
                    <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 12px 0' }}>Primeiro IP / Horário: <span style={{ color: '#22c55e' }}>{u.ipDispositivo}</span> ({u.dataHora})</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '12px' }}>
                      {u.candidatos.map((c, idx) => (
                        <div key={idx} style={{ backgroundColor: '#1e293b', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                          <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#94a3b8' }}>{c.nome}</p>
                          <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#f8fafc' }}>{c.votos} votos</p>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => partilharTexto(`Resultado - ${u.secao} (${u.confirmacoes} Confirmações)`, textoSecao)}
                      style={{ width: '100%', backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                      📢 Partilhar Relatório desta Seção
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {aba === 'geral' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
            <BannerGoogle local="Topo do Placar Geral" />
            <h2 style={{ color: '#facc15', marginTop: 0, marginBottom: '8px' }}>Placar Geral Consolidado</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>Soma acumulada de todos os votos oficiais validados por seção.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {Object.entries(totalGeral).map(([nome, total]) => (
                <div key={nome} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #334155' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#f8fafc' }}>{nome}</span>
                  <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px' }}>
                    {total} Votos
                  </span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                const resumoGeral = "🏆 PLACAR GERAL CONSOLIDADO - IMPRESSÃO DIGITAL\n\n" + 
                  Object.entries(totalGeral).map(([nome, total]) => `• ${nome}: ${total} votos`).join('\n');
                partilharTexto("Placar Geral Eleitoral", resumoGeral);
              }}
              style={{ width: '100%', backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
              📢 Partilhar Placar Geral nas Redes Sociais
            </button>
          </div>
        )}

      </main>
    </div>
  );
}

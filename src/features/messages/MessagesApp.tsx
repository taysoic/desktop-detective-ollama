import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import './MessagesApp.css';

const MessagesApp: React.FC = () => {
  const { messages, markMessageAsRead, sendMessage } = useGame();
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(messages.length > 0 ? messages[0].id : null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const handleMessageClick = (id: string) => {
    markMessageAsRead(id);
    setSelectedMessageId(id);
  };

  const selectedMessage = messages.find(m => m.id === selectedMessageId);

  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim() || sending) return;
    
    setSending(true);
    
    try {
      await sendMessage(selectedMessage.sender, replyText);
      setReplyText('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="messages-app">
      <div className="messages-sidebar">
        <div className="messages-folders">
          <div className="folder active">Caixa de Entrada</div>
          <div className="folder">Enviados</div>
          <div className="folder">Rascunhos</div>
          <div className="folder">Lixeira</div>
        </div>
        <button className="new-message-btn">Nova Mensagem</button>
      </div>
      
      <div className="messages-list">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message-item ${!message.read ? 'unread' : ''} ${message.id === selectedMessageId ? 'selected' : ''}`}
            onClick={() => handleMessageClick(message.id)}
          >
            <div className="message-sender">{message.sender}</div>
            <div className="message-preview">
              {message.content.replace(/<[^>]*>/g, '').substring(0, 50)}
              {message.content.length > 50 ? '...' : ''}
            </div>
            <div className="message-time">
              {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        ))}
      </div>
      
      <div className="message-content">
        {selectedMessage && (
          <>
            <div className="message-header">
              <div>
                <div className="message-subject">Caso: Mansão Blackwood</div>
                <div className="message-from">De: {selectedMessage.sender}</div>
                <div className="message-date">
                  {new Date(selectedMessage.timestamp).toLocaleDateString()} 
                  {new Date(selectedMessage.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="message-body" 
                 dangerouslySetInnerHTML={{ __html: selectedMessage.content }} />
            
            {/* Removido o bloco de anexos que causava erro de TypeScript */}
            
            <div className="message-reply">
              <textarea 
                placeholder="Digite sua resposta..." 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                disabled={sending}
              />
              <button 
                onClick={handleSendReply}
                disabled={!replyText.trim() || sending}
              >
                {sending ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesApp;

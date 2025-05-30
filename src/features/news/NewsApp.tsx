import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import './NewsApp.css';

const NewsApp: React.FC = () => {
  const { newsArticles } = useGame();
  const [activeCategory, setActiveCategory] = useState('principais');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim() || searching) return;
    
    setSearching(true);
    
    try {
      const { searchInformation } = useGame();
      const results = await searchInformation(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Erro ao pesquisar:', error);
      setSearchResults('<p class="search-error">Erro de conexão. Tente novamente.</p>');
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="news-app">
      <div className="news-header">
        <div className="news-title">A Verdade</div>
        <div className="news-date">28 de Maio, 2025</div>
      </div>
      
      <div className="news-categories">
        <div 
          className={`category ${activeCategory === 'principais' ? 'active' : ''}`}
          onClick={() => setActiveCategory('principais')}
        >
          Principais
        </div>
        <div 
          className={`category ${activeCategory === 'policia' ? 'active' : ''}`}
          onClick={() => setActiveCategory('policia')}
        >
          Polícia
        </div>
        <div 
          className={`category ${activeCategory === 'cidade' ? 'active' : ''}`}
          onClick={() => setActiveCategory('cidade')}
        >
          Cidade
        </div>
        <div 
          className={`category ${activeCategory === 'eventos' ? 'active' : ''}`}
          onClick={() => setActiveCategory('eventos')}
        >
          Eventos
        </div>
        <div 
          className={`category ${activeCategory === 'buscar' ? 'active' : ''}`}
          onClick={() => setActiveCategory('buscar')}
        >
          Buscar
        </div>
      </div>
      
      <div className="news-content">
        {activeCategory === 'buscar' ? (
          <div className="search-section">
            <div className="search-box">
              <div className="search-logo">GooGle</div>
              <div className="search-input-container">
                <input 
                  type="text" 
                  placeholder="Digite sua pesquisa..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  onClick={handleSearch}
                  disabled={searching || !searchQuery.trim()}
                >
                  {searching ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
              <div className="search-tip">
                Dica: Pesquise nomes completos para melhores resultados
              </div>
            </div>
            
            {searchResults && (
              <div 
                className="search-results"
                dangerouslySetInnerHTML={{ __html: searchResults }}
              />
            )}
          </div>
        ) : (
          <>
            <div className="featured-news">
              {newsArticles.length > 0 && (
                <div className="featured-article">
                  <div className="article-image-placeholder">
                    📰
                  </div>
                  <h2>{newsArticles[0].title}</h2>
                  <div className="article-date">{newsArticles[0].date}</div>
                  <p>{newsArticles[0].content}</p>
                </div>
              )}
            </div>
            
            <div className="news-list">
              <h3>Outras Notícias</h3>
              {newsArticles.slice(1).map(article => (
                <div key={article.id} className="news-item">
                  <h4>{article.title}</h4>
                  <div className="article-date">{article.date}</div>
                  <p>{article.content.substring(0, 100)}...</p>
                  <div className="read-more">Leia mais</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="news-sidebar">
        <div className="weather-widget">
          <h3>Previsão do Tempo</h3>
          <div className="weather-info">
            <div className="weather-icon">☁️</div>
            <div className="weather-temp">18°C</div>
            <div className="weather-desc">Parcialmente nublado</div>
          </div>
        </div>
        
        <div className="popular-news">
          <h3>Mais Lidas</h3>
          <ul>
            <li>Falha elétrica afetou relógios no bairro</li>
            <li>Jardineiro desaparece após crime</li>
            <li>Vítima frequentava cassino clandestino</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsApp;

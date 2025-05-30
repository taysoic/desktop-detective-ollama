# Instruções para Configuração do Ollama

Para que o Desktop Detective funcione corretamente com o Ollama, siga estas instruções:

## Pré-requisitos

1. Instale o Ollama em sua máquina seguindo as instruções em [ollama.ai](https://ollama.ai)
2. Certifique-se de que o servidor Ollama esteja rodando na porta padrão (11434)

## Configuração do Modelo

1. Baixe o modelo llama3 usando o comando:
   ```
   ollama pull llama3
   ```

2. Verifique se o modelo está funcionando corretamente:
   ```
   ollama run llama3 "Olá, como vai?"
   ```

## Configuração do Acesso

Por padrão, o Ollama está configurado para aceitar conexões apenas de localhost (127.0.0.1).
Se você estiver executando o Desktop Detective em um ambiente diferente, pode ser necessário
configurar o Ollama para aceitar conexões de outros endereços IP.

## Solução de Problemas

Se encontrar problemas de conexão:

1. Verifique se o servidor Ollama está em execução
2. Confirme que o modelo llama3 foi baixado corretamente
3. Verifique se não há bloqueios de firewall impedindo a conexão

## Personalização

Se desejar usar um modelo diferente do llama3, edite a constante `DEFAULT_MODEL` 
no arquivo `src/lib/ai-service.ts` para o nome do modelo desejado.

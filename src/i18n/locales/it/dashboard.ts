export const dashboard = {
  title: 'Dashboard',
  notifications: {
    enable: 'Attiva notifiche',
    enabled: 'Notifiche attivate',
    description: 'Riceverai notifiche sui nuovi trend'
  },
  trends: {
    hashtags: 'Hashtag in Tendenza',
    keywords: 'Parole Chiave',
    topics: 'Argomenti in Tendenza',
    mentions: 'menzioni',
    lastDay: 'Ultime 24 ore',
    noData: 'Nessun dato disponibile',
    error: 'Errore nel caricamento dei dati'
  },
  addTrend: {
    hashtag: 'Aggiungi Hashtag',
    keyword: 'Aggiungi Parola Chiave',
    newHashtag: 'Nuovo Hashtag',
    newKeyword: 'Nuova Parola Chiave',
    hashtagPlaceholder: 'Inserisci un hashtag...',
    keywordPlaceholder: 'Inserisci una parola chiave...',
    hashtagAdded: 'Hashtag Aggiunto',
    hashtagAddedDesc: 'L\'hashtag {name} è stato aggiunto con successo',
    keywordAdded: 'Parola Chiave Aggiunta',
    keywordAddedDesc: 'La parola chiave {name} è stata aggiunta con successo'
  },
  social: {
    title: 'Gestione Account Social',
    description: 'Gestisci i tuoi account social collegati',
    selectPlatform: 'Seleziona piattaforma',
    accountName: 'Nome account',
    add: 'Aggiungi',
    noAccounts: 'Nessun account social collegato'
  },
  premium: {
    locked: "Funzionalità disponibile solo nel piano Pro",
    upgrade: "Passa a Pro"
  },
  predictions: {
    title: 'Analisi Predittiva Social',
    subtitle: 'Analisi del tuo profilo basata sui tuoi ultimi post e interazioni',
    growth: 'Trend in crescita',
    volume: 'Volume',
    sentiment: 'Sentiment',
    dataUpdated: 'Dati aggiornati alle',
    noData: 'Nessun dato social disponibile da analizzare. Collega i tuoi account social per vedere le previsioni.',
    analyzing: 'Analisi in corso dei tuoi ultimi:',
    dataPoints: {
      posts: 'Post pubblicati',
      interactions: 'Interazioni ricevute',
      hashtags: 'Hashtag utilizzati'
    },
    metrics: {
      followers: 'Previsione Crescita Follower',
      engagement: 'Previsione Engagement',
      popularity: 'Trend Hashtag'
    },
    descriptions: {
      followers: 'Analisi della crescita prevista dei follower nelle prossime 72 ore, basata sui tuoi ultimi post e pattern di crescita',
      engagement: 'Previsione delle interazioni (like, commenti, condivisioni) sui tuoi prossimi post',
      popularity: 'Analisi della potenziale visibilità dei tuoi hashtag più utilizzati'
    },
    error: {
      rateLimit: 'Troppe richieste, riprova tra qualche minuto',
      generic: 'Errore nel recupero delle previsioni',
      noSocial: 'Collega almeno un account social per vedere le previsioni'
    }
  },
  content: {
    title: 'Generatore di Contenuti',
    subtitle: 'Suggerimenti per contenuti virali',
    input: {
      label: 'Il tuo contenuto',
      placeholder: 'Inserisci il tuo contenuto qui...'
    },
    button: {
      generate: 'Genera Varianti',
      generating: 'Generazione in corso...'
    },
    variants: {
      title: 'Varianti Generate:',
      error: 'Inserisci un contenuto per generare le varianti',
      success: 'Nuove varianti di contenuto sono state create',
      added: 'Varianti Generate'
    }
  },
  apiKey: {
    title: 'Chiave API',
    description: 'Usa questa chiave per accedere alla nostra API programmaticamente',
    upgradeDesc: 'Passa a Pro per ottenere accesso alle API',
    copied: 'Chiave API Copiata',
    copiedDesc: 'La chiave API è stata copiata negli appunti',
    createdAt: 'Creata il'
  },
  login: {
    required: 'Accedi per utilizzare questa funzionalità'
  }
};

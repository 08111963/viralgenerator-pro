export default {
  translation: {
    navigation: {
      home: 'Home',
      dashboard: 'Dashboard',
      pricing: 'Prezzi',
      admin: 'Admin',
      login: 'Accedi',
      register: 'Inizia Ora',
    },
    home: {
      hero: {
        title: 'Domina i Trend Social con l\'Intelligenza Artificiale',
        subtitle: 'Analizza, predici e crea contenuti virali con la potenza dell\'AI',
      },
      features: {
        title: 'Funzionalità Principali',
        realtime: {
          title: 'Monitoraggio Real-time',
          description: 'Monitora hashtag e trend in tempo reale su tutti i social media principali',
        },
        predictive: {
          title: 'Analisi Predittiva',
          description: 'Anticipa i trend futuri con la nostra AI avanzata',
        },
        viral: {
          title: 'Contenuti Virali',
          description: 'Genera contenuti ottimizzati per massimizzare l\'engagement',
        },
        reports: {
          title: 'Report Personalizzati',
          description: 'Ottieni insights dettagliati sul tuo pubblico target',
        },
      },
      cta: {
        start: 'Inizia Gratuitamente',
        demo: 'Richiedi una Demo',
      },
    },
    pricing: {
      title: 'Prezzi semplici e trasparenti',
      subtitle: 'Prova il piano Base gratuitamente per 7 giorni. Nessuna carta di credito richiesta.',
      tiers: {
        base: {
          name: 'Base',
          description: 'Inizia con 7 giorni di prova gratuita',
        },
        pro: {
          name: 'Pro',
          description: 'Ideale per professionisti e team in crescita',
        },
      },
      features: {
        base: [
          'Analisi di base dei trend',
          'Monitoraggio hashtag',
          'Report settimanali',
          '1 account social',
          'Supporto email',
        ],
        pro: [
          'Tutte le funzionalità Base',
          'Analisi predittiva avanzata',
          'Generazione contenuti AI',
          '5 account social',
          'Supporto prioritario',
          'API access',
        ],
      },
      cta: {
        free: 'Prova Gratuita',
        start: 'Inizia Ora',
      },
    },
    features: {
      title: 'Funzionalità',
      realtime: {
        title: 'Analisi in Tempo Reale',
        description: 'Monitora i trend social media in tempo reale con aggiornamenti istantanei'
      },
      customDashboard: {
        title: 'Dashboard Personalizzabile',
        description: 'Crea dashboard personalizzate per monitorare le metriche più importanti per te'
      },
      reports: {
        title: 'Report Automatizzati',
        description: 'Genera report dettagliati automaticamente con i dati più rilevanti'
      },
      ai: {
        title: 'Intelligenza Artificiale',
        description: 'Utilizza l\'AI per prevedere trend e ottimizzare i contenuti'
      }
    },
    login: {
      title: "Accedi",
      description: "Inserisci le tue credenziali per accedere",
      emailLabel: "Email",
      emailPlaceholder: "nome@esempio.com",
      passwordLabel: "Password",
      submitButton: "Accedi",
      loading: "Accesso in corso...",
      success: "Bentornato",
      error: "Credenziali non valide"
    },
    register: {
      title: "Registrati",
      description: "Crea il tuo account TrendAI",
      nameLabel: "Nome",
      namePlaceholder: "Il tuo nome",
      emailLabel: "Email",
      emailPlaceholder: "nome@esempio.com",
      passwordLabel: "Password",
      submitButton: "Registrati",
      loading: "Registrazione in corso...",
      success: "Registrazione completata",
      error: "Impossibile completare la registrazione"
    },
    auth: {
      welcome: "Bentornato",
      checkEmail: "Controlla la tua email per confermare l'account"
    },
    dashboard: {
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
        lastDay: 'Ultime 24 ore'
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
      analytics: {
        title: 'Trend Analysis',
        subtitle: 'Real-time monitoring of social media trends',
        lastUpdate: 'Last update',
        metrics: {
          engagement: 'Engagement nel Tempo',
          volume: 'Volume per Argomento'
        }
      },
      predictions: {
        title: 'AI Predictions',
        subtitle: 'Predicted trends in the next 72 hours',
        growth: 'Trend in crescita',
        volume: 'Volume',
        sentiment: 'Sentiment'
      },
      content: {
        title: 'Content Generator',
        subtitle: 'Suggestions for viral content',
        input: {
          label: 'Your content',
          placeholder: 'Enter your content here...'
        },
        button: {
          generate: 'Generate Variants',
          generating: 'Generating...'
        },
        variants: {
          title: 'Varianti Generate:',
          error: 'Inserisci un contenuto per generare le varianti',
          success: 'Nuove varianti di contenuto sono state create',
          added: 'Varianti Generate'
        }
      }
    }
  }
};

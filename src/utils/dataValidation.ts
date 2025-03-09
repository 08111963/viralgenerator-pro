
export interface ValidationResult {
  isValid: boolean;
  confidence: number;
  issues: string[];
}

export const validateTrendData = (
  volume: number,
  change: number,
  historicalData?: { volume: number; timestamp: string }[]
): ValidationResult => {
  const issues: string[] = [];
  let confidenceScore = 100;

  // Volume validation
  if (volume < 0) {
    issues.push("Volume non può essere negativo");
    confidenceScore -= 30;
  }
  if (volume === 0) {
    issues.push("Volume mancante");
    confidenceScore -= 20;
  }

  // Change validation
  if (Math.abs(change) > 100) {
    issues.push("Cambiamento percentuale sospetto (>100%)");
    confidenceScore -= 15;
  }

  // Historical data validation
  if (!historicalData || historicalData.length < 7) {
    issues.push("Dati storici insufficienti");
    confidenceScore -= 25;
  }

  // Sudden spikes validation
  if (historicalData && historicalData.length > 0) {
    const avgVolume = historicalData.reduce((sum, data) => sum + data.volume, 0) / historicalData.length;
    if (volume > avgVolume * 3) {
      issues.push("Picco di volume anomalo");
      confidenceScore -= 10;
    }
  }

  return {
    isValid: confidenceScore > 50,
    confidence: Math.max(0, confidenceScore),
    issues
  };
};

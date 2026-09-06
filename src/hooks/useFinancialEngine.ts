import { useMemo } from 'react';
import { computeFinancials } from '../utils/financialCalculations';
import { mockFinancialInputs } from '../data/mockFinancial';
import type { FinancialInputs, FinancialOutputs } from '../types';

/**
 * Hook that computes all financial outputs reactively from inputs.
 * When a real backend exists, this would fetch computed data instead.
 */
export function useFinancialEngine(
  inputs: FinancialInputs = mockFinancialInputs
): FinancialOutputs {
  const outputs = useMemo(() => computeFinancials(inputs), [inputs]);
  return outputs;
}

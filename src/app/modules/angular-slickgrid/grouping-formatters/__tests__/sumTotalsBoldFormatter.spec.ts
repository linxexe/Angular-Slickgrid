import { Column, GridOption } from '../../models';
import { sumTotalsBoldFormatter } from '../sumTotalsBoldFormatter';

describe('sumTotalsBoldFormatter', () => {
  // stub some methods of the SlickGrid Grid instance
  const gridStub = {
    getOptions: jest.fn()
  };

  it('should display an empty string when no value is provided', () => {
    const output = sumTotalsBoldFormatter({}, {} as Column);
    expect(output).toBe('');
  });

  it('should display an empty string when the "sum" does not find the field property in its object', () => {
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { sum: { column1: 123, column2: 345 } };
    const output = sumTotalsBoldFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the sum property is null', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { sum: { column1: null } };
    const output = sumTotalsBoldFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display an empty string when the average input is not a number', () => {
    const columnDef = { id: 'column1', field: 'column1' } as Column;
    const totals = { sum: { column1: 'abc' } };
    const output = sumTotalsBoldFormatter(totals, columnDef, {});
    expect(output).toBe('');
  });

  it('should display a negative sum when its input is negative', () => {
    const totals = { sum: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = sumTotalsBoldFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2 } } as Column, {});

    expect(output1).toBe('<b>-123</b>');
    expect(output2).toBe('<b>-34.57</b>');
  });

  it('should display a negative sum and thousand separator when its input is negative', () => {
    const totals = { sum: { column1: -12345678, column2: -345678.5678, column3: -2.4 } };

    const output1 = sumTotalsBoldFormatter(totals, { id: 'column1', field: 'column1', params: { thousandSeparator: ',' } } as Column, {});
    const output2 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, thousandSeparator: ',' } } as Column, {});
    const output3 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});

    expect(output1).toBe('<b>-12,345,678</b>');
    expect(output2).toBe('<b>-345,678.57</b>');
    expect(output3).toBe('<b>-345_678,57</b>');
  });

  it('should display a negative sum with parentheses instead of the negative sign when its input is negative', () => {
    const totals = { sum: { column1: -123, column2: -34.5678, column3: -2.4 } };

    const output1 = sumTotalsBoldFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    const output2 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('<b>(123)</b>');
    expect(output2).toBe('<b>(34.57)</b>');
  });

  it('should display a negative sum with thousand separator and parentheses instead of the negative sign when its input is negative', () => {
    const totals = { sum: { column1: -12345678, column2: -345678.5678, column3: -2.4 } };

    const output1 = sumTotalsBoldFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    const output2 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true, thousandSeparator: ',' } } as Column, {});
    const output3 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true, decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});

    expect(output1).toBe('<b>(12,345,678)</b>');
    expect(output2).toBe('<b>(345,678.57)</b>');
    expect(output3).toBe('<b>(345_678,57)</b>');
  });

  it('should display a negative sum with parentheses when input is negative and "displayNegativeNumberWithParentheses" is enabled in the Formatter Options', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { displayNegativeNumberWithParentheses: true } } as GridOption);
    const columnDef = { id: 'column3', field: 'column3' } as Column;
    const totals = { sum: { column1: 123, column2: 345, column3: -2.4 } };
    const output = sumTotalsBoldFormatter(totals, columnDef, gridStub);
    expect(output).toBe('<b>(2.4)</b>');
  });

  it('should display a positive sum number even when displayNegativeNumberWithParentheses is enabled', () => {
    const totals = { sum: { column1: 123, column2: 34.5678, column3: 2.4 } };

    const output1 = sumTotalsBoldFormatter(totals, { id: 'column1', field: 'column1', params: { displayNegativeNumberWithParentheses: true } } as Column, {});
    const output2 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2', params: { maxDecimal: 2, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('<b>123</b>');
    expect(output2).toBe('<b>34.57</b>');
  });

  it('should display the same sum value when a number with decimals is provided', () => {
    const totals = { sum: { column1: 123.55678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsBoldFormatter(totals, { id: 'column1', field: 'column1' } as Column, {});
    const output2 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2' } as Column, {});

    expect(output1).toBe('<b>123.55678</b>');
    expect(output2).toBe('<b>345.2</b>');
  });

  it('should display an sum number with user defined minimum & maximum decimal count in his grid option', () => {
    gridStub.getOptions.mockReturnValue({ formatterOptions: { minDecimal: 0, maxDecimal: 3, displayNegativeNumberWithParentheses: true } } as GridOption);
    const totals = { sum: { column1: 123.45678, column2: 345, column3: -2.45 } };

    const output1 = sumTotalsBoldFormatter(totals, { id: 'column1', field: 'column1' } as Column, gridStub);
    const output2 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2' } as Column, gridStub);
    const output3 = sumTotalsBoldFormatter(totals, { id: 'column3', field: 'column3' } as Column, gridStub);

    expect(output1).toBe('<b>123.457</b>');
    expect(output2).toBe('<b>345</b>');
    expect(output3).toBe('<b>(2.45)</b>');
  });

  it('should display a sum number with user defined minimum & maximum decimal count', () => {
    const totals = { sum: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsBoldFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2 } } as Column, {});
    const output2 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0 } } as Column, {});
    const output3 = sumTotalsBoldFormatter(totals, { id: 'column3', field: 'column3', params: { minDecimal: 3, displayNegativeNumberWithParentheses: true } } as Column, {});

    expect(output1).toBe('<b>123.46</b>');
    expect(output2).toBe('<b>345.2</b>');
    expect(output3).toBe('<b>(2.450)</b>');
  });

  it('should display a sum number a prefix and suffix', () => {
    const totals = { sum: { column1: 123.45678, column2: 345.2, column3: -2.45 } };

    const output1 = sumTotalsBoldFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2, groupFormatterPrefix: 'Sum: ' } } as Column, {});
    const output2 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0, groupFormatterSuffix: ' (sum)' } } as Column, {});
    const output3 = sumTotalsBoldFormatter(
      totals, {
        id: 'column3',
        field: 'column3',
        params: { minDecimal: 3, displayNegativeNumberWithParentheses: true, groupFormatterPrefix: 'Sum: ', groupFormatterSuffix: '/item' }
      } as Column
    );

    expect(output1).toBe('<b>Sum: 123.46</b>');
    expect(output2).toBe('<b>345.2 (sum)</b>');
    expect(output3).toBe('<b>Sum: (2.450)/item</b>');
  });

  it('should display a sum number with prefix, suffix and thousand separator', () => {
    const totals = { sum: { column1: 12345678.45678, column2: 345678.2, column3: -345678.45 } };

    const output1 = sumTotalsBoldFormatter(totals, { id: 'column1', field: 'column1', params: { maxDecimal: 2, groupFormatterPrefix: 'Sum: ', decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});
    const output2 = sumTotalsBoldFormatter(totals, { id: 'column2', field: 'column2', params: { minDecimal: 0, groupFormatterSuffix: ' (sum)', decimalSeparator: ',', thousandSeparator: '_' } } as Column, {});
    const output3 = sumTotalsBoldFormatter(
      totals, {
        id: 'column3', field: 'column3',
        params: { minDecimal: 3, displayNegativeNumberWithParentheses: true, groupFormatterPrefix: 'Sum: ', groupFormatterSuffix: '/item', decimalSeparator: ',', thousandSeparator: '_' }
      } as Column);

    expect(output1).toBe('<b>Sum: 12_345_678,46</b>');
    expect(output2).toBe('<b>345_678,2 (sum)</b>');
    expect(output3).toBe('<b>Sum: (345_678,450)/item</b>');
  });
});

import Papa from 'papaparse';
import type { Product } from '../types/Product';

interface CSVRow {
  id: string;
  name: string;
  priceWithTax: string;
  imageUrl: string;
}

export const loadProductsFromCSV = async (csvPath: string): Promise<Product[]> => {
  try {
    const response = await fetch(csvPath);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse<CSVRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(`CSV parsing error: ${results.errors[0].message}`));
            return;
          }

          const products: Product[] = results.data.map((row, id) => ({
            id: id.toString(),
            name: row.name,
            priceWithTax: parseInt(row.priceWithTax, 10),
            imageUrl: row.imageUrl,
          }));

          resolve(products);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    throw new Error(`Failed to load CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
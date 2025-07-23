// Express
import { Request, Response, NextFunction } from 'express';

// Helpers
import { ResponseHelper } from '../helpers/responseHelper';
import { convertToTwoCharCode, removeSymbolRegex } from '../helpers/dataDebugging';
import { connectMongo } from '../config/database';

export class InfoController {
  static async createLead(req: Request, res: Response, next: NextFunction) {
    try {
      const info = req.body;
      console.log('Received data:', JSON.stringify(info, null, 2));

      // Extraer información de data_collection_results
      const dataCollection = info.data.analysis?.data_collection_results;

      if (!dataCollection) {
        console.log("No data collection")
        return ResponseHelper.error(res, 'No data_collection_results found in request', 400);
      }

      // Extraer nombre y teléfono
      const customerName = dataCollection.customer_name?.value || "";
      const customerLastname = dataCollection.customer_last_name?.value || "";
      const customerPhone = dataCollection.customer_phone?.value || "";
      const customerEmail = dataCollection.customer_email?.value || "";
      const customerCountry = dataCollection.customer_country?.value || "";
      const customerCity = dataCollection.customer_city?.value || "";
      const customerAddress = dataCollection.customer_address?.value || "";
      const customerZip = dataCollection.customer_zip?.value || "";
      const customerZip4 = dataCollection.customer_zip4?.value || "";
      const customerState = dataCollection.customer_state?.value || "";
      const customerSkinCondition = dataCollection.skin_condition?.value || "";


      // Preparar datos para guardar y enviar
      const leadData = {
        name: customerName,
        last_name: customerLastname,
        media: "WEB",
        // phone_number: "",
        phone_number: removeSymbolRegex("-", customerPhone),
        entervia: "9548092011",
        email: customerEmail,
        city: customerCity,
        address: customerAddress,
        state: convertToTwoCharCode(customerState),
        zip: customerZip,
        zip4: customerZip4,
        country: convertToTwoCharCode(customerCountry),
        comment: customerSkinCondition,
      };

      // Guardar en MongoDB antes de enviar a la API externa
      try {
        const db = await connectMongo();
        await db.collection('leads').insertOne(leadData);
        console.log('Lead saved to MongoDB');
      } catch (mongoErr) {
        console.error('Error saving lead to MongoDB:', mongoErr);
        // Puedes decidir si continuar o retornar error aquí
      }

      console.log('Sending lead data:', JSON.stringify(leadData, null, 2));

      //todo: verificar que esten los datos requeridos, sino no enviar
      // Enviar datos a la API externa
      const response = await fetch(`${process.env.TSC_API_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TSC_API_TOKEN}`
        },
        body: JSON.stringify(leadData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('TSC API Error:', response.status, errorText);
        return ResponseHelper.error(res, `Failed to send lead to TSC API: ${response.status}`, 500);
      }

      const tscResponse = await response.json();
      console.log('TSC API Response:', tscResponse);

      return res.status(200);

    } catch (error) {
      console.error('Error processing lead:', error);
      next(error);
    }
  }

  static async getLeads(req: Request, res: Response, next: NextFunction) {
    try {
      const db = await connectMongo();
      const leads = await db.collection('leads').find({}).toArray();
      return res.status(200).json(leads);
    } catch (error) {
      console.error('Error fetching leads:', error);
      return ResponseHelper.error(res, 'Error fetching leads from database', 500);
    }
  }
}
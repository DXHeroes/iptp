import { Injectable } from '@nestjs/common';
import axios from "axios"
import * as qs from 'querystring';
import * as https from 'https'
import * as fs from 'fs'

@Injectable()
export class BankService {
  private readonly idpApiUrl = "https://webapi.developers.erstegroup.com/api/csas/sandbox/v1/sandbox-idp"
  private readonly accountsApiUrl = "https://webapi.developers.erstegroup.com/api/csas/sandbox/v3/account-information"
  private readonly paymentsApiUrl = "https://webapi.developers.erstegroup.com/api/csas/sandbox/v3/payment-initiation"
  
  private readonly webApiKey = "c25e12c4-c23c-4865-ba28-3e471958e62d"
  private readonly refreshToken = "ewogICJ0eXBlIjogInJlZnJlc2giLAogICJuYW1lIjogIjgwMDAtMDEtMDEtMDAuMDAuMDAuMDAwMDAxIiwKICAic2Vzc2lvblVVSUQiOiAiNmJlNzE0ODctYzg2YS00NDg1LTgwMjgtMGY5MGNhNzZlNTg0IiwKICAic2NvcGVzIjogWwogICAgIkFJU1AiLAogICAgIlBJU1AiCiAgXSwKICAiY29uc2VudCI6IFsKICAgIHsKICAgICAgImlkIjogIjAwMDAwIiwKICAgICAgImNvbnRlbnQiOiAiZnVsbCIKICAgIH0KICBdLAogICJsaW1pdHMiOiB7CiAgICAiYWNjZXNzU2Vjb25kcyI6IDMwMCwKICAgICJyZWZyZXNoU2Vjb25kcyI6IDc3NzYwMDAKICB9LAogICJhY2Nlc3NUeXBlIjogIm9mZmxpbmUiLAogICJleHBpcmF0aW9uIjogIjIwMjEtMDEtMjlUMTI6MDc6MzIuNzg5WiIKfQ"
  private readonly clientId = "515550b1-71b7-498e-b05b-94dca5ff06c4"
  private readonly clientSecret = "9523e3d2-f62a-4d05-b491-4f2547ab1939"

  private readonly privateCertPath = "private.key"
  private readonly publicCertPath = "public.pem"

  private readonly httpsAgent: https.Agent

  constructor() {
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false, // (NOTE: this will disable client verification)
      cert: fs.readFileSync("./public.pem"),
    //   // key: fs.readFileSync("./public.pem"),
      key: fs.readFileSync("./private.key"),
    })
  }

  
  async getAccessToken(): Promise<{ access_token: string }> {
    return (await axios.post(this.idpApiUrl + "/token", qs.stringify({ grant_type: "refresh_token", refresh_token: this.refreshToken, client_id: this.clientId, client_secret: this.clientSecret }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })).data;
  }

  async listAccounts(): Promise<{ id: string, currency: string, servicer: { bankCode: string, countryCode: string, bic: string}, name: string, product: string }[]> {
    const token = (await this.getAccessToken()).access_token
    const data = (await axios.get(this.accountsApiUrl + "/my/accounts", { headers: { "web-api-key": this.webApiKey, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, httpsAgent: this.httpsAgent })).data

    return data.accounts.map(d => {
      return {
        id: d.id,
        currency: d.currency,
        servicer: {
          bankCode: d.bankCode,
          countryCode: d.countryCode,
          bic: d.bic
        },
        name: d.nameI18N,
        product: d.productI18N, 
      }
    })
  }

  async listTransactionsByAccountId(accId: string): Promise<{ id: string, amount: { value: string, currency: string}, data: string, debtorName: string, creditorName: string }[]> {
    const token = (await this.getAccessToken()).access_token
    const { data } = await axios.get(this.accountsApiUrl + `/my/accounts/${accId}/transactions`, { headers: { "web-api-key": this.webApiKey, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, httpsAgent: this.httpsAgent })
    
    return data.transactions.map(t => {
      return {
        id: t.entryReference,
        amount: {
          value: t.amount.value,
          currency: t.amount.currency
        },
        date: t.valueDate.date,
        debtorName: t.entryDetails.transactionDetails.relatedParties.name,
        creditorName: t.entryDetails.transactionDetails.relatedParties.name,
      }
    });
  }



}
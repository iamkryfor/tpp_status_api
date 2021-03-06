import FormData from 'form-data';
import TransportScraper, { TransportType } from '../TransportScraper';
import Zone from '../Zone'

export class Barreiro extends Zone {
    constructor() {
        super('Barreiro', { 
            [TransportType.BUS]: 'http://www.tcbarreiro.pt/realtime',
            [TransportType.FERRY]: 'http://www.transtejo.pt/wp-admin/admin-ajax.php'
        })
    }

    public async getTwitterInfo(type: TransportType): Promise<string | boolean> { return false }

    protected async getSubwayStatus(): Promise<any> {}

    protected async getFerryStatus(): Promise<any> {
        try {
            const res = await TransportScraper.getTranstejoStatus(this)
            return res
        } catch (err) {
            return Promise.reject(err)
        }
    }

    protected async getBusStatus(): Promise<any> {
        try {
            const form: FormData = new FormData()
            form.append('getVehicles', 'true')

            const body: string = await this.getInformation(TransportType.BUS, { method: 'POST', body: form })
            const res = JSON.parse(body)
            
            return res
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
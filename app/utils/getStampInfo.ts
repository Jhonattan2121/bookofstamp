import axios from "axios";

export interface StampInfoResponse {
    data: {
        dispensers: Dispenser[];
        dispenses: Dispense[];
        holders: Holder[];
        sends: Send[];
        stamp: StampInfo;
        total: number;
        last_block: number;
    };
    status: string;
    message: string;
}

interface Holder {
    address: string;
    quantity: number;
}

export interface Dispenser {
    block_index: number;
    btcrate: number;
    source: string;
    cpid: string;
    give_quantity: number;
    escrow_quantity: number;
    satoshirate: number;
    give_remaining: number;
    tx_hash: string;
}

export interface Dispense {
    block_index: number;
    cpid: string;
    destination: string;
    dispense_quantity: number;
    dispenser_tx_hash: string;
    source: string;
    tx_hash: string;
}

export interface Send {
    tx_hash: string;
    block_index: number;
    source: string;
    destination: string;
    quantity: number;
}


export interface StampInfo {
    block_index: number;
    block_time: string;
    cpid: string;
    creator: string;
    creator_name: string | null;
    divisible: number;
    file_hash: string;
    ident: string;
    is_btc_stamp: number;
    keyburn: string | null;
    locked: number;
    stamp: number;
    stamp_base64: string;
    stamp_hash: string;
    stamp_mimetype: string;
    stamp_url: string;
    supply: number;
    tx_hash: string;
}

const getStampData = async (stampId: string): Promise<StampInfoResponse> => {
    try {
        const stampInfo = await axios.get(`https://stampchain.io/api/v2/stamps/${stampId}`);
        const stampData = stampInfo.data;
        if (stampData) {
            return stampData;
        } else {
            console.error('Stamp ID not found in response data:', stampInfo);
            throw new Error('Stamp ID not found');
        }
    } catch (error) {
        console.error('Error fetching stamp info:', error);
        throw error;
    }
}

export default getStampData;


import axios from "axios";

export interface StampInfoResponse {
    data: {
        stamp: StampInfo;
        holders: Holder[];
    };
}

interface Holder {
    address: string;
    quantity: number;
}


interface StampCardProps {
    stampId: string;
}
export interface StampInfo {
    block_index: number;
    cpid: string;
    creator: string;
    divisible: number;
    ident: string;
    keyburn: null | string;
    locked: number;
    stamp: number;
    stamp_url: string;
    supply: number;
    tx_hash: string;
}

const getStampInfo = async (stampId: string): Promise<StampInfoResponse | null> => {
    try {
        const stampInfo = await axios.get(`https://stampchain.io/api/v2/stamps/${stampId}`);
        const stampData = stampInfo.data;
        if (stampData) {
            return stampData;
        } else {
            console.error('Stamp ID not found in response data:', stampInfo);
            return null;
        }
    } catch (error) {
        console.error('Error fetching stamp info:', error);
        return null;
    }
}

export default getStampInfo;


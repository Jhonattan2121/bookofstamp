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

export interface Holder {
    address: string;
    quantity: number;
}

export interface StampInfoResponse {
    data: {
        stamp: StampInfo;
        holders: Holder[];
    };
}

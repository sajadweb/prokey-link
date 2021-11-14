/**
 * Prokey Interface
 */

export enum EnumInputScriptType {
    SPENDADDRESS = 0,
    SPENDMULTISIG = 1,
    EXTERNAL = 2,
    SPENDWITNESS = 3,
    SPENDP2SHWITNESS = 4,
}
export type HDPubNode = {
    depth: number;
    fingerprint: number;
    child_num: number;
    chain_code: string;
    public_key: string;
};
export type MultisigRedeemScriptType = {
    pubkeys: Array<{
        node: string | HDPubNode;
        address_n: Array<number>;
    }>;
    signatures: Array<string>;
    m?: number;
};
export type TransactionInput = {
    address_n: Array<number>;
    prev_hash: string;
    prev_index: number;
    script_type?: EnumInputScriptType;
    sequence?: number;
    amount?: string;
    multisig?: MultisigRedeemScriptType;
};

export declare type RefTransactionInput = {
    prev_hash: string;
    prev_index: number;
    script_sig: string;
    sequence: number;
};
export type TransactionBinOutput = {
    amount: string;
    script_pubkey: string;
};
export declare type RefTransaction = {
    hash: string;
    version?: number;
    inputs: Array<RefTransactionInput>;
    bin_outputs: Array<TransactionBinOutput>;
    lock_time?: number;
    extra_data?: string;
    timestamp?: number;
    version_group_id?: number;
};
export type TransactionOptions = {
    lock_time?: number;
    timestamp?: number;
    version?: number;
    expiry?: number;
    overwintered?: boolean;
    version_group_id?: number;
    branch_id?: number;
};
export enum EnumOutputScriptType {
    PAYTOADDRESS = 0,
    PAYTOSCRIPTHASH = 1,
    PAYTOMULTISIG = 2,
    PAYTOOPRETURN = 3,
    PAYTOWITNESS = 4,
    PAYTOP2SHWITNESS = 5
}
export type TransactionOutput = {
    address: string;
    script_type: EnumOutputScriptType.PAYTOADDRESS;
    amount: string;
    multisig?: MultisigRedeemScriptType;
} | {
    address_n: Array<number>;
    script_type: EnumOutputScriptType.PAYTOADDRESS | EnumOutputScriptType.PAYTOWITNESS | EnumOutputScriptType.PAYTOP2SHWITNESS | EnumOutputScriptType.PAYTOMULTISIG;
    amount: string;
    multisig?: MultisigRedeemScriptType;
} | {
    amount: '0';
    op_return_data: Array<number>;
    script_type: EnumOutputScriptType.PAYTOOPRETURN;
};

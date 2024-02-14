import type { TelepresenceAdapter, OnlineAgent, PerspectiveExpression, DID, TelepresenceSignalCallback, HolochainLanguageDelegate, LanguageContext } from "https://esm.sh/@perspect3vism/ad4m@0.5.0";;
import axiod from "https://deno.land/x/axiod/mod.ts";
import type { Socket, ServerToClientEvents, ClientToServerEvents } from "https://esm.sh/socket.io-client@4.7.2";

export class TelepresenceAdapterImplementation implements TelepresenceAdapter {
    me: DID
    uuid: string;
    hcDna: HolochainLanguageDelegate;
    signalCallbacks: TelepresenceSignalCallback[] = [];

    constructor(context: LanguageContext, uuid: string) {
        this.hcDna = context.Holochain as HolochainLanguageDelegate;
        this.me = context.agent.did;
        this.uuid = uuid;
    }

    async setOnlineStatus(status: PerspectiveExpression): Promise<void> {}

    async getOnlineAgents(): Promise<OnlineAgent[]> {
        return [];
    }

    async sendSignal(remoteAgentDid: string, payload: PerspectiveExpression): Promise<object> {
        return {};
    }

    async sendBroadcast(payload: PerspectiveExpression): Promise<object> {
        return {};
    }

    async registerSignalCallback(callback: TelepresenceSignalCallback): Promise<void> {}
}
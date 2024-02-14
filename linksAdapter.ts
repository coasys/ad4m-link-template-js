import { LinkSyncAdapter, PerspectiveDiffObserver, HolochainLanguageDelegate, LanguageContext, PerspectiveDiff, 
  LinkExpression, DID, Perspective, PerspectiveState } from "https://esm.sh/@perspect3vism/ad4m@0.5.0";
import type { SyncStateChangeObserver } from "https://esm.sh/@perspect3vism/ad4m@0.5.0";
import { Mutex, withTimeout } from "https://esm.sh/async-mutex@0.4.0";
import type { Socket, ServerToClientEvents, ClientToServerEvents } from "https://esm.sh/socket.io-client@4.7.2";

export class LinkAdapter implements LinkSyncAdapter {
  linkCallback?: PerspectiveDiffObserver
  syncStateChangeCallback?: SyncStateChangeObserver
  generalMutex: Mutex = withTimeout(new Mutex(), 10000, new Error('PerspectiveDiffSync: generalMutex timeout'));
  me: DID
  myCurrentTime: any | null = null;
  languageUid: String | null = null;
  hasCalledSync = false;

  constructor(context: LanguageContext, uid: String) {
    this.me = context.agent.did;
    this.languageUid = uid;
  }

  //Tell the server that we have updated our current timestamp so that the server can keep in sync with what we have seen
  updateServerSyncState() {}

  writable(): boolean {
    return true;
  }

  public(): boolean {
    return false;
  }

  async others(): Promise<DID[]> {
    return [];
  }

  async currentRevision(): Promise<string> {
    return "";
  }

  //Call sync on the server, which will should fetch all the links we missed since last start of the link language
  async sync(): Promise<PerspectiveDiff> {
    return new PerspectiveDiff()
  }

  //Fetch all the links from the server
  async render(): Promise<Perspective> {
  }

  async commit(diff: PerspectiveDiff): Promise<string> {
    return "";
  }

  addCallback(callback: PerspectiveDiffObserver): number {
    this.linkCallback = callback;
    return 1;
  }

  addSyncStateChangeCallback(callback: SyncStateChangeObserver): number {
    this.syncStateChangeCallback = callback;
    return 1;
  }

  async handleSignal(signal: any): Promise<void> {
    //This signal only contains link data and no reference, and therefore came from us in a pull in fast_forward_signal
    if (this.linkCallback) {
      //console.log("PerspectiveDiffSync.handleHolochainSignal: calling linkCallback", signal);
      await this.linkCallback(signal);
    }
  }
}

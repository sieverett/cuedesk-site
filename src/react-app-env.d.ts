/// <reference types="react-scripts" />

declare module "@nangohq/frontend" {
  interface NangoOptions {
    connectSessionToken: string;
  }
  interface ConnectUIOptions {
    onEvent?: (event: { type: string; connectionId?: string; payload?: any }) => void;
  }
  class Nango {
    constructor(options: NangoOptions);
    openConnectUI(options?: ConnectUIOptions): void;
  }
  export default Nango;
}

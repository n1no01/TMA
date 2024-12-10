declare global {
    interface Window {
      Telegram: {
        WebApp: {
          initData: string;
          initDataUnsafe: {
            user?: {
              id: number;
              username: string;
            };
          };
          close: () => void;
        };
      };
    }
  }
  
  // This is necessary to make the `declare global` work
  export {};
  
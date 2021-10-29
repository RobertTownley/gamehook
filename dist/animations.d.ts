declare type Callback = () => boolean;
export declare type Animation = {
    id: string;
    callback: Callback;
    revoked: boolean;
};
export declare const useAnimation: (callback: Callback) => void;
export {};

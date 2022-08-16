import type { Reducer } from "@reduxjs/toolkit";
import { type PersistConfig, persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { DEBUG } from "@/constants";

export default (rootReducer: Reducer) => {
  const encryptor = encryptTransform({
    secretKey: "vra-secret-key",
    onError: (error) => {
      console.log("error:", error);
    },
  });

  const migrations = {
    0: (state: any) => {
      // migration add userPredictionChainlinkChartDisclaimerShow
      return {
        ...state,
        user: {
          ...state?.userInfo,
          userPredictionChainlinkChartDisclaimerShow: true,
        },
      };
    },
    1: (state: any) => {
      return {
        ...state,
      };
    },
  };

  const PERSISTED_KEYS: string[] = ["login", "user", "theme", "counter"];
  const persistConfig: PersistConfig<any> = {
    key: "root",
    version: 1,
    storage: storage,
    blacklist: ["profile"],
    whitelist: PERSISTED_KEYS,
    transforms: [encryptor],
    migrate: createMigrate(migrations, { debug: false }),
    debug: DEBUG, // to get useful logging
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return persistedReducer;
};

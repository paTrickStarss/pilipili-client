/*
 * Copyright (c) 2025. Bubble
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosResponse } from "axios";

declare module 'axios' {
  interface AxiosResponse<> {
    code?: number;
    msg?: string;
  }
}

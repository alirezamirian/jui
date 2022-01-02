import LightningFS from "@isomorphic-git/lightning-fs";

// can be replaced with BrowserFS or Filer
export const fs = new LightningFS("fs");

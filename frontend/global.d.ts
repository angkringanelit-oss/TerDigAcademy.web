declare module "*.png" {
  const value: string;
  export default value;
}

interface ImportMeta {
  env: {
    VITE_SHOW_PRODUCTS?: string;
    [key: string]: string | undefined;
  };
}
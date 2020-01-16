declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            DBURL: string
        }
    }
}
export {}
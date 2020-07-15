import {Context,send} from './mod.ts'

export const staticFileMiddleware = async (ctx : Context, next:Function) => {
    const path = `${Deno.cwd()}/public${ctx.request.url.pathname}`;
    if(await fileExists(path)){
        await send(ctx,ctx.request.url.pathname, {
            root:`${Deno.cwd()}/public`
        })
    }
}

const fileExists = async (path:string) =>{
    try {
        const stats = await Deno.lstat(path);
        return stats && stats.isFile;
    } catch (error) {
        if(error && error instanceof Deno.errors.NotFound) return false;
        else throw error;
    }
}
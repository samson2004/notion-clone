import {Liveblocks} from '@liveblocks/node';

const key=process.env.LIVEBLOCKS_SECERT_KEY;

if(!key){
    throw new Error('LIVEBLOCKS_SECERT_KEY is not set');
}

const liveblocks=new Liveblocks({
    secret:key
});

export default liveblocks;